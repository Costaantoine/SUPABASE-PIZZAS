import { useState } from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { useOrderStore } from '../stores/orderStore';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import type { Order } from '../types';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore();
  const { addOrder } = useOrderStore();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = () => {
    if (!user) {
      navigate('/auth');
      onClose();
      return;
    }

    setIsCheckingOut(true);
    
    // Create new order with all details
    const newOrder: Order = {
      id: Date.now(),
      user_id: user.id,
      user: {
        full_name: user.full_name || '',
        phone: user.phone || '',
        address: user.address || ''
      },
      items: items.map(item => ({
        pizza_id: item.pizza.id,
        pizza_name: item.pizza.name,
        size: item.size,
        quantity: item.quantity,
        price: item.pizza.prices[item.size],
        extras: item.extras,
        removedIngredients: item.removedIngredients
      })),
      total: total(),
      status: 'en_attente',
      created_at: new Date().toISOString()
    };

    addOrder(newOrder);
    
    setTimeout(() => {
      clearCart();
      setIsCheckingOut(false);
      onClose();
      navigate('/mes-commandes');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-primary-800">Votre panier</h2>
          <button
            onClick={onClose}
            className="text-primary-500 hover:text-primary-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-primary-600">Votre panier est vide</p>
          ) : (
            items.map((item, index) => (
              <div
                key={index}
                className="flex items-start justify-between border-b pb-4"
              >
                <div className="flex-1 space-y-2">
                  <h3 className="font-medium text-primary-800">
                    {item.pizza.name}
                  </h3>
                  <p className="text-sm text-primary-600">
                    Taille : {item.size === 'small' ? 'Petite' : item.size === 'medium' ? 'Moyenne' : 'Grande'}
                  </p>
                  
                  {item.removedIngredients.length > 0 && (
                    <div className="text-sm text-red-600 bg-red-50 rounded-md p-2">
                      <span className="font-medium">Sans :</span>{' '}
                      {item.removedIngredients.join(', ')}
                    </div>
                  )}
                  
                  {item.extras.length > 0 && (
                    <div className="text-sm text-green-600 bg-green-50 rounded-md p-2">
                      <span className="font-medium">Extras :</span>
                      <ul className="mt-1 space-y-1">
                        {item.extras.map((extra, i) => (
                          <li key={i} className="flex justify-between">
                            <span>{extra.name}</span>
                            <span>+{extra.price.toFixed(2)}€</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <p className="text-sm font-medium text-primary-800">
                    Prix unitaire : {(
                      item.pizza.prices[item.size] +
                      item.extras.reduce((sum, extra) => sum + extra.price, 0)
                    ).toFixed(2)}€
                  </p>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <button
                    onClick={() => removeItem(index)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>

                  <div className="flex items-center space-x-2 bg-primary-50 rounded-md">
                    <button
                      onClick={() => updateQuantity(index, Math.max(1, item.quantity - 1))}
                      className="p-1 text-primary-600 hover:text-primary-800"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center text-primary-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(index, item.quantity + 1)}
                      className="p-1 text-primary-600 hover:text-primary-800"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium text-primary-800">Total</span>
              <span className="font-bold text-lg text-primary-800">
                {total().toFixed(2)}€
              </span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-accent-500 text-white py-2 px-4 rounded-md hover:bg-accent-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCheckingOut ? 'Traitement...' : 'Commander'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}