import { useEffect, useState } from 'react';
import { DollarSign, ShoppingBag, TrendingUp, Pizza } from 'lucide-react';
import type { DashboardStats } from '../../types';

// Données de démonstration
const MOCK_STATS: DashboardStats = {
  total_orders: 156,
  total_revenue: 4350,
  average_order_value: 27.88,
  popular_pizzas: [
    { name: 'Margherita', count: 45 },
    { name: 'Pepperoni', count: 38 },
    { name: 'Quatre Fromages', count: 32 },
  ],
  recent_orders: [
    {
      id: 1,
      user_id: '2',
      user: {
        full_name: 'Jean Dupont',
        phone: '+33612345678',
        address: '123 Rue de Paris'
      },
      items: [
        {
          pizza_id: 1,
          pizza_name: 'Margherita',
          size: 'medium',
          quantity: 2,
          price: 24
        }
      ],
      total: 24,
      status: 'pending',
      created_at: new Date().toISOString()
    }
  ]
};

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>(MOCK_STATS);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary-800">Tableau de bord</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Commandes totales"
          value={stats.total_orders}
          icon={<ShoppingBag className="h-6 w-6" />}
          color="bg-blue-500"
        />
        <StatCard
          title="Chiffre d'affaires"
          value={`${stats.total_revenue}€`}
          icon={<DollarSign className="h-6 w-6" />}
          color="bg-green-500"
        />
        <StatCard
          title="Panier moyen"
          value={`${stats.average_order_value.toFixed(2)}€`}
          icon={<TrendingUp className="h-6 w-6" />}
          color="bg-purple-500"
        />
        <StatCard
          title="Pizzas populaires"
          value={stats.popular_pizzas[0].name}
          icon={<Pizza className="h-6 w-6" />}
          color="bg-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-primary-800 mb-4">
            Pizzas les plus vendues
          </h2>
          <div className="space-y-4">
            {stats.popular_pizzas.map((pizza) => (
              <div
                key={pizza.name}
                className="flex items-center justify-between"
              >
                <span className="text-primary-600">{pizza.name}</span>
                <span className="text-primary-800 font-semibold">
                  {pizza.count} vendues
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-primary-800 mb-4">
            Commandes récentes
          </h2>
          <div className="space-y-4">
            {stats.recent_orders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between border-b border-gray-100 pb-4"
              >
                <div>
                  <p className="font-semibold text-primary-800">
                    {order.user.full_name}
                  </p>
                  <p className="text-sm text-primary-600">
                    {new Date(order.created_at).toLocaleDateString('fr-FR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary-800">
                    {order.total}€
                  </p>
                  <p className="text-sm text-primary-600">
                    {order.items.length} article(s)
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-4">
        <div className={`${color} p-3 rounded-full text-white`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-primary-600">{title}</p>
          <p className="text-2xl font-bold text-primary-800">{value}</p>
        </div>
      </div>
    </div>
  );
}