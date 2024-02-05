import MetaAvatar from "@/components/metaverse/avatar/MetaAvatar";
import { BACK_DROP_TYPE_DETAIL } from "@/components/scrumboard/constants";
import useDragItem from "@/hooks/scrumBoard/useDragItem";
import {
  GetKanbanItemsByAssignees,
  Kanban_categories,
} from "@/types/supabase.tables.types";
import useScrumBoardItemBackDropStore from "@/zustand/createScrumBoardItemStore";
import React from "react";
import {
  StAssigneesWrapper,
  StListItem,
  StMetaAvatarWrapper,
  StUserInfoWrapper,
} from "../styles/scrumBoardItem.styles";

interface Props {
  item: GetKanbanItemsByAssignees;
  category: Kanban_categories;
}

function ScrumBoardItem({ category, item }: Props) {
  const setIsOpen = useScrumBoardItemBackDropStore.use.setIsOpen();

  const handleOpenItemDetail = (kanbanItem: GetKanbanItemsByAssignees) => {
    setIsOpen(category, kanbanItem, BACK_DROP_TYPE_DETAIL);
  };
  const { drag, isDragging } = useDragItem(item);

  return (
    <StListItem
      ref={drag}
      $isDragging={isDragging}
      onClick={() => handleOpenItemDetail(item)}
    >
      <p>{item.description}</p>
      <StUserInfoWrapper>
        <div>
          <p>{item.item_creator_space_display_name}</p>
        </div>
        {item.assignees[0].userId !== null && (
          <StAssigneesWrapper>
            {item.assignees.map((assignee, index) => {
              return (
                <StMetaAvatarWrapper
                  $index={index}
                  key={assignee.userId + assignee.assigneesId}
                >
                  <MetaAvatar
                    spaceAvatar={assignee.spaceAvatar}
                    width={24}
                    height={24}
                    y={39}
                    x={-5}
                  />
                </StMetaAvatarWrapper>
              );
            })}
          </StAssigneesWrapper>
        )}
      </StUserInfoWrapper>
    </StListItem>
  );
}

export default React.memo(ScrumBoardItem);
