
'use client';

import { useState, useMemo, useEffect, createContext, ReactNode, useCallback } from 'react';
import { apps as appConfig, type AppID } from '@/lib/apps';
import { useRouter } from 'next/navigation';
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
  updateWindowPosition: (id: AppID, position: { x: number; y: number }) => void;
  updateWindowSize: (id: AppID, size: { width: number; height: number }) => void;
}

export const AppManagerContext = createContext<AppManagerContextType | null>(null);

export function AppManagerProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

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
    const nonMinimized = openWindows.filter(w => !w.isMinimized);
    if (nonMinimized.length === 0) return null;
    const highestZIndex = Math.max(0, ...nonMinimized.map(w => w.zIndex));
    return nonMinimized.find(w => w.zIndex === highestZIndex)?.id || null;
  }, [openWindows]);

  useEffect(() => {
    const windowsToClose = openWindows.filter(w => w.isClosing);
    if (windowsToClose.length > 0) {
      const timer = setTimeout(() => {
        setOpenWindows(current => current.filter(w => !w.isClosing));
      }, 200); // Corresponds to animation duration
      return () => clearTimeout(timer);
    }
  }, [openWindows]);


  const focusApp = useCallback((id: AppID) => {
    setZCounter(prev => {
        const newZ = prev + 1;
        setOpenWindows(currentWindows => {
          return currentWindows.map(w => 
            w.id === id ? { ...w, zIndex: newZ, isMinimized: false } : w
          );
        });
        return newZ;
    });
  }, []);

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
        setZCounter(prevZ => {
            const newZ = prevZ + 1;

            let position;
            if(typeof window !== 'undefined') {
                const vw = window.innerWidth;
                const vh = window.innerHeight;
                const headerHeight = 32;
                const dockWidth = 96;
    
                const initialWidth = Math.min(800, vw - dockWidth - 20);
                const initialHeight = Math.min(600, vh - headerHeight - 20);
                
                const windowIndex = openWindows.length;
                const xOffset = (windowIndex % 5) * 30;
                const yOffset = (windowIndex % 5) * 30;
    
                position = {
                  x: Math.max(0, (vw - dockWidth - initialWidth) / 2 + xOffset),
                  y: Math.max(0, (vh - headerHeight - initialHeight) / 2 + yOffset),
                };
            }
           
            const newWindow: WindowState = {
                id,
                isMinimized: false,
                isMaximized: false,
                zIndex: newZ,
                position: position,
                size: { 
                  width: 800, 
                  height: 600,
                },
            };
            
            setOpenWindows(current => {
              if (current.some(w => w.id === id)) {
                 focusApp(id);
                 return current;
              }
              return [...current, newWindow];
            });

            return newZ;
        });
    }
  }, [apps, openWindows, focusApp]);

  const closeApp = useCallback((id: AppID) => {
    setOpenWindows(current => current.map(w => w.id === id ? { ...w, isClosing: true } : w));
  }, []);

  const minimizeApp = useCallback((id: AppID) => {
    setOpenWindows(current =>
      current.map(w => (w.id === id ? { ...w, isMinimized: true } : w))
    );
  }, []);

  const toggleMaximize = useCallback((id: AppID) => {
    setOpenWindows(current =>
      current.map(w => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))
    );
    focusApp(id);
  }, [focusApp]);

  const updateWindowPosition = useCallback((id: AppID, position: { x: number, y: number }) => {
    setOpenWindows(current => 
      current.map(w => w.id === id ? { ...w, position } : w)
    );
  }, []);

  const updateWindowSize = useCallback((id: AppID, size: { width: number, height: number }) => {
    setOpenWindows(current =>
      current.map(w => w.id === id ? { ...w, size } : w)
    );
  }, []);

  const handleLogin = useCallback(() => {
    if (isLoggedIn) return;
    setIsLoggedIn(true);
  }, [isLoggedIn]);

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
    updateWindowPosition,
    updateWindowSize,
  };

  return (
    <AppManagerContext.Provider value={contextValue}>
      {children}
    </AppManagerContext.Provider>
  );
}
