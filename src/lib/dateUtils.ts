export function formatDateTime(date: string): string {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function formatTimeRemaining(targetDate: string): string {
  const remaining = new Date(targetDate).getTime() - new Date().getTime();
  
  if (remaining <= 0) return 'Dépassé';
  
  const minutes = Math.floor(remaining / 60000);
  if (minutes < 60) {
    return `${minutes} min`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h${remainingMinutes > 0 ? ` ${remainingMinutes}min` : ''}`;
}

export function calculateEstimatedReadyTime(
  status: 'en_attente' | 'confirmee' | 'en_preparation',
  confirmedAt: string | undefined,
  settings: { confirmation: number; preparation: number }
): Date {
  const now = new Date();
  
  if (status === 'en_preparation') {
    // Add preparation time to the current time
    return new Date(now.getTime() + settings.preparation * 60000);
  } else if (status === 'confirmee' && confirmedAt) {
    // Add confirmation time to the confirmation timestamp
    return new Date(new Date(confirmedAt).getTime() + settings.confirmation * 60000);
  }
  
  // Default case for pending orders
  return new Date(now.getTime() + settings.confirmation * 60000);
}

export function formatEstimatedTime(date: string): string {
  const estimatedDate = new Date(date);
  return estimatedDate.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  });
}