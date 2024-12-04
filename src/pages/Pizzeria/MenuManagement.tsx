import { useState } from 'react';
import { Plus } from 'lucide-react';
import { usePizzaStore } from '../../stores/pizzaStore';
import { PizzaForm } from '../../components/admin/PizzaForm';
import { PizzaCard } from '../../components/admin/PizzaCard';
import type { Pizza } from '../../types';

export function MenuManagement() {
  const { pizzas, addPizza, updatePizza, deletePizza } = usePizzaStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPizza, setEditingPizza] = useState<Pizza | null>(null);

  const handleSubmit = (formData: Omit<Pizza, 'id'>) => {
    if (editingPizza) {
      updatePizza(editingPizza.id, formData);
    } else {
      addPizza(formData);
    }
    setIsModalOpen(false);
    setEditingPizza(null);
  };

  const handleEdit = (pizza: Pizza) => {
    setEditingPizza(pizza);
    setIsModalOpen(true);
  };

  const handleDelete = (pizzaId: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette pizza ?')) {
      deletePizza(pizzaId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary-800">Gestion du menu</h1>
        <button
          onClick={() => {
            setEditingPizza(null);
            setIsModalOpen(true);
          }}
          className="flex items-center space-x-2 bg-accent-500 text-white px-4 py-2 rounded-md hover:bg-accent-600 transition"
        >
          <Plus className="h-5 w-5" />
          <span>Ajouter une pizza</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pizzas.map((pizza) => (
          <PizzaCard
            key={pizza.id}
            pizza={pizza}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {isModalOpen && (
        <PizzaForm
          pizza={editingPizza || undefined}
          onSubmit={handleSubmit}
          onClose={() => {
            setIsModalOpen(false);
            setEditingPizza(null);
          }}
        />
      )}
    </div>
  );
}