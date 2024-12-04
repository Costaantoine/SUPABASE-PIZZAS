import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Pizza, Extra } from '../types';
import { broadcastCartChange } from '../lib/sync';

export interface CartItem {
  pizza: Pizza;
  size: 'small' | 'medium' | 'large';
  quantity: number;
  removedIngredients: string[];
  extras: Extra[];
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => {
        set((state) => ({ items: [...state.items, item] }));
        broadcastCartChange('ADD', item);
      },
      
      removeItem: (index) => {
        set((state) => ({
          items: state.items.filter((_, i) => i !== index)
        }));
        broadcastCartChange('REMOVE', index);
      },
      
      updateQuantity: (index, quantity) => {
        set((state) => ({
          items: state.items.map((item, i) => 
            i === index ? { ...item, quantity } : item
          )
        }));
        broadcastCartChange('UPDATE', { index, quantity });
      },
      
      clearCart: () => {
        set({ items: [] });
        broadcastCartChange('CLEAR', null);
      },
      
      total: () => get().items.reduce((sum, item) => {
        const basePrice = item.pizza.prices[item.size];
        const extrasTotal = item.extras.reduce((sum, extra) => sum + extra.price, 0);
        return sum + (basePrice + extrasTotal) * item.quantity;
      }, 0),
    }),
    {
      name: 'cart-storage',
      version: 1,
    }
  )
);