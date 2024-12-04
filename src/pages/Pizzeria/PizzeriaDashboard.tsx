import { useEffect, useState } from 'react';
import { DollarSign, ShoppingBag, TrendingUp, Clock } from 'lucide-react';
import { useOrderStore } from '../../stores/orderStore';
import type { DashboardStats } from '../../types';

export function PizzeriaDashboard() {
  const { orders } = useOrderStore();
  const [stats, setStats] = useState<DashboardStats>({
    total_orders: 0,
    total_revenue: 0,
    average_order_value: 0,
    popular_pizzas: [],
    recent_orders: []
  });

  useEffect(() => {
    // Calculer les statistiques à partir des commandes
    const total_orders = orders.length;
    const total_revenue = orders.reduce((sum, order) => sum + order.total, 0);
    const average_order_value = total_orders > 0 ? total_revenue / total_orders : 0;

    // Calculer les pizzas populaires
    const pizzaCounts = new Map<string, number>();
    orders.forEach(order => {
      order.items.forEach(item => {
        const count = pizzaCounts.get(item.pizza_name) || 0;
        pizzaCounts.set(item.pizza_name, count + item.quantity);
      });
    });

    const popular_pizzas = Array.from(pizzaCounts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);

    setStats({
      total_orders,
      total_revenue,
      average_order_value,
      popular_pizzas,
      recent_orders: orders.slice(0, 5)
    });
  }, [orders]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary-800">Tableau de bord</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Commandes du jour"
          value={stats.total_orders}
          icon={<ShoppingBag className="h-6 w-6" />}
          color="bg-blue-500"
        />
        <StatCard
          title="Chiffre d'affaires"
          value={`${stats.total_revenue.toFixed(2)}€`}
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
          title="Temps moyen"
          value="25 min"
          icon={<Clock className="h-6 w-6" />}
          color="bg-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-primary-800 mb-4">
            Commandes en cours
          </h2>
          <div className="space-y-4">
            {orders
              .filter(order => order.status !== 'recuperee')
              .slice(0, 5)
              .map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between border-b border-gray-100 pb-4"
                >
                  <div>
                    <p className="font-semibold text-primary-800">
                      Commande #{order.id}
                    </p>
                    <p className="text-sm text-primary-600">
                      {order.user.full_name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary-800">
                      {order.total}€
                    </p>
                    <p className="text-sm text-primary-600">
                      {order.status}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

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