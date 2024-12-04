import { OrderTimeline } from './order/OrderTimeline';
import { EstimatedTime } from './order/EstimatedTime';
import type { OrderStatus } from '../types';

interface OrderTimeDisplayProps {
  status: OrderStatus;
  createdAt: string;
  confirmedAt?: string;
  preparationAt?: string;
  readyAt?: string;
  estimatedReadyAt?: string;
}

export function OrderTimeDisplay({
  status,
  createdAt,
  confirmedAt,
  preparationAt,
  readyAt,
  estimatedReadyAt
}: OrderTimeDisplayProps) {
  return (
    <div className="mt-4 space-y-2">
      <OrderTimeline
        status={status}
        createdAt={createdAt}
        confirmedAt={confirmedAt}
        preparationAt={preparationAt}
        readyAt={readyAt}
      />
      <EstimatedTime
        status={status}
        estimatedReadyAt={estimatedReadyAt}
        readyAt={readyAt}
      />
    </div>
  );
}