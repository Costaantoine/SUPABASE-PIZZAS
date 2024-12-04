import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';
import { useAuth } from '../hooks/useAuth';
import { usePizzaStore } from '../stores/pizzaStore';
import type { Pizza, Extra } from '../types';
import { PizzaModal } from '../components/PizzaModal';
import toast from 'react-hot-toast';

export function Menu() {
  const [selectedCategory, setSelectedCategory] = useState<string>('toutes');
  const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);
  const addToCart = useCartStore(state => state.addItem);
  const { user } = useAuth();
  const { pizzas } = usePizzaStore();
  const navigate = useNavigate();
  
  const categories = ['toutes', ...new Set(pizzas.map(pizza => pizza.category))];
  const filteredPizzas = selectedCategory === 'toutes' 
    ? pizzas 
    : pizzas.filter(pizza => pizza.category === selectedCategory);

  const handleAddToCart = (pizza: Pizza, size: 'small' | 'medium' | 'large', removedIngredients: string[], extras: Extra[]) => {
    if (!user) {
      navigate('/auth');
      return;
    }

    addToCart({
      pizza,
      size,
      quantity: 1,
      removedIngredients,
      extras
    });
    toast.success(`${pizza.name} ajoutée au panier !`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-primary-800 mb-8 text-center">Notre Menu</h1>
      
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full transition-all ${
              selectedCategory === category
                ? 'bg-accent-500 text-white shadow-lg scale-105'
                : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPizzas.map((pizza) => (
          <div
            key={pizza.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <img
              src={pizza.image_url}
              alt={pizza.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-primary-800 mb-2">{pizza.name}</h2>
              <p className="text-primary-600 mb-4">{pizza.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-primary-800">À partir de {pizza.prices.small}€</span>
                <button
                  onClick={() => setSelectedPizza(pizza)}
                  className="bg-accent-500 text-white px-4 py-2 rounded-lg hover:bg-accent-600 transition"
                >
                  Personnaliser
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedPizza && (
        <PizzaModal
          pizza={selectedPizza}
          isOpen={!!selectedPizza}
          onClose={() => setSelectedPizza(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}