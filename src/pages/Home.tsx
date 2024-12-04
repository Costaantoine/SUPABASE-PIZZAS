import { Link } from 'react-router-dom';
import { Pizza } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function Home() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-primary-800 mb-4">
          Pizza Délice
        </h1>
        <p className="text-xl text-primary-600 max-w-2xl mx-auto">
          Des pizzas artisanales préparées avec passion, à emporter.
        </p>
      </div>

      <div className={`grid ${user ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-8 max-w-4xl w-full mb-12`}>
        <Link
          to="/menu"
          className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition group"
        >
          <Pizza className="h-12 w-12 text-accent-500 mb-4 group-hover:text-accent-600" />
          <h2 className="text-2xl font-bold text-primary-800 mb-2">Notre Menu</h2>
          <p className="text-primary-600">
            Découvrez nos délicieuses pizzas préparées avec des ingrédients frais
          </p>
        </Link>

        {!user && (
          <Link
            to="/auth"
            className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition group"
          >
            <Pizza className="h-12 w-12 text-secondary-500 mb-4 group-hover:text-secondary-600" />
            <h2 className="text-2xl font-bold text-primary-800 mb-2">Commander</h2>
            <p className="text-primary-600">
              Créez votre compte et commandez en quelques clics
            </p>
          </Link>
        )}
      </div>
    </div>
  );
}