import { useState } from 'react';
import { X } from 'lucide-react';
import type { Pizza } from '../../types';

interface PizzaFormData {
  name: string;
  description: string;
  image_url: string;
  prices: {
    small: number;
    medium: number;
    large: number;
  };
  ingredients: string[];
  category: string;
  vegetarian: boolean;
}

const CATEGORIES = ['classiques', 'fromages', 'végétariennes', 'spécialités'];

interface PizzaFormProps {
  pizza?: Pizza;
  onSubmit: (data: PizzaFormData) => void;
  onClose: () => void;
}

const initialFormData: PizzaFormData = {
  name: '',
  description: '',
  image_url: '',
  prices: {
    small: 0,
    medium: 0,
    large: 0
  },
  ingredients: [],
  category: 'classiques',
  vegetarian: false
};

export function PizzaForm({ pizza, onSubmit, onClose }: PizzaFormProps) {
  const [formData, setFormData] = useState<PizzaFormData>(
    pizza ? {
      name: pizza.name,
      description: pizza.description,
      image_url: pizza.image_url,
      prices: { ...pizza.prices },
      ingredients: [...pizza.ingredients],
      category: pizza.category,
      vegetarian: pizza.vegetarian
    } : initialFormData
  );
  const [currentIngredient, setCurrentIngredient] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleAddIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentIngredient.trim() && !formData.ingredients.includes(currentIngredient.trim())) {
      setFormData({
        ...formData,
        ingredients: [...formData.ingredients, currentIngredient.trim()]
      });
      setCurrentIngredient('');
    }
  };

  const handleRemoveIngredient = (ingredient: string) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter(i => i !== ingredient)
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-primary-800">
            {pizza ? 'Modifier la pizza' : 'Ajouter une pizza'}
          </h2>
          <button
            onClick={onClose}
            className="text-primary-500 hover:text-primary-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-primary-700 mb-1">
              Nom
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-700 mb-1">
              URL de l'image
            </label>
            <input
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="w-full px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            {['small', 'medium', 'large'].map((size) => (
              <div key={size}>
                <label className="block text-sm font-medium text-primary-700 mb-1">
                  Prix ({size === 'small' ? 'Petite' : size === 'medium' ? 'Moyenne' : 'Grande'})
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.prices[size as keyof typeof formData.prices]}
                  onChange={(e) => setFormData({
                    ...formData,
                    prices: { ...formData.prices, [size]: parseFloat(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                  required
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-700 mb-1">
              Ingrédients
            </label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={currentIngredient}
                onChange={(e) => setCurrentIngredient(e.target.value)}
                className="flex-1 px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                placeholder="Ajouter un ingrédient"
              />
              <button
                type="button"
                onClick={handleAddIngredient}
                className="px-4 py-2 bg-accent-500 text-white rounded-md hover:bg-accent-600 transition"
              >
                Ajouter
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.ingredients.map((ingredient) => (
                <span
                  key={ingredient}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800"
                >
                  {ingredient}
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(ingredient)}
                    className="ml-2 text-primary-600 hover:text-primary-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-700 mb-1">
              Catégorie
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
            >
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="vegetarian"
              checked={formData.vegetarian}
              onChange={(e) => setFormData({ ...formData, vegetarian: e.target.checked })}
              className="h-4 w-4 text-accent-500 focus:ring-accent-500 border-primary-300 rounded"
            />
            <label htmlFor="vegetarian" className="ml-2 text-sm text-primary-700">
              Pizza végétarienne
            </label>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-primary-600 hover:text-primary-800 transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-accent-500 text-white rounded-md hover:bg-accent-600 transition"
            >
              {pizza ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}