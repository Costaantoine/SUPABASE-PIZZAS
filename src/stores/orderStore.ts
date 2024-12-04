import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { Order, OrderStatus } from '../types';
import { usePizzeriaStore } from './pizzeriaStore';
import { calculateEstimatedReadyTime } from '../lib/dateUtils';
import { broadcastOrderChange } from '../lib/sync';

interface OrderStore {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: number, status: OrderStatus) => void;
}

export const useOrderStore = create<OrderStore>()(
  subscribeWithSelector((set) => ({
    orders: [],
    addOrder: (order) => {
      const settings = usePizzeriaStore.getState().settings.preparation_times;
      const newOrder = {
        ...order,
        estimated_ready_at: calculateEstimatedReadyTime('en_attente', undefined, settings).toISOString(),
        items: order.items.map(item => ({
          ...item,
          extras: item.extras || [],
          removedIngredients: item.removedIngredients || []
        }))
      };
      
      set((state) => ({
        orders: [newOrder, ...state.orders]
      }));
      
      broadcastOrderChange('INSERT', newOrder);
    },
    updateOrderStatus: (orderId, status) => {
      const settings = usePizzeriaStore.getState().settings.preparation_times;
      
      set((state) => {
        const updatedOrders = state.orders.map((order) => {
          if (order.id !== orderId) return order;

          const now = new Date();
          let updates: Partial<Order> = { status };

          if (status === 'confirmee' && order.status === 'en_attente') {
            const confirmedAt = now.toISOString();
            const estimatedReady = calculateEstimatedReadyTime('confirmee', confirmedAt, settings);
            updates = {
              ...updates,
              confirmed_at: confirmedAt,
              estimated_ready_at: estimatedReady.toISOString()
            };
          }

          if (status === 'en_preparation' && order.status !== 'en_preparation') {
            const estimatedReady = calculateEstimatedReadyTime('en_preparation', order.confirmed_at, settings);
            updates = {
              ...updates,
              preparation_at: now.toISOString(),
              estimated_ready_at: estimatedReady.toISOString()
            };
          }

          if (status === 'prete' && order.status !== 'prete') {
            updates = {
              ...updates,
              ready_at: now.toISOString(),
              estimated_ready_at: undefined
            };
          }

          const updatedOrder = { ...order, ...updates };
          broadcastOrderChange('UPDATE', updatedOrder);
          return updatedOrder;
        });

        return { orders: updatedOrders };
      });
    }
  }))
);