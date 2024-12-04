import { Clock } from 'lucide-react';
import { formatDateTime } from '../../lib/dateUtils';
import type { OrderStatus } from '../../types';

interface TimelineEventProps {
  icon: React.ReactNode;
  label: string;
  timestamp: string;
  textColor?: string;
}

function TimelineEvent({ icon, label, timestamp, textColor = 'text-primary-600' }: TimelineEventProps) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className={textColor}>{label}</span>
      <span className="font-medium text-primary-800">
        {formatDateTime(timestamp)}
      </span>
    </div>
  );
}

interface OrderTimelineProps {
  status: OrderStatus;
  createdAt: string;
  confirmedAt?: string;
  preparationAt?: string;
  readyAt?: string;
}

export function OrderTimeline({
  status,
  createdAt,
  confirmedAt,
  preparationAt,
  readyAt
}: OrderTimelineProps) {
  return (
    <div className="space-y-2 text-sm">
      <TimelineEvent
        icon={<Clock className="h-4 w-4 text-primary-600" />}
        label="Commande passée le"
        timestamp={createdAt}
      />

      {confirmedAt && (
        <TimelineEvent
          icon={<Clock className="h-4 w-4 text-blue-600" />}
          label="Commande confirmée le"
          timestamp={confirmedAt}
          textColor="text-blue-600"
        />
      )}

      {preparationAt && (
        <TimelineEvent
          icon={<Clock className="h-4 w-4 text-purple-600" />}
          label="Préparation commencée le"
          timestamp={preparationAt}
          textColor="text-purple-600"
        />
      )}

      {readyAt && (
        <TimelineEvent
          icon={<Clock className="h-4 w-4 text-green-600" />}
          label="Commande prête depuis le"
          timestamp={readyAt}
          textColor="text-green-600"
        />
      )}
    </div>
  );
}