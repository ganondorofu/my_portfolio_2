'use client';

import { useState, useMemo, useEffect, createContext, ReactNode } from 'react';
import { apps as appConfig, type AppID } from '@/lib/apps';
import { useParams, useRouter } from 'next/navigation';
import type { App } from '@/lib/types';
import { appRegistry } from '@/lib/app-registry';

interface AppManagerContextType {
  activeApp: AppID | null;
  isDrawerOpen: boolean;
  isLoggedIn: boolean;
  apps: Record<AppID, App>;
  allApps: App[];
  dockApps: AppID[];
  minimizedApps: Set<AppID>;
  openApp: (id: AppID) => void;
  closeApp: () => void;
  minimizeApp: (id: AppID) => void;
  handleLogin: () => void;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppManagerContext = createContext<AppManagerContextType | null>(null);

export function AppManagerProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const params = useParams();

  const activeApp = useMemo(() => {
    const appId = params.appId;
    return (appId && typeof appId === 'string' && appConfig[appId as AppID]) ? appId as AppID : null;
  }, [params.appId]);

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [minimizedApps, setMinimizedApps] = useState<Set<AppID>>(new Set());

  const apps = useMemo(() => {
    const appsWithContent: Record<AppID, App> = { ...appConfig };
    for (const appId in appRegistry) {
        if(appsWithContent[appId as AppID]) {
            const AppContent = appRegistry[appId as AppID];
            appsWithContent[appId as AppID]!.content = <AppContent />;
        }
    }
    return appsWithContent;
  }, []);

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

  const contextValue = {
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

  return (
    <AppManagerContext.Provider value={contextValue}>
      {children}
    </AppManagerContext.Provider>
  );
}
