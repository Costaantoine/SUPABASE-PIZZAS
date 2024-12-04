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
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          phone: string | null
          address: string | null
          role: 'admin' | 'pizzeria' | 'client'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          phone?: string | null
          address?: string | null
          role?: 'admin' | 'pizzeria' | 'client'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          phone?: string | null
          address?: string | null
          role?: 'admin' | 'pizzeria' | 'client'
          created_at?: string
          updated_at?: string
        }
      }
      pizzas: {
        Row: {
          id: number
          name: string
          description: string
          image_url: string
          category: string
          vegetarian: boolean
          ingredients: string[]
          price_small: number
          price_medium: number
          price_large: number
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          description: string
          image_url: string
          category: string
          vegetarian?: boolean
          ingredients: string[]
          price_small: number
          price_medium: number
          price_large: number
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string
          image_url?: string
          category?: string
          vegetarian?: boolean
          ingredients?: string[]
          price_small?: number
          price_medium?: number
          price_large?: number
          active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      extras: {
        Row: {
          id: number
          name: string
          price: number
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          price: number
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          price?: number
          active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: number
          user_id: string
          status: 'en_attente' | 'confirmee' | 'en_preparation' | 'prete' | 'recuperee'
          total: number
          created_at: string
          confirmed_at: string | null
          preparation_at: string | null
          ready_at: string | null
          estimated_ready_at: string | null
          updated_at: string
        }
        Insert: {
          id?: number
          user_id: string
          status?: 'en_attente' | 'confirmee' | 'en_preparation' | 'prete' | 'recuperee'
          total: number
          created_at?: string
          confirmed_at?: string | null
          preparation_at?: string | null
          ready_at?: string | null
          estimated_ready_at?: string | null
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          status?: 'en_attente' | 'confirmee' | 'en_preparation' | 'prete' | 'recuperee'
          total?: number
          created_at?: string
          confirmed_at?: string | null
          preparation_at?: string | null
          ready_at?: string | null
          estimated_ready_at?: string | null
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: number
          order_id: number
          pizza_id: number
          size: 'small' | 'medium' | 'large'
          quantity: number
          unit_price: number
          removed_ingredients: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          order_id: number
          pizza_id: number
          size: 'small' | 'medium' | 'large'
          quantity: number
          unit_price: number
          removed_ingredients?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          order_id?: number
          pizza_id?: number
          size?: 'small' | 'medium' | 'large'
          quantity?: number
          unit_price?: number
          removed_ingredients?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      order_item_extras: {
        Row: {
          id: number
          order_item_id: number
          extra_id: number
          quantity: number
          unit_price: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          order_item_id: number
          extra_id: number
          quantity: number
          unit_price: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          order_item_id?: number
          extra_id?: number
          quantity?: number
          unit_price?: number
          created_at?: string
          updated_at?: string
        }
      }
      settings: {
        Row: {
          id: number
          name: string
          description: string | null
          address: string
          phone: string
          email: string
          logo_url: string | null
          opening_hours: Json
          preparation_times: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          description?: string | null
          address: string
          phone: string
          email: string
          logo_url?: string | null
          opening_hours: Json
          preparation_times: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string | null
          address?: string
          phone?: string
          email?: string
          logo_url?: string | null
          opening_hours?: Json
          preparation_times?: Json
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}