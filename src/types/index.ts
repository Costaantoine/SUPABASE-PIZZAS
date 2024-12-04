export interface Pizza {
  id: number;
  name: string;
  description: string;
  image_url: string;
  prices: {
    small: number;
    medium: number;
    large: number;
  };
  ingredients: string[];
  category: string;
  vegetarian: boolean;
}

export interface Extra {
  id: number;
  name: string;
  price: number;
}

export interface CartItem {
  pizza: Pizza;
  size: 'small' | 'medium' | 'large';
  quantity: number;
  removedIngredients: string[];
  extras: Extra[];
}

export type UserRole = 'admin' | 'pizzeria' | 'client';

export interface User {
  id: string;
  email: string;
  password?: string;
  role: UserRole;
  full_name?: string;
  phone?: string;
  address?: string;
  created_at: string;
}

export type OrderStatus = 'en_attente' | 'confirmee' | 'en_preparation' | 'prete' | 'recuperee';

export interface OrderItem {
  pizza_id: number;
  pizza_name: string;
  size: 'small' | 'medium' | 'large';
  quantity: number;
  price: number;
  extras?: Extra[];
  removedIngredients?: string[];
}

export interface Order {
  id: number;
  user_id: string;
  user: {
    full_name: string;
    phone: string;
    address: string;
  };
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  created_at: string;
  confirmed_at?: string;
  preparation_at?: string;
  ready_at?: string;
  estimated_ready_at?: string;
}

export interface DashboardStats {
  total_orders: number;
  total_revenue: number;
  average_order_value: number;
  popular_pizzas: Array<{ name: string; count: number }>;
  recent_orders: Order[];
}

export interface PreparationTimes {
  confirmation: number;
  preparation: number;
}

export interface PizzeriaSettings {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  logo_url: string;
  opening_hours: {
    monday_thursday: string;
    friday_saturday: string;
    sunday: string;
  };
  preparation_times: PreparationTimes;
}