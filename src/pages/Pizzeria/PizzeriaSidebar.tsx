import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Users, Pizza, Settings, Plus, X } from 'lucide-react';
import { cn } from '../../lib/utils';

const menuItems = [
  {
    path: '/pizzeria',
    label: 'Tableau de bord',
    icon: LayoutDashboard,
  },
  {
    path: '/pizzeria/commandes',
    label: 'Commandes',
    icon: ShoppingBag,
  },
  {
    path: '/pizzeria/menu',
    label: 'Menu',
    icon: Pizza,
  },
  {
    path: '/pizzeria/supplements',
    label: 'Suppléments',
    icon: Plus,
  },
  {
    path: '/pizzeria/clients',
    label: 'Clients',
    icon: Users,
  },
  {
    path: '/pizzeria/parametres',
    label: 'Paramètres',
    icon: Settings,
  }
];

interface PizzeriaSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PizzeriaSidebar({ isOpen, onClose }: PizzeriaSidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed md:static top-0 left-0 h-full bg-white shadow-md z-50 w-64 transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="p-6">
          {/* Close button - Mobile only */}
          <button
            onClick={onClose}
            className="md:hidden absolute top-4 right-4 p-2 text-primary-600 hover:text-primary-800"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>

          <nav className="space-y-2 mt-8 md:mt-0">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={cn(
                  "flex items-center space-x-2 p-2 rounded-md transition",
                  location.pathname === item.path
                    ? "bg-primary-50 text-primary-800"
                    : "text-primary-600 hover:bg-primary-50 hover:text-primary-800"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}