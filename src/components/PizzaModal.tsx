import { useState } from 'react';
import { X } from 'lucide-react';
import { Pizza } from '../types';
import { useExtrasStore } from '../stores/extrasStore';
import type { Extra } from '../types';

interface PizzaModalProps {
  pizza: Pizza;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (pizza: Pizza, size: 'small' | 'medium' | 'large', removedIngredients: string[], extras: Extra[]) => void;
}

export function PizzaModal({ pizza, isOpen, onClose, onAddToCart }: PizzaModalProps) {
  const [selectedSize, setSelectedSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [removedIngredients, setRemovedIngredients] = useState<string[]>([]);
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>([]);
  const { extras: availableExtras } = useExtrasStore();

  if (!isOpen) return null;

  const toggleIngredient = (ingredient: string) => {
    setRemovedIngredients(prev => 
      prev.includes(ingredient)
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const toggleExtra = (extra: Extra) => {
    setSelectedExtras(prev =>
      prev.find(e => e.id === extra.id)
        ? prev.filter(e => e.id !== extra.id)
        : [...prev, extra]
    );
  };

  const calculateTotal = () => {
    const basePrice = pizza.prices[selectedSize];
    const extrasTotal = selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
    return basePrice + extrasTotal;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b z-10 p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Personnaliser {pizza.name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Taille</h3>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setSelectedSize('small')}
                className={`p-3 rounded-lg text-center transition-colors ${
                  selectedSize === 'small'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div>Petite</div>
                <div className="font-bold">{pizza.prices.small}€</div>
              </button>
              <button
                onClick={() => setSelectedSize('medium')}
                className={`p-3 rounded-lg text-center transition-colors ${
                  selectedSize === 'medium'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div>Moyenne</div>
                <div className="font-bold">{pizza.prices.medium}€</div>
              </button>
              <button
                onClick={() => setSelectedSize('large')}
                className={`p-3 rounded-lg text-center transition-colors ${
                  selectedSize === 'large'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div>Grande</div>
                <div className="font-bold">{pizza.prices.large}€</div>
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Ingrédients de base</h3>
            <p className="text-sm text-gray-600 mb-3">Cliquez sur un ingrédient pour le retirer</p>
            <div className="flex flex-wrap gap-2">
              {pizza.ingredients.map((ingredient) => (
                <button
                  key={ingredient}
                  onClick={() => toggleIngredient(ingredient)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    removedIngredients.includes(ingredient)
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {ingredient}
                  {removedIngredients.includes(ingredient) && ' ✕'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Extras</h3>
            <p className="text-sm text-gray-600 mb-3">
              Personnalisez votre pizza avec des ingrédients supplémentaires
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                {availableExtras.slice(0, Math.ceil(availableExtras.length / 2)).map((extra) => (
                  <button
                    key={extra.id}
                    onClick={() => toggleExtra(extra)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                      selectedExtras.find(e => e.id === extra.id)
                        ? 'bg-orange-50 border-2 border-orange-500'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <span className="flex items-center">
                      {selectedExtras.find(e => e.id === extra.id) ? '−' : '+'} {extra.name}
                    </span>
                    <span className="font-medium">
                      {selectedExtras.find(e => e.id === extra.id) ? '−' : '+'}{extra.price}€
                    </span>
                  </button>
                ))}
              </div>
              <div className="space-y-2">
                {availableExtras.slice(Math.ceil(availableExtras.length / 2)).map((extra) => (
                  <button
                    key={extra.id}
                    onClick={() => toggleExtra(extra)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                      selectedExtras.find(e => e.id === extra.id)
                        ? 'bg-orange-50 border-2 border-orange-500'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <span className="flex items-center">
                      {selectedExtras.find(e => e.id === extra.id) ? '−' : '+'} {extra.name}
                    </span>
                    <span className="font-medium">
                      {selectedExtras.find(e => e.id === extra.id) ? '−' : '+'}{extra.price}€
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 bg-white border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">Total</span>
              <span className="text-2xl font-bold text-orange-500">
                {calculateTotal().toFixed(2)}€
              </span>
            </div>
            <button
              onClick={() => {
                onAddToCart(pizza, selectedSize, removedIngredients, selectedExtras);
                onClose();
              }}
              className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium"
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}