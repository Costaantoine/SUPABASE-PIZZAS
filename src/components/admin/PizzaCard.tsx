import { Edit2, Trash2 } from 'lucide-react';
import type { Pizza } from '../../types';

interface PizzaCardProps {
  pizza: Pizza;
  onEdit: (pizza: Pizza) => void;
  onDelete: (id: number) => void;
}

export function PizzaCard({ pizza, onEdit, onDelete }: PizzaCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={pizza.image_url}
        alt={pizza.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-primary-800">{pizza.name}</h3>
        <p className="text-sm text-primary-600 mt-1">{pizza.description}</p>
        <div className="mt-2 space-y-1">
          <p className="text-sm text-primary-700">
            <span className="font-medium">Petite:</span> {pizza.prices.small}€
          </p>
          <p className="text-sm text-primary-700">
            <span className="font-medium">Moyenne:</span> {pizza.prices.medium}€
          </p>
          <p className="text-sm text-primary-700">
            <span className="font-medium">Grande:</span> {pizza.prices.large}€
          </p>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={() => onEdit(pizza)}
            className="p-2 text-primary-600 hover:text-primary-800 transition"
          >
            <Edit2 className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDelete(pizza.id)}
            className="p-2 text-red-600 hover:text-red-800 transition"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}