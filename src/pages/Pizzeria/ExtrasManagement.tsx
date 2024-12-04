import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useExtrasStore } from '../../stores/extrasStore';
import type { Extra } from '../../types';
import toast from 'react-hot-toast';

export function ExtrasManagement() {
  const { extras, addExtra, updateExtra, deleteExtra } = useExtrasStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editingExtra, setEditingExtra] = useState<Extra | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const price = parseFloat(formData.price);
    if (isNaN(price)) {
      toast.error('Le prix doit être un nombre valide');
      return;
    }

    if (editingExtra) {
      updateExtra(editingExtra.id, { name: formData.name, price });
      toast.success('Supplément modifié avec succès');
    } else {
      addExtra({ name: formData.name, price });
      toast.success('Supplément ajouté avec succès');
    }

    setFormData({ name: '', price: '' });
    setIsEditing(false);
    setEditingExtra(null);
  };

  const handleEdit = (extra: Extra) => {
    setIsEditing(true);
    setEditingExtra(extra);
    setFormData({
      name: extra.name,
      price: extra.price.toString()
    });
  };

  const handleDelete = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce supplément ?')) {
      deleteExtra(id);
      toast.success('Supplément supprimé avec succès');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-primary-800">Gestion des suppléments</h2>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-primary-700 mb-1">
              Nom du supplément
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
              Prix (€)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
              required
            />
          </div>
        </div>
        <div className="flex justify-end">
          {isEditing && (
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setEditingExtra(null);
                setFormData({ name: '', price: '' });
              }}
              className="mr-2 px-4 py-2 text-primary-600 hover:text-primary-800 transition"
            >
              Annuler
            </button>
          )}
          <button
            type="submit"
            className="flex items-center space-x-2 bg-accent-500 text-white px-4 py-2 rounded-md hover:bg-accent-600 transition"
          >
            <Plus className="h-5 w-5" />
            <span>{isEditing ? 'Modifier' : 'Ajouter'}</span>
          </button>
        </div>
      </form>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-primary-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-primary-800">Nom</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-primary-800">Prix</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-primary-800">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary-100">
            {extras.map((extra) => (
              <tr key={extra.id} className="hover:bg-primary-50">
                <td className="px-6 py-4 text-primary-800">{extra.name}</td>
                <td className="px-6 py-4 text-primary-800">{extra.price.toFixed(2)}€</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleEdit(extra)}
                    className="text-primary-600 hover:text-primary-800 mr-2"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(extra.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}