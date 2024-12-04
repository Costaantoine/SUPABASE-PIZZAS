import { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { usePizzeriaStore } from '../stores/pizzeriaStore';
import toast from 'react-hot-toast';

export function Contact() {
  const { settings } = usePizzeriaStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate sending email
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Send notification
      toast.success('Votre message a été envoyé avec succès !');
      
      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Une erreur est survenue lors de l\'envoi du message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-primary-800 mb-8 text-center">Contactez-nous</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-primary-800 mb-4">Nos coordonnées</h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-accent-500 mt-1" />
                <div>
                  <p className="font-medium text-primary-800">Adresse</p>
                  <p className="text-primary-600">{settings.address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-accent-500 mt-1" />
                <div>
                  <p className="font-medium text-primary-800">Téléphone</p>
                  <p className="text-primary-600">{settings.phone}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-accent-500 mt-1" />
                <div>
                  <p className="font-medium text-primary-800">Email</p>
                  <p className="text-primary-600">{settings.email}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-accent-500 mt-1" />
                <div>
                  <p className="font-medium text-primary-800">Horaires d'ouverture</p>
                  <ul className="text-primary-600">
                    <li>Lundi - Jeudi : {settings.opening_hours.monday_thursday}</li>
                    <li>Vendredi - Samedi : {settings.opening_hours.friday_saturday}</li>
                    <li>Dimanche : {settings.opening_hours.sunday}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-primary-800 mb-4">Carte</h2>
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.2159245650784!2d2.2986800156631718!3d48.86936220762615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc49b9e6431%3A0x7e0ac3891035e768!2sAv.%20des%20Champs-%C3%89lys%C3%A9es%2C%2075008%20Paris!5e0!3m2!1sfr!2sfr!4v1647856432015!5m2!1sfr!2sfr"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-primary-800 mb-4">Envoyez-nous un message</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-primary-700 mb-1">
                Nom complet
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-primary-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                required
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-primary-700 mb-1">
                Sujet
              </label>
              <input
                type="text"
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-primary-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={6}
                className="w-full px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-accent-500 text-white py-2 px-4 rounded-md hover:bg-accent-600 transition disabled:opacity-50"
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}