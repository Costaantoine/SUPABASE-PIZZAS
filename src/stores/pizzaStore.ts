import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Pizza } from '../types';
import { PIZZAS } from '../data/pizzas';
import toast from 'react-hot-toast';

interface PizzaStore {
  pizzas: Pizza[];
  addPizza: (pizza: Omit<Pizza, 'id'>) => void;
  updatePizza: (id: number, updates: Partial<Pizza>) => void;
  deletePizza: (id: number) => void;
  getAllPizzas: () => Pizza[];
}

export const usePizzaStore = create<PizzaStore>()(
  persist(
    (set, get) => ({
      pizzas: PIZZAS,
      
      addPizza: (pizza) => {
        const newPizza = {
          ...pizza,
          id: Math.max(0, ...get().pizzas.map(p => p.id)) + 1
        };
        set(state => ({
          pizzas: [...state.pizzas, newPizza]
        }));
        toast.success('Pizza ajoutée avec succès');
      },

      updatePizza: (id, updates) => {
        set(state => ({
          pizzas: state.pizzas.map(pizza =>
            pizza.id === id ? { ...pizza, ...updates } : pizza
          )
        }));
        toast.success('Pizza mise à jour avec succès');
      },

      deletePizza: (id) => {
        set(state => ({
          pizzas: state.pizzas.filter(pizza => pizza.id !== id)
        }));
        toast.success('Pizza supprimée avec succès');
      },

      getAllPizzas: () => get().pizzas
    }),
    {
      name: 'pizza-storage'
    }
  )
);