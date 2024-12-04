import type { OrderStatus } from '../types';

export const STATUS_LABELS: Record<OrderStatus, string> = {
  en_attente: 'En attente',
  confirmee: 'Confirmée',
  en_preparation: 'En préparation',
  prete: 'Prête',
  recuperee: 'Récupérée'
};

export const STATUS_COLORS: Record<OrderStatus, string> = {
  en_attente: 'bg-yellow-100 text-yellow-800',
  confirmee: 'bg-blue-100 text-blue-800',
  en_preparation: 'bg-purple-100 text-purple-800',
  prete: 'bg-green-100 text-green-800',
  recuperee: 'bg-gray-100 text-gray-800'
};

export const getProgressColor = (status: OrderStatus): string => {
  switch (status) {
    case 'en_attente':
      return 'bg-yellow-500';
    case 'confirmee':
      return 'bg-blue-500';
    case 'en_preparation':
      return 'bg-purple-500';
    case 'prete':
    case 'recuperee':
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
};

export const getProgressWidth = (status: OrderStatus): string => {
  const statusIndex = Object.keys(STATUS_LABELS).indexOf(status);
  return `${(statusIndex / (Object.keys(STATUS_LABELS).length - 1)) * 100}%`;
};