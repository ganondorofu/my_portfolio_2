'use client';

import { useState, useMemo, useEffect } from 'react';
import { apps as appConfig, type AppID } from '@/lib/apps.tsx';

export function useAppManager() {
  const [activeApp, setActiveApp] = useState<AppID | null>(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [minimizedApps, setMinimizedApps] = useState<Set<AppID>>(new Set());

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
      setMinimizedApps(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
      setDrawerOpen(false);
    }
  };

  const closeApp = () => {
    if (activeApp) {
      setMinimizedApps(prev => {
        const newSet = new Set(prev);
        newSet.delete(activeApp);
        return newSet;
      });
      setActiveApp(null);
    }
  };
  
  const minimizeApp = (id: AppID) => {
    setActiveApp(null);
    setMinimizedApps(prev => new Set(prev).add(id));
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
    minimizedApps,
    openApp,
    closeApp,
    minimizeApp,
    handleLogin,
    setDrawerOpen,
    setIsLoggedIn,
  };
}
