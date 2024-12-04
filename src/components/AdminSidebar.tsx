import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Users } from 'lucide-react';
import { cn } from '../lib/utils';

const menuItems = [
  {
    path: '/admin',
    label: 'Tableau de bord',
    icon: LayoutDashboard,
  },
  {
    path: '/admin/orders',
    label: 'Commandes',
    icon: ShoppingBag,
  },
  {
    path: '/admin/customers',
    label: 'Clientèle',
    icon: Users,
  }
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white rounded-lg shadow-md p-6 h-fit">
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              'flex items-center space-x-2 p-2 rounded-md transition',
              location.pathname === item.path
                ? 'bg-primary-50 text-primary-800'
                : 'text-primary-600 hover:bg-primary-50 hover:text-primary-800'
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}