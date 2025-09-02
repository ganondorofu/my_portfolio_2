'use client';

import { useState, useMemo, useEffect, createContext, ReactNode, useCallback } from 'react';
import { apps as appConfig, type AppID } from '@/lib/apps';
import { useParams, useRouter } from 'next/navigation';
import type { App, WindowState } from '@/lib/types';
import { appRegistry } from '@/lib/app-registry';

interface AppManagerContextType {
  openWindows: WindowState[];
  activeAppId: AppID | null;
  isDrawerOpen: boolean;
  isLoggedIn: boolean;
  apps: Record<AppID, App>;
  allApps: App[];
  dockApps: AppID[];
  openApp: (id: AppID) => void;
  closeApp: (id: AppID) => void;
  minimizeApp: (id: AppID) => void;
  toggleMaximize: (id: AppID) => void;
  focusApp: (id: AppID) => void;
  handleLogin: () => void;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppManagerContext = createContext<AppManagerContextType | null>(null);

export function AppManagerProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const params = useParams();
  const currentAppId = params.appId as AppID | undefined;

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openWindows, setOpenWindows] = useState<WindowState[]>([]);
  const [zCounter, setZCounter] = useState(1);

  const apps = useMemo(() => {
    const appsWithContent: Record<AppID, App> = { ...appConfig };
    for (const appId in appRegistry) {
      if (appsWithContent[appId as AppID]) {
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

  const activeAppId = useMemo(() => {
    const highestZIndex = Math.max(0, ...openWindows.map(w => w.zIndex));
    return openWindows.find(w => w.zIndex === highestZIndex && !w.isMinimized)?.id || null;
  }, [openWindows]);

  const focusApp = useCallback((id: AppID) => {
    if (activeAppId === id) return;
    
    setOpenWindows(currentWindows => {
      const newZ = zCounter + 1;
      setZCounter(newZ);
      return currentWindows.map(w => 
        w.id === id ? { ...w, zIndex: newZ, isMinimized: false } : w
      );
    });

    const app = appConfig[id];
    if (app && !app.externalUrl) {
      router.push(`/${id}`, { scroll: false });
    }
  }, [activeAppId, zCounter, router]);

  const openApp = useCallback((id: AppID) => {
    if (id === 'show-apps') {
      setDrawerOpen(true);
      return;
    }
    const app = apps[id];
    if (app.externalUrl) {
      window.open(app.externalUrl, '_blank');
      return;
    }
    
    setDrawerOpen(false);

    const isAlreadyOpen = openWindows.some(w => w.id === id);
    if (isAlreadyOpen) {
      focusApp(id);
    } else {
      const newZ = zCounter + 1;
      setZCounter(newZ);
      const newWindow: WindowState = {
        id,
        isMinimized: false,
        isMaximized: false,
        zIndex: newZ,
      };
      setOpenWindows(current => [...current, newWindow]);
      router.push(`/${id}`, { scroll: false });
    }
  }, [apps, openWindows, zCounter, focusApp, router]);

  const closeApp = useCallback((id: AppID) => {
    setOpenWindows(current => current.filter(w => w.id !== id));
    if (activeAppId === id) {
       router.push('/', { scroll: false });
    }
  }, [activeAppId, router]);

  const minimizeApp = useCallback((id: AppID) => {
    setOpenWindows(current =>
      current.map(w => (w.id === id ? { ...w, isMinimized: true } : w))
    );
     if (activeAppId === id) {
       router.push('/', { scroll: false });
    }
  }, [activeAppId, router]);

  const toggleMaximize = useCallback((id: AppID) => {
    setOpenWindows(current =>
      current.map(w => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))
    );
    focusApp(id);
  }, [focusApp]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  
  const contextValue: AppManagerContextType = {
    openWindows,
    activeAppId,
    isDrawerOpen,
    isLoggedIn,
    apps,
    allApps,
    dockApps,
    openApp,
    closeApp,
    minimizeApp,
    toggleMaximize,
    focusApp,
    handleLogin,
    setDrawerOpen,
  };

  return (
    <AppManagerContext.Provider value={contextValue}>
      {children}
    </AppManagerContext.Provider>
  );
}
