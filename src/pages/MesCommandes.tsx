import { useEffect } from 'react';
import { useOrderStore } from '../stores/orderStore';
import { useAuth } from '../hooks/useAuth';
import { STATUS_LABELS } from '../constants/orderConstants';
import { OrderDetails } from '../components/OrderDetails';
import { OrderTimeDisplay } from '../components/OrderTimeDisplay';
import { OrderProgressBar } from '../components/order/OrderProgressBar';
import { OrderStatusBadge } from '../components/order/OrderStatusBadge';

export function MesCommandes() {
  const { user } = useAuth();
  const { orders } = useOrderStore();

  const userOrders = orders
    .filter(order => order.user_id === user?.id)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  // Force re-render every minute for active orders
  useEffect(() => {
    const interval = setInterval(() => {
      // This empty setState will trigger a re-render
      useOrderStore.setState({});
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-primary-800 mb-8">Mes commandes</h1>

      {userOrders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-primary-600">Vous n'avez pas encore passé de commande.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {userOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="border-b border-primary-100 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                  <div className="w-full sm:w-auto">
                    <h2 className="text-xl font-semibold text-primary-800">
                      Commande #{order.id}
                    </h2>
                    <OrderTimeDisplay
                      status={order.status}
                      createdAt={order.created_at}
                      confirmedAt={order.confirmed_at}
                      preparationAt={order.preparation_at}
                      readyAt={order.ready_at}
                      estimatedReadyAt={order.estimated_ready_at}
                    />
                  </div>
                  <OrderStatusBadge status={order.status} className="self-start sm:self-center" />
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

              <div className="bg-primary-50 p-4 sm:p-6">
                <div className="hidden sm:flex justify-between mb-2">
                  {Object.entries(STATUS_LABELS).map(([status, label]) => (
                    <div
                      key={status}
                      className={`text-xs ${
                        Object.keys(STATUS_LABELS).indexOf(order.status) >= 
                        Object.keys(STATUS_LABELS).indexOf(status)
                          ? 'text-primary-800 font-medium'
                          : 'text-primary-400'
                      }`}
                    >
                      {label}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:block">
                  <div className="text-xs sm:hidden mb-2">
                    <span className="font-medium text-primary-800">
                      {STATUS_LABELS[order.status]}
                    </span>
                  </div>
                  <OrderProgressBar status={order.status} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}