import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Extra } from '../types';

interface ExtrasStore {
  extras: Extra[];
  addExtra: (extra: Omit<Extra, 'id'>) => void;
  updateExtra: (id: number, extra: Partial<Extra>) => void;
  deleteExtra: (id: number) => void;
}

export const useExtrasStore = create<ExtrasStore>()(
  persist(
    (set) => ({
      extras: [
        { id: 1, name: 'Mozzarella supplémentaire', price: 2 },
        { id: 2, name: 'Champignons', price: 1.5 },
        { id: 3, name: 'Jambon', price: 2 },
        { id: 4, name: 'Olives', price: 1 },
        { id: 5, name: 'Roquette', price: 1 },
        { id: 6, name: 'Oeuf', price: 1.5 },
      ],
      addExtra: (extra) =>
        set((state) => ({
          extras: [...state.extras, { ...extra, id: Date.now() }]
        })),
      updateExtra: (id, updates) =>
        set((state) => ({
          extras: state.extras.map((extra) =>
            extra.id === id ? { ...extra, ...updates } : extra
          )
        })),
      deleteExtra: (id) =>
        set((state) => ({
          extras: state.extras.filter((extra) => extra.id !== id)
        }))
    }),
    {
      name: 'extras-storage'
    }
  )
);