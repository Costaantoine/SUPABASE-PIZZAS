import { useState } from 'react';
import { Save } from 'lucide-react';
import { usePizzeriaStore } from '../../stores/pizzeriaStore';
import toast from 'react-hot-toast';

export function Settings() {
  const { settings, updateSettings } = usePizzeriaStore();
  const [formData, setFormData] = useState(settings);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      updateSettings(formData);
      toast.success('Paramètres mis à jour avec succès');
    } catch (error) {
      toast.error('Erreur lors de la mise à jour des paramètres');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, logo_url: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary-800">Paramètres</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Information Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-primary-800 mb-4">
            Informations générales
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary-700 mb-1">
                Nom de la pizzeria
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
                Logo
              </label>
              <div className="flex items-center space-x-4">
                {formData.logo_url && (
                  <img
                    src={formData.logo_url}
                    alt="Logo"
                    className="h-16 w-16 object-cover rounded-lg"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="text-sm text-primary-600"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Preparation Times Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-primary-800 mb-4">
            Temps de préparation
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary-700 mb-1">
                Temps après confirmation (minutes)
              </label>
              <input
                type="number"
                min="1"
                value={formData.preparation_times.confirmation}
                onChange={(e) => setFormData({
                  ...formData,
                  preparation_times: {
                    ...formData.preparation_times,
                    confirmation: parseInt(e.target.value)
                  }
                })}
                className="w-full px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                required
              />
              <p className="mt-1 text-sm text-primary-500">
                Temps d'attente estimé après la confirmation de la commande
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-700 mb-1">
                Temps de préparation (minutes)
              </label>
              <input
                type="number"
                min="1"
                value={formData.preparation_times.preparation}
                onChange={(e) => setFormData({
                  ...formData,
                  preparation_times: {
                    ...formData.preparation_times,
                    preparation: parseInt(e.target.value)
                  }
                })}
                className="w-full px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                required
              />
              <p className="mt-1 text-sm text-primary-500">
                Temps de préparation estimé une fois la commande en préparation
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-primary-800 mb-4">
            Coordonnées
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary-700 mb-1">
                Adresse
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-700 mb-1">
                Téléphone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Opening Hours Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-primary-800 mb-4">
            Horaires d'ouverture
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary-700 mb-1">
                Lundi - Jeudi
              </label>
              <input
                type="text"
                value={formData.opening_hours.monday_thursday}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    opening_hours: {
                      ...formData.opening_hours,
                      monday_thursday: e.target.value
                    }
                  })
                }
                className="w-full px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-700 mb-1">
                Vendredi - Samedi
              </label>
              <input
                type="text"
                value={formData.opening_hours.friday_saturday}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    opening_hours: {
                      ...formData.opening_hours,
                      friday_saturday: e.target.value
                    }
                  })
                }
                className="w-full px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-700 mb-1">
                Dimanche
              </label>
              <input
                type="text"
                value={formData.opening_hours.sunday}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    opening_hours: {
                      ...formData.opening_hours,
                      sunday: e.target.value
                    }
                  })
                }
                className="w-full px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center space-x-2 bg-accent-500 text-white px-4 py-2 rounded-md hover:bg-accent-600 transition disabled:opacity-50"
          >
            <Save className="h-5 w-5" />
            <span>{isLoading ? 'Enregistrement...' : 'Enregistrer'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}