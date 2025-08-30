'use client';

import { useState, useMemo } from 'react';
import { apps as appConfig, type AppID } from '@/lib/apps';

export function useAppManager() {
  const [activeApp, setActiveApp] = useState<AppID | null>(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const apps = useMemo(() => appConfig, []);
  
  const allApps = useMemo(
    () => Object.values(apps).filter(app => app.id !== 'show-apps'),
    [apps]
  );
  
  const dockApps: AppID[] = useMemo(() => allApps.map(app => app.id), [allApps]);

  const openApp = (id: AppID) => {
    if (id === 'show-apps') {
      setDrawerOpen(true);
      return;
    }
    const app = apps[id];
    if (app.externalUrl) {
      window.open(app.externalUrl, '_blank');
    } else {
      setActiveApp(id);
      setDrawerOpen(false);
    }
  };

  const closeApp = () => {
    setActiveApp(null);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return {
    activeApp,
    isDrawerOpen,
    isLoggedIn,
    apps,
    allApps,
    dockApps,
    openApp,
    closeApp,
    handleLogin,
    setDrawerOpen,
    setIsLoggedIn,
  };
}
