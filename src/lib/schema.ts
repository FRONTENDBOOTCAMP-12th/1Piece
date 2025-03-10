export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      bookmark: {
        Row: {
          bookmark_question: number;
          bookmark_user: string;
          id: number;
        };
        Insert: {
          bookmark_question: number;
          bookmark_user: string;
          id?: number;
        };
        Update: {
          bookmark_question?: number;
          bookmark_user?: string;
          id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'bookmark_bookmark_question_fkey';
            columns: ['bookmark_question'];
            isOneToOne: false;
            referencedRelation: 'card';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'bookmark_bookmark_user_fkey';
            columns: ['bookmark_user'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      card: {
        Row: {
          check: number;
          count: number;
          created: string;
          desc: string;
          id: number;
          tags: Json;
          title: string;
          writer: string;
        };
        Insert: {
          check?: number;
          count: number;
          created?: string;
          desc: string;
          id?: never;
          tags: Json;
          title: string;
          writer: string;
        };
        Update: {
          check?: number;
          count?: number;
          created?: string;
          desc?: string;
          id?: never;
          tags?: Json;
          title?: string;
          writer?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'questions_writer_fkey';
            columns: ['writer'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      like: {
        Row: {
          id: number;
          like_question: number;
          like_user: string;
        };
        Insert: {
          id?: number;
          like_question: number;
          like_user: string;
        };
        Update: {
          id?: number;
          like_question?: number;
          like_user?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'like_like_question_fkey';
            columns: ['like_question'];
            isOneToOne: false;
            referencedRelation: 'card';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'like_like_user_fkey';
            columns: ['like_user'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      profiles: {
        Row: {
          created_at: string | null;
          email: string;
          nickname: string;
          userid: string;
        };
        Insert: {
          created_at?: string | null;
          email: string;
          nickname: string;
          userid: string;
        };
        Update: {
          created_at?: string | null;
          email?: string;
          nickname?: string;
          userid?: string;
        };
        Relationships: [];
      };
      questions: {
        Row: {
          answer: string;
          card_id: number | null;
          correct: string;
          explanation: string | null;
          id: number;
          title: string;
        };
        Insert: {
          answer: string;
          card_id?: number | null;
          correct: string;
          explanation?: string | null;
          id?: number;
          title: string;
        };
        Update: {
          answer?: string;
          card_id?: number | null;
          correct?: string;
          explanation?: string | null;
          id?: number;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'questions_card_id_fkey';
            columns: ['card_id'];
            isOneToOne: false;
            referencedRelation: 'card';
            referencedColumns: ['id'];
          },
        ];
      };
      selectedtag: {
        Row: {
          card_id: number;
          id: number;
          tag_id: number;
        };
        Insert: {
          card_id: number;
          id?: number;
          tag_id: number;
        };
        Update: {
          card_id?: number;
          id?: number;
          tag_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'selectedtag_card_id_fkey';
            columns: ['card_id'];
            isOneToOne: false;
            referencedRelation: 'card';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'selectedtag_tag_id_fkey';
            columns: ['tag_id'];
            isOneToOne: false;
            referencedRelation: 'tags';
            referencedColumns: ['id'];
          },
        ];
      };
      solved: {
        Row: {
          id: number;
          solved_question: number;
          solved_user: string;
        };
        Insert: {
          id?: number;
          solved_question: number;
          solved_user: string;
        };
        Update: {
          id?: number;
          solved_question?: number;
          solved_user?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'solved_solved_question_fkey';
            columns: ['solved_question'];
            isOneToOne: false;
            referencedRelation: 'card';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'solved_solved_user_fkey';
            columns: ['solved_user'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      tags: {
        Row: {
          id: number;
          tagname: string;
        };
        Insert: {
          id?: number;
          tagname: string;
        };
        Update: {
          id?: number;
          tagname?: string;
        };
        Relationships: [];
      };
      users: {
        Row: {
          alarm: string | null;
          badge: Json | null;
          id: string;
          nickname: string;
          user_id: string;
        };
        Insert: {
          alarm?: string | null;
          badge?: Json | null;
          id?: string;
          nickname: string;
          user_id: string;
        };
        Update: {
          alarm?: string | null;
          badge?: Json | null;
          id?: string;
          nickname?: string;
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;
