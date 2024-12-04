import { Pizza } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-primary-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Pizza className="h-6 w-6 text-accent-400" />
            <span className="font-bold text-lg">Pizza Délice</span>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-8 items-center">
            <Link to="/legal" className="hover:text-accent-400 transition mb-2 md:mb-0">
              Mentions légales
            </Link>
            <Link to="/privacy" className="hover:text-accent-400 transition mb-2 md:mb-0">
              Politique de confidentialité
            </Link>
            <Link to="/contact" className="hover:text-accent-400 transition">
              Contact
            </Link>
          </div>
        </div>
        <div className="text-center mt-8 text-primary-400">
          © {new Date().getFullYear()} Pizza Délice. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}