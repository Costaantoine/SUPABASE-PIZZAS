import { cn } from '../../lib/utils';
import { STATUS_LABELS, STATUS_COLORS } from '../../constants/orderConstants';
import type { OrderStatus } from '../../types';

interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
  return (
    <span className={cn(
      `px-3 py-1 rounded-full text-sm`,
      STATUS_COLORS[status],
      className
    )}>
      {STATUS_LABELS[status]}
    </span>
  );
}