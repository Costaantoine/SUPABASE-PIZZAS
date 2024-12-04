import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';

export function CartButton() {
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.total());

  return (
    <button className="relative bg-secondary-600 hover:bg-secondary-700 px-4 py-2 rounded-md transition group">
      <ShoppingCart className="h-5 w-5 text-white" />
      {items.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {items.length}
        </span>
      )}
      <span className="sr-only">Panier ({total}€)</span>
    </button>
  );
}