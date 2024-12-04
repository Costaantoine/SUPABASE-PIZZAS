import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Loader2 } from 'lucide-react';
import { validateEmail, validatePassword, validatePhone } from '../lib/validation';
import { ForgotPassword } from './ForgotPassword';

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();

  const validateForm = () => {
    if (!validateEmail(email)) {
      setError('Format d\'email invalide');
      return false;
    }

    if (!validatePassword(password)) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return false;
    }

    if (!isLogin) {
      if (!fullName.trim()) {
        setError('Le nom complet est requis');
        return false;
      }

      if (!validatePhone(phone)) {
        setError('Format de numéro de téléphone invalide');
        return false;
      }

      if (!address.trim()) {
        setError('L\'adresse est requise');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password, {
          full_name: fullName,
          phone,
          address
        });
      }
      navigate('/');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(isLogin ? 'Erreur lors de la connexion' : 'Erreur lors de l\'inscription');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setEmail('');
    setPassword('');
    setFullName('');
    setPhone('');
    setAddress('');
  };

  if (showForgotPassword) {
    return <ForgotPassword onBack={() => setShowForgotPassword(false)} />;
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-primary-800 mb-8 text-center">
        {isLogin ? 'Connexion' : 'Inscription'}
      </h1>

      <div className="bg-white rounded-lg shadow-md p-8">
        {isLogin && (
          <div className="mb-6 text-center">
            <p className="text-primary-600">Comptes de démonstration :</p>
            <p className="text-sm text-primary-500">Admin : admin@demo.com / demo123</p>
            <p className="text-sm text-primary-500">Pizzeria : pizzeria@demo.com / demo123</p>
            <p className="text-sm text-primary-500">Client : client@demo.com / demo123</p>
          </div>
        )}

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

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-primary-700 mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
              required
              disabled={isLoading}
              minLength={6}
            />
            {isLogin && (
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-accent-500 hover:text-accent-600 mt-1"
              >
                Mot de passe oublié ?
              </button>
            )}
          </div>

          {!isLogin && (
            <>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-primary-700 mb-1">
                  Nom complet
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-primary-700 mb-1">
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                  required
                  disabled={isLoading}
                  placeholder="+33 6 12 34 56 78"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-primary-700 mb-1">
                  Adresse
                </label>
                <textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                  required
                  disabled={isLoading}
                  rows={3}
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-accent-500 text-white py-2 px-4 rounded-md hover:bg-accent-600 transition disabled:opacity-50 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                {isLogin ? 'Connexion...' : 'Inscription...'}
              </>
            ) : (
              isLogin ? 'Se connecter' : 'S\'inscrire'
            )}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={switchMode}
              disabled={isLoading}
              className="text-accent-500 hover:text-accent-600 transition disabled:opacity-50"
            >
              {isLogin ? 'Créer un compte' : 'Déjà inscrit ? Se connecter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}