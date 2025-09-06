'use client';

import { useState, useEffect, useCallback } from 'react';
import { OfflineAction } from '@/types';
import { STORAGE_KEYS } from '@/lib/constants';
import { getFromStorage, setToStorage } from '@/lib/utils';

export function useOffline() {
  const [isOnline, setIsOnline] = useState(true);
  const [offlineActions, setOfflineActions] = useState<OfflineAction[]>([]);

  useEffect(() => {
    // Check initial online status
    setIsOnline(navigator.onLine);

    // Load offline actions from storage
    const storedActions = getFromStorage<OfflineAction[]>(STORAGE_KEYS.offlineActions, []);
    setOfflineActions(storedActions);

    // Listen for online/offline events
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const addOfflineAction = useCallback((action: Omit<OfflineAction, 'id' | 'timestamp' | 'synced'>) => {
    const newAction: OfflineAction = {
      ...action,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      synced: false,
    };

    const updatedActions = [...offlineActions, newAction];
    setOfflineActions(updatedActions);
    setToStorage(STORAGE_KEYS.offlineActions, updatedActions);
  }, [offlineActions]);

  const syncOfflineActions = useCallback(async () => {
    if (!isOnline || offlineActions.length === 0) return;

    const unsyncedActions = offlineActions.filter(action => !action.synced);
    
    for (const action of unsyncedActions) {
      try {
        // Simulate API call - replace with actual API calls
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Mark as synced
        const updatedActions = offlineActions.map(a => 
          a.id === action.id ? { ...a, synced: true } : a
        );
        setOfflineActions(updatedActions);
        setToStorage(STORAGE_KEYS.offlineActions, updatedActions);
      } catch (error) {
        console.error('Failed to sync offline action:', error);
      }
    }
  }, [isOnline, offlineActions]);

  const clearSyncedActions = useCallback(() => {
    const unsyncedActions = offlineActions.filter(action => !action.synced);
    setOfflineActions(unsyncedActions);
    setToStorage(STORAGE_KEYS.offlineActions, unsyncedActions);
  }, [offlineActions]);

  // Auto-sync when coming back online
  useEffect(() => {
    if (isOnline && offlineActions.some(action => !action.synced)) {
      syncOfflineActions();
    }
  }, [isOnline, syncOfflineActions]);

  return {
    isOnline,
    offlineActions,
    addOfflineAction,
    syncOfflineActions,
    clearSyncedActions,
    hasUnsyncedActions: offlineActions.some(action => !action.synced),
  };
}