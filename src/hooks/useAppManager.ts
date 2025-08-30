'use client';

import { useContext } from 'react';
import { AppManagerContext } from '@/providers/AppManagerProvider';

export function useAppManager() {
  const context = useContext(AppManagerContext);
  if (!context) {
    throw new Error('useAppManager must be used within an AppManagerProvider');
  }
  return context;
}
