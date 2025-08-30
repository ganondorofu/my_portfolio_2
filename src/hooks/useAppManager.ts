'use client';

import { useState, useMemo, useEffect } from 'react';
import { apps as appConfig, type AppID } from '@/lib/apps.tsx';
import { useParams, useRouter } from 'next/navigation';

export function useAppManager() {
  const router = useRouter();
  const params = useParams();
  
  const activeApp = useMemo(() => {
    const appId = params.appId;
    return (appId && typeof appId === 'string' && appConfig[appId as AppID]) ? appId as AppID : null;
  }, [params.appId]);
  
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [minimizedApps, setMinimizedApps] = useState<Set<AppID>>(new Set());

  // This effect is now handled in the root page.tsx
  // useEffect(() => {
  //   if (isLoggedIn && !activeApp) {
  //     const timer = setTimeout(() => {
  //       router.push('/profile');
  //     }, 500); 
  //     return () => clearTimeout(timer);
  //   }
  // }, [isLoggedIn, activeApp, router]);

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
      router.push(`/${id}`);
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
      router.push('/'); // Navigate to a base/desktop page
    }
  };
  
  const minimizeApp = (id: AppID) => {
    if (activeApp === id) {
      router.push('/'); // Navigate away to "close" the window
    }
    setMinimizedApps(prev => new Set(prev).add(id));
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  
  // Prevent scrolling when drawers are open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isDrawerOpen]);

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
