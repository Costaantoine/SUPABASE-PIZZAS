import { useMemo } from 'react';
import type { OrderItem } from '../types';

interface OrderDetailsProps {
  item: OrderItem;
}

export function OrderDetails({ item }: OrderDetailsProps) {
  const itemTotal = useMemo(() => {
    const basePrice = item.price;
    const extrasTotal = item.extras?.reduce((sum, extra) => sum + extra.price, 0) || 0;
    return (basePrice + extrasTotal) * item.quantity;
  }, [item]);

  return (
    <div className="space-y-2 border-l-4 border-accent-500 pl-4 py-2">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-primary-800">
              {item.quantity}x {item.pizza_name}
            </span>
            <span className="text-sm text-primary-600 px-2 py-0.5 bg-primary-100 rounded-full">
              {item.size === 'small' ? 'Petite' : item.size === 'medium' ? 'Moyenne' : 'Grande'}
            </span>
          </div>
          <div className="text-sm text-primary-600">
            Prix unitaire: {item.price.toFixed(2)}€
          </div>
        </div>
        <span className="font-medium text-primary-800 bg-accent-100 px-3 py-1 rounded-full">
          {itemTotal.toFixed(2)}€
        </span>
      </div>

      {item.extras && item.extras.length > 0 && (
        <div className="text-sm text-green-600 bg-green-50 rounded-md p-2">
          <span className="font-medium">Suppléments :</span>
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

      {item.removedIngredients && item.removedIngredients.length > 0 && (
        <div className="text-sm text-red-600 bg-red-50 rounded-md p-2">
          <span className="font-medium">Ingrédients retirés :</span>
          <ul className="mt-1 list-disc list-inside">
            {item.removedIngredients.map((ingredient, i) => (
              <li key={i}>{ingredient}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}