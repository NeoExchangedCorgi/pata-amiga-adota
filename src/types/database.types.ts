
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      animals: {
        Row: {
          id: string
          name: string
          species: string
          sex: string
          age: string
          size: string
          description: string
          location: string
          photos: string[]
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          species: string
          sex: string
          age: string
          size: string
          description: string
          location: string
          photos: string[]
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          species?: string
          sex?: string
          age?: string
          size?: string
          description?: string
          location?: string
          photos?: string[]
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      animal_reports: {
        Row: {
          id: string
          animal_name?: string
          species: string
          sex?: string
          age?: string
          size?: string
          location: string
          description: string
          can_keep_temporarily?: string
          contact_name: string
          contact_phone: string
          contact_email: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          animal_name?: string
          species: string
          sex?: string
          age?: string
          size?: string
          location: string
          description: string
          can_keep_temporarily?: string
          contact_name: string
          contact_phone: string
          contact_email: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          animal_name?: string
          species?: string
          sex?: string
          age?: string
          size?: string
          location?: string
          description?: string
          can_keep_temporarily?: string
          contact_name?: string
          contact_phone?: string
          contact_email?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      volunteer_applications: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          age: string
          availability: string
          experience: string
          reason: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          age: string
          availability: string
          experience: string
          reason: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          age?: string
          availability?: string
          experience?: string
          reason?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      adoption_requests: {
        Row: {
          id: string
          animal_id: string
          name: string
          email: string
          phone: string
          message: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          animal_id: string
          name: string
          email: string
          phone: string
          message: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          animal_id?: string
          name?: string
          email?: string
          phone?: string
          message?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Mantenha o tipo Animal existente compatível com nossa tabela Supabase
export type Animal = Database['public']['Tables']['animals']['Row'];
