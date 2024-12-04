import { useState } from 'react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { validateEmail } from '../lib/validation';
import { useAuthStore } from '../stores/authStore';

interface ForgotPasswordProps {
  onBack: () => void;
}

export function ForgotPassword({ onBack }: ForgotPasswordProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { requestPasswordReset } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!validateEmail(email)) {
      setError('Format d\'email invalide');
      return;
    }

    setIsLoading(true);

    try {
      await requestPasswordReset(email);
      setSuccess(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Une erreur est survenue');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <button
        onClick={onBack}
        className="flex items-center text-primary-600 hover:text-primary-800 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Retour
      </button>

      <h1 className="text-3xl font-bold text-primary-800 mb-8 text-center">
        Mot de passe oublié
      </h1>

      <div className="bg-white rounded-lg shadow-md p-8">
        {success ? (
          <div className="text-center">
            <div className="bg-green-50 text-green-700 p-4 rounded-md mb-4">
              Un email de réinitialisation a été envoyé à {email}
            </div>
            <p className="text-primary-600 mb-4">
              Veuillez vérifier votre boîte de réception et suivre les instructions pour réinitialiser votre mot de passe.
            </p>
            <button
              onClick={onBack}
              className="text-accent-500 hover:text-accent-600"
            >
              Retour à la connexion
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-500 p-4 rounded-md">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-primary-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                required
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent-500 text-white py-2 px-4 rounded-md hover:bg-accent-600 transition disabled:opacity-50 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Envoi en cours...
                </>
              ) : (
                'Réinitialiser le mot de passe'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}