import { BroadcastChannel } from 'broadcast-channel';
import { supabase } from './supabase';
import { useOrderStore } from '../stores/orderStore';
import { usePizzaStore } from '../stores/pizzaStore';
import { useExtrasStore } from '../stores/extrasStore';
import { usePizzeriaStore } from '../stores/pizzeriaStore';
import { useCartStore } from '../stores/cartStore';
import type { Order, Pizza, Extra, PizzeriaSettings } from '../types';

// Create broadcast channels for cross-tab communication
const orderChannel = new BroadcastChannel('orders');
const pizzaChannel = new BroadcastChannel('pizzas');
const extrasChannel = new BroadcastChannel('extras');
const settingsChannel = new BroadcastChannel('settings');
const cartChannel = new BroadcastChannel('cart');

// Initialize real-time subscriptions
export const initializeRealtime = () => {
  // Subscribe to orders table changes
  const orderSubscription = supabase
    .channel('orders')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'orders'
      },
      (payload) => {
        const { eventType, new: newRecord, old: oldRecord } = payload;
        
        switch (eventType) {
          case 'INSERT':
            useOrderStore.getState().addOrder(newRecord as Order);
            orderChannel.postMessage({ type: 'INSERT', data: newRecord });
            break;
          case 'UPDATE':
            useOrderStore.getState().updateOrderStatus(
              (oldRecord as Order).id,
              (newRecord as Order).status
            );
            orderChannel.postMessage({ type: 'UPDATE', data: newRecord });
            break;
          case 'DELETE':
            // Implement if needed
            break;
        }
      }
    )
    .subscribe();

  // Subscribe to pizzas table changes
  const pizzaSubscription = supabase
    .channel('pizzas')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'pizzas'
      },
      (payload) => {
        const { eventType, new: newRecord } = payload;
        const pizzaStore = usePizzaStore.getState();

        switch (eventType) {
          case 'INSERT':
            pizzaStore.addPizza(newRecord as Pizza);
            pizzaChannel.postMessage({ type: 'INSERT', data: newRecord });
            break;
          case 'UPDATE':
            pizzaStore.updatePizza((newRecord as Pizza).id, newRecord as Pizza);
            pizzaChannel.postMessage({ type: 'UPDATE', data: newRecord });
            break;
          case 'DELETE':
            pizzaStore.deletePizza((newRecord as Pizza).id);
            pizzaChannel.postMessage({ type: 'DELETE', data: newRecord });
            break;
        }
      }
    )
    .subscribe();

  // Subscribe to extras table changes
  const extrasSubscription = supabase
    .channel('extras')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'extras'
      },
      (payload) => {
        const { eventType, new: newRecord } = payload;
        const extrasStore = useExtrasStore.getState();

        switch (eventType) {
          case 'INSERT':
            extrasStore.addExtra(newRecord as Extra);
            extrasChannel.postMessage({ type: 'INSERT', data: newRecord });
            break;
          case 'UPDATE':
            extrasStore.updateExtra((newRecord as Extra).id, newRecord as Extra);
            extrasChannel.postMessage({ type: 'UPDATE', data: newRecord });
            break;
          case 'DELETE':
            extrasStore.deleteExtra((newRecord as Extra).id);
            extrasChannel.postMessage({ type: 'DELETE', data: newRecord });
            break;
        }
      }
    )
    .subscribe();

  // Subscribe to settings table changes
  const settingsSubscription = supabase
    .channel('settings')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'settings'
      },
      (payload) => {
        const { eventType, new: newRecord } = payload;
        if (eventType === 'UPDATE') {
          usePizzeriaStore.getState().updateSettings(newRecord as PizzeriaSettings);
          settingsChannel.postMessage({ type: 'UPDATE', data: newRecord });
        }
      }
    )
    .subscribe();

  // Set up broadcast channel listeners for cross-tab communication
  orderChannel.onmessage = (message) => {
    const { type, data } = message;
    const orderStore = useOrderStore.getState();
    
    switch (type) {
      case 'INSERT':
        orderStore.addOrder(data);
        break;
      case 'UPDATE':
        orderStore.updateOrderStatus(data.id, data.status);
        break;
    }
  };

  pizzaChannel.onmessage = (message) => {
    const { type, data } = message;
    const pizzaStore = usePizzaStore.getState();
    
    switch (type) {
      case 'INSERT':
        pizzaStore.addPizza(data);
        break;
      case 'UPDATE':
        pizzaStore.updatePizza(data.id, data);
        break;
      case 'DELETE':
        pizzaStore.deletePizza(data.id);
        break;
    }
  };

  extrasChannel.onmessage = (message) => {
    const { type, data } = message;
    const extrasStore = useExtrasStore.getState();
    
    switch (type) {
      case 'INSERT':
        extrasStore.addExtra(data);
        break;
      case 'UPDATE':
        extrasStore.updateExtra(data.id, data);
        break;
      case 'DELETE':
        extrasStore.deleteExtra(data.id);
        break;
    }
  };

  settingsChannel.onmessage = (message) => {
    const { data } = message;
    usePizzeriaStore.getState().updateSettings(data);
  };

  cartChannel.onmessage = (message) => {
    const { type, data } = message;
    const cartStore = useCartStore.getState();
    
    switch (type) {
      case 'ADD':
        cartStore.addItem(data);
        break;
      case 'REMOVE':
        cartStore.removeItem(data);
        break;
      case 'UPDATE':
        cartStore.updateQuantity(data.index, data.quantity);
        break;
      case 'CLEAR':
        cartStore.clearCart();
        break;
    }
  };

  // Clean up function
  return () => {
    orderSubscription.unsubscribe();
    pizzaSubscription.unsubscribe();
    extrasSubscription.unsubscribe();
    settingsSubscription.unsubscribe();
    orderChannel.close();
    pizzaChannel.close();
    extrasChannel.close();
    settingsChannel.close();
    cartChannel.close();
  };
};

// Helper functions to broadcast changes
export const broadcastOrderChange = (type: 'INSERT' | 'UPDATE', data: any) => {
  orderChannel.postMessage({ type, data });
};

export const broadcastPizzaChange = (type: 'INSERT' | 'UPDATE' | 'DELETE', data: any) => {
  pizzaChannel.postMessage({ type, data });
};

export const broadcastExtrasChange = (type: 'INSERT' | 'UPDATE' | 'DELETE', data: any) => {
  extrasChannel.postMessage({ type, data });
};

export const broadcastSettingsChange = (data: any) => {
  settingsChannel.postMessage({ type: 'UPDATE', data });
};

export const broadcastCartChange = (type: 'ADD' | 'REMOVE' | 'UPDATE' | 'CLEAR', data: any) => {
  cartChannel.postMessage({ type, data });
};