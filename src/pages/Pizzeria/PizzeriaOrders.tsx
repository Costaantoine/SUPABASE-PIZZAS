import { useState } from 'react';
import { Search, Clock, Timer } from 'lucide-react';
import { useOrderStore } from '../../stores/orderStore';
import type { OrderStatus } from '../../types';
import { STATUS_LABELS, STATUS_COLORS } from '../../constants/orderConstants';
import { OrderDetails } from '../../components/OrderDetails';
import { formatDateTime, formatTimeRemaining } from '../../lib/dateUtils';

export function PizzeriaOrders() {
  const { orders, updateOrderStatus } = useOrderStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');

  const filteredOrders = orders
    .filter(order => {
      const matchesSearch = order.user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toString().includes(searchTerm);
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-primary-800">Gestion des commandes</h1>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
          />
        </div>
        <div className="w-full sm:w-48">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as OrderStatus | 'all')}
            className="w-full px-4 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
          >
            <option value="all">Tous les statuts</option>
            {Object.entries(STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center text-primary-600">
            Aucune commande trouvée
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                  <div>
                    <h2 className="text-lg md:text-xl font-semibold text-primary-800">
                      Commande #{order.id}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-primary-600 mt-1">
                      <Clock className="h-4 w-4" />
                      <time dateTime={order.created_at}>
                        {formatDateTime(order.created_at)}
                      </time>
                    </div>
                    {order.estimated_ready_at && (
                      <div className="flex items-center gap-2 text-sm text-accent-600 mt-1">
                        <Timer className="h-4 w-4" />
                        <span>
                          Prête dans environ {formatTimeRemaining(order.estimated_ready_at)}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm text-center ${STATUS_COLORS[order.status]}`}>
                      {STATUS_LABELS[order.status]}
                    </span>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                      className="text-sm border border-primary-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-accent-500"
                    >
                      {Object.entries(STATUS_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="bg-primary-50 rounded-lg p-4 mb-6">
                  <h3 className="font-medium text-primary-800 mb-2">Informations client</h3>
                  <div className="space-y-1 text-sm text-primary-600">
                    <p className="font-medium text-primary-800">{order.user.full_name}</p>
                    <p>{order.user.phone}</p>
                    <p className="break-words">{order.user.address}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <OrderDetails key={index} item={item} />
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-primary-100">
                  <div className="flex justify-between items-center font-bold text-lg text-primary-800">
                    <span>Total</span>
                    <span>{order.total.toFixed(2)}€</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}