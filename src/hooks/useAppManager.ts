'use client';

import { useState, useMemo, useEffect } from 'react';
import { apps as appConfig, type AppID } from '@/lib/apps.tsx';

export function useAppManager() {
  const [activeApp, setActiveApp] = useState<AppID | null>(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Open the profile app by default once logged in, with a delay
    if (isLoggedIn) {
      const timer = setTimeout(() => {
        setActiveApp('profile');
      }, 500); // 500ms delay
      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [isLoggedIn]);

  const apps = useMemo(() => appConfig, []);
  
  const allApps = useMemo(
    () => Object.values(apps).filter(app => app.id !== 'show-apps'),
    [apps]
  );
  
  const dockApps = useMemo(() => allApps.map(app => app.id), [allApps]);

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
  
  // Prevent scrolling when app windows or drawers are open
  useEffect(() => {
    if (activeApp || isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [activeApp, isDrawerOpen]);

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
