import { KanbanAssignees } from "./supabase.tables.types";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      dm_channels: {
        Row: {
          id: string;
          other_user: string | null;
          space_id: string;
          user: string;
        };
        Insert: {
          id?: string;
          other_user?: string | null;
          space_id: string;
          user: string;
        };
        Update: {
          id?: string;
          other_user?: string | null;
          space_id?: string;
          user?: string;
        };
        Relationships: [
          {
            foreignKeyName: "dm_channels_other_user_fkey";
            columns: ["other_user"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "dm_channels_space_id_fkey";
            columns: ["space_id"];
            isOneToOne: false;
            referencedRelation: "spaces";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "dm_channels_user_fkey";
            columns: ["user"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      dm_messages: {
        Row: {
          checked: string;
          created_at: string;
          dm_id: string;
          id: string;
          message: string;
          receiver_id: string;
          sender_id: string;
        };
        Insert: {
          checked?: string;
          created_at?: string;
          dm_id: string;
          id?: string;
          message: string;
          receiver_id: string;
          sender_id: string;
        };
        Update: {
          checked?: string;
          created_at?: string;
          dm_id?: string;
          id?: string;
          message?: string;
          receiver_id?: string;
          sender_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "dm_messages_dm_id_fkey";
            columns: ["dm_id"];
            isOneToOne: false;
            referencedRelation: "dm_channels";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "dm_messages_receiver_id_fkey";
            columns: ["receiver_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "dm_messages_sender_id_fkey";
            columns: ["sender_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      item_details: {
        Row: {
          jsonb_build_object: Json | null;
        };
        Insert: {
          jsonb_build_object?: Json | null;
        };
        Update: {
          jsonb_build_object?: Json | null;
        };
        Relationships: [];
      };
      kanban_assignees: {
        Row: {
          created_at: string;
          id: string;
          kanbanItemId: string;
          space_id: string | null;
          userId: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          kanbanItemId: string;
          space_id?: string | null;
          userId: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          kanbanItemId?: string;
          space_id?: string | null;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "kanban_assignees_kanbanItemId_fkey";
            columns: ["kanbanItemId"];
            isOneToOne: false;
            referencedRelation: "kanban_items";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "kanban_assignees_space_id_fkey";
            columns: ["space_id"];
            isOneToOne: false;
            referencedRelation: "spaces";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "kanban_assignees_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      kanban_categories: {
        Row: {
          color: string;
          id: string;
          name: string;
          order: number;
          spaceId: string;
        };
        Insert: {
          color: string;
          id?: string;
          name: string;
          order?: number;
          spaceId: string;
        };
        Update: {
          color?: string;
          id?: string;
          name?: string;
          order?: number;
          spaceId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "kanban_categories_spaceId_fkey";
            columns: ["spaceId"];
            isOneToOne: false;
            referencedRelation: "spaces";
            referencedColumns: ["id"];
          },
        ];
      };
      kanban_items: {
        Row: {
          categoryId: string;
          create_user_id: string | null;
          created_at: string;
          deadline: string | null;
          description: string;
          id: string;
          space_id: string | null;
          title: string;
          type: string;
        };
        Insert: {
          categoryId: string;
          create_user_id?: string | null;
          created_at?: string;
          deadline?: string | null;
          description: string;
          id?: string;
          space_id?: string | null;
          title: string;
          type?: string;
        };
        Update: {
          categoryId?: string;
          create_user_id?: string | null;
          created_at?: string;
          deadline?: string | null;
          description?: string;
          id?: string;
          space_id?: string | null;
          title?: string;
          type?: string;
        };
        Relationships: [
          {
            foreignKeyName: "kanban_items_categoryId_fkey";
            columns: ["categoryId"];
            isOneToOne: false;
            referencedRelation: "kanban_categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "kanban_items_create_user_id_fkey";
            columns: ["create_user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "kanban_items_space_id_fkey";
            columns: ["space_id"];
            isOneToOne: false;
            referencedRelation: "spaces";
            referencedColumns: ["id"];
          },
        ];
      };
      space_members: {
        Row: {
          created_at: string;
          id: string;
          space_avatar: string;
          space_display_name: string;
          space_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          space_avatar?: string;
          space_display_name?: string;
          space_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          space_avatar?: string;
          space_display_name?: string;
          space_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "space_members_space_id_fkey";
            columns: ["space_id"];
            isOneToOne: false;
            referencedRelation: "spaces";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "space_members_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      spaces: {
        Row: {
          created_at: string;
          description: string;
          id: string;
          owner: string;
          space_thumb: string | null;
          title: string;
        };
        Insert: {
          created_at?: string;
          description: string;
          id?: string;
          owner: string;
          space_thumb?: string | null;
          title: string;
        };
        Update: {
          created_at?: string;
          description?: string;
          id?: string;
          owner?: string;
          space_thumb?: string | null;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "spaces_owner_fkey";
            columns: ["owner"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          created_at: string;
          display_name: string | null;
          email: string;
          id: string;
        };
        Insert: {
          created_at?: string;
          display_name?: string | null;
          email: string;
          id?: string;
        };
        Update: {
          created_at?: string;
          display_name?: string | null;
          email?: string;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "users_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_dm_channel_messages: {
        Args: {
          p_dm_channel: string;
        };
        Returns: {
          id: string;
          created_at: string;
          dm_id: string;
          message: string;
          sender: Json;
          receiver: Json;
        }[];
      };
      get_dm_channel_messages_test: {
        Args: {
          p_dm_channel: string;
        };
        Returns: {
          id: string;
          created_at: string;
          dm_id: string;
          receiver_id: string;
          receiver_display_name: string;
          message: string;
          sender_id: string;
          sender_display_name: string;
        }[];
      };
      get_dm_channels: {
        Args: {
          p_space_id: string;
          p_user_id: string;
          p_receiver_id: string;
        };
        Returns: {
          id: string;
          other_user: string | null;
          space_id: string;
          user: string;
        }[];
      };
      get_kanban_items_by_assignees: {
        Args: {
          p_category_id: string;
        };
        Returns: {
          id: string;
          created_at: string;
          title: string;
          description: string;
          deadline: string;
          type: string;
          categoryId: string;
          item_creator_space_avatar: string;
          create_user_id: string;
          assignees: KanbanAssignees[];
        }[];
      };
      get_last_dm_message_list: {
        Args: {
          input_space_id: string;
          input_user_id: string;
        };
        Returns: {
          room_id: string;
          message_id: string;
          created_at: string;
          message: string;
          space_id: string;
          space_title: string;
          sender_id: string;
          sender_username: string;
          sender_avatar: string;
          sender_display_name: string;
          receiver_id: string;
          receiver_username: string;
          receiver_avatar: string;
          receiver_display_name: string;
          unread_count: number;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
        Database["public"]["Views"])
    ? (Database["public"]["Tables"] &
        Database["public"]["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never;
