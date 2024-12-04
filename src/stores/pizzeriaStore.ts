import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Pizza, PizzeriaSettings } from '../types';
import { broadcastPizzaChange, broadcastSettingsChange } from '../lib/sync';

interface PizzeriaStore {
  settings: PizzeriaSettings;
  menu: Pizza[];
  updateSettings: (settings: Partial<PizzeriaSettings>) => void;
  addPizza: (pizza: Omit<Pizza, 'id'>) => void;
  updatePizza: (id: number, pizza: Partial<Pizza>) => void;
  deletePizza: (id: number) => void;
}

const initialSettings: PizzeriaSettings = {
  name: 'Pizza Délice',
  description: 'Des pizzas artisanales préparées avec passion',
  address: '123 Avenue des Champs-Élysées, 75008 Paris',
  phone: '+33 1 23 45 67 89',
  email: 'contact@pizza-delice.fr',
  logo_url: '',
  opening_hours: {
    monday_thursday: '11h30 - 22h30',
    friday_saturday: '11h30 - 23h30',
    sunday: '12h00 - 22h00'
  },
  preparation_times: {
    confirmation: 60,
    preparation: 30
  }
};

export const usePizzeriaStore = create<PizzeriaStore>()(
  persist(
    (set) => ({
      settings: initialSettings,
      menu: [],
      
      updateSettings: (newSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings }
        }));
        broadcastSettingsChange(newSettings);
      },
      
      addPizza: (pizza) => {
        const newPizza = { ...pizza, id: Date.now() };
        set((state) => ({
          menu: [...state.menu, newPizza]
        }));
        broadcastPizzaChange('INSERT', newPizza);
      },
      
      updatePizza: (id, updates) => {
        set((state) => ({
          menu: state.menu.map((pizza) =>
            pizza.id === id ? { ...pizza, ...updates } : pizza
          )
        }));
        broadcastPizzaChange('UPDATE', { id, ...updates });
      },
      
      deletePizza: (id) => {
        set((state) => ({
          menu: state.menu.filter((pizza) => pizza.id !== id)
        }));
        broadcastPizzaChange('DELETE', { id });
      }
    }),
    {
      name: 'pizzeria-storage',
      version: 1,
    }
  )
);