import { getProgressColor, getProgressWidth } from '../../constants/orderConstants';
import type { OrderStatus } from '../../types';

interface OrderProgressBarProps {
  status: OrderStatus;
}

export function OrderProgressBar({ status }: OrderProgressBarProps) {
  return (
    <div className="h-2 bg-primary-200 rounded-full overflow-hidden">
      <div
        className={`h-full transition-all duration-500 ease-out ${getProgressColor(status)}`}
        style={{ width: getProgressWidth(status) }}
      />
    </div>
  );
}