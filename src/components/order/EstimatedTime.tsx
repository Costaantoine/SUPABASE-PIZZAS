import { Timer } from 'lucide-react';
import { formatTimeRemaining, formatEstimatedTime } from '../../lib/dateUtils';
import type { OrderStatus } from '../../types';

interface EstimatedTimeProps {
  status: OrderStatus;
  estimatedReadyAt?: string;
  readyAt?: string;
}

export function EstimatedTime({ status, estimatedReadyAt, readyAt }: EstimatedTimeProps) {
  if (!estimatedReadyAt || status === 'prete' || status === 'recuperee') {
    return null;
  }

  // Only show estimated time for confirmed and in preparation status
  if (status !== 'confirmee' && status !== 'en_preparation') {
    return null;
  }

  const timeRemaining = formatTimeRemaining(estimatedReadyAt);
  const estimatedTime = formatEstimatedTime(estimatedReadyAt);

  return (
    <div className="flex items-center gap-2 text-sm">
      <Timer className="h-4 w-4 text-accent-600" />
      <span className="text-accent-600">
        Prête dans environ {timeRemaining} (vers {estimatedTime})
      </span>
    </div>
  );
}