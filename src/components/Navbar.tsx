import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Pizza, User, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { CartButton } from './CartButton';
import { CartModal } from './CartModal';
import { usePizzeriaStore } from '../stores/pizzeriaStore';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { settings } = usePizzeriaStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <nav className="bg-primary-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            {settings.logo_url ? (
              <img 
                src={settings.logo_url} 
                alt={settings.name}
                className="h-8 w-8 object-contain rounded"
              />
            ) : (
              <Pizza className="h-8 w-8 text-accent-400" />
            )}
            <span className="font-bold text-xl">{settings.name}</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/menu" className="hover:text-accent-400 transition">Menu</Link>
            {user ? (
              <>
                <Link to="/profile" className="hover:text-accent-400 transition">
                  <User className="h-5 w-5" />
                </Link>
                {user.role === 'client' && (
                  <Link to="/mes-commandes" className="hover:text-accent-400 transition">
                    Mes commandes
                  </Link>
                )}
                {user.role === 'admin' && (
                  <Link to="/admin" className="hover:text-accent-400 transition">
                    Admin
                  </Link>
                )}
                {user.role === 'pizzeria' && (
                  <Link to="/pizzeria" className="hover:text-accent-400 transition">
                    Tableau de bord
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="flex items-center hover:text-accent-400 transition"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Déconnexion
                </button>
              </>
            ) : (
              <Link to="/auth" className="hover:text-accent-400 transition">Connexion</Link>
            )}
            {user?.role === 'client' && (
              <div onClick={() => setIsCartOpen(true)}>
                <CartButton />
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <Link
              to="/menu"
              className="block py-2 hover:text-accent-400 transition"
              onClick={() => setIsOpen(false)}
            >
              Menu
            </Link>
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="block py-2 hover:text-accent-400 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Profil
                </Link>
                {user.role === 'client' && (
                  <Link
                    to="/mes-commandes"
                    className="block py-2 hover:text-accent-400 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Mes commandes
                  </Link>
                )}
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="block py-2 hover:text-accent-400 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                {user.role === 'pizzeria' && (
                  <Link
                    to="/pizzeria"
                    className="block py-2 hover:text-accent-400 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Tableau de bord
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left py-2 hover:text-accent-400 transition"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="block py-2 hover:text-accent-400 transition"
                onClick={() => setIsOpen(false)}
              >
                Connexion
              </Link>
            )}
            {user?.role === 'client' && (
              <div
                className="block py-2"
                onClick={() => {
                  setIsOpen(false);
                  setIsCartOpen(true);
                }}
              >
                <CartButton />
              </div>
            )}
          </div>
        )}
      </div>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
}