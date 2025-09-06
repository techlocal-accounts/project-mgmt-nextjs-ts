'use client';

import { useState, useEffect } from 'react';
import { WifiIcon } from '@heroicons/react/24/outline';
import { useOffline } from '@/hooks/useOffline';
import { cn } from '@/lib/utils';

export function OfflineIndicator() {
  const { isOnline, hasUnsyncedActions } = useOffline();
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setShowIndicator(true);
    } else if (hasUnsyncedActions) {
      setShowIndicator(true);
      // Hide after 3 seconds if online and synced
      const timer = setTimeout(() => {
        setShowIndicator(false);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setShowIndicator(false);
    }
  }, [isOnline, hasUnsyncedActions]);

  if (!showIndicator) return null;

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 z-50 flex items-center space-x-2 rounded-lg px-4 py-2 text-sm font-medium shadow-lg transition-all duration-300',
        !isOnline
          ? 'bg-red-500 text-white'
          : hasUnsyncedActions
          ? 'bg-yellow-500 text-white'
          : 'bg-green-500 text-white'
      )}
    >
      <WifiIcon className="h-4 w-4" />
      <span>
        {!isOnline
          ? 'You are offline'
          : hasUnsyncedActions
          ? 'Syncing changes...'
          : 'Back online'}
      </span>
    </div>
  );
}