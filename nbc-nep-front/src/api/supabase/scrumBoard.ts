import { supabase } from "@/supabase/supabase";
import { TablesInsert, TablesUpdate } from "@/supabase/types/supabase";
import {
  GetKanbanItemsByAssignees,
  Kanban_categories,
  Space_members,
} from "@/supabase/types/supabase.tables.type";

export const getCategories = async (
  spaceId: string
): Promise<Kanban_categories[]> => {
  const { data, error } = await supabase
    .from("kanban_categories")
    .select("*")
    .eq("spaceId", spaceId)
    .order("order", { ascending: true })
    .returns<Kanban_categories[]>();
  if (error) throw error;
  return data;
};

export const getCategoryItems = async (
  categoryId: string
): Promise<GetKanbanItemsByAssignees[]> => {
  const { data, error } = await supabase.rpc("get_kanban_items_by_assignees", {
    p_category_id: categoryId,
  });
  if (error) throw error;
  return data;
};

export const createCategory = async ({
  spaceId,
  name,
  color,
}: TablesInsert<"kanban_categories">) => {
  const { data: newCategory, error } = await supabase
    .from("kanban_categories")
    .insert({ spaceId, name, color })
    .single();
  if (error) throw error;
  return newCategory;
};

export const updateCategory = async (
  updateData: Partial<TablesUpdate<"kanban_categories">>
) => {
  const { data: newCategory, error } = await supabase
    .from("kanban_categories")
    .update(updateData)
    .eq("id", updateData.id!)
    .select();
  if (error) throw error;
  return newCategory;
};

export const getSpaceUsers = async (spaceId: string) => {
  const { data, error } = await supabase
    .from("space_members")
    .select("*, users(*)")
    .eq("space_id", spaceId)
    .returns<Space_members[]>();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

interface PostSpaceMemberPrams {
  description: string;
  categoryId: string;
  space_id: string;
  user_id: string;
  assignees: Space_members[];
}
export const postScrumBoardItem = async ({
  description,
  categoryId,
  assignees,
  space_id,
  user_id,
}: PostSpaceMemberPrams) => {
  const { data, error } = await supabase
    .from("kanban_items")
    .insert([
      { description, categoryId, title: "", create_user_id: user_id, space_id },
    ])
    .select("*");

  if (error) {
    throw new Error(error.message);
  }

  const { error: assigneesError } = await supabase
    .from("kanban_assignees")
    .insert(
      assignees.map((assignee) => ({
        kanbanItemId: data?.[0].id,
        userId: assignee.users?.id!,
        space_id,
      }))
    );
  if (error) {
    throw new Error(assigneesError?.message);
  }
};