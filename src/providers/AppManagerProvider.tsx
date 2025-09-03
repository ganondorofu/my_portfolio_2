
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
  updateWindowPosition: (id: AppID, position: { x: number; y: number }) => void;
  updateWindowSize: (id: AppID, size: { width: number; height: number }) => void;
}

export const AppManagerContext = createContext<AppManagerContextType | null>(null);

export function AppManagerProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const params = useParams();

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openWindows, setOpenWindows] = useState<WindowState[]>([]);
  const [zCounter, setZCounter] = useState(1);
  const [lastInteractedAppId, setLastInteractedAppId] = useState<AppID | null>(null);

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
    // This effect synchronizes the URL with the active window state.
    const nonMinimizedWindows = openWindows.filter(w => !w.isMinimized);
    if (nonMinimizedWindows.length === 0) {
      // If no windows are open (or all are minimized), go to the home/desktop view.
      if (params.appId) {
          router.push('/', { scroll: false });
      }
    } else {
      // If there are open windows, ensure the URL matches the active (top-most) one.
      const topWindow = nonMinimizedWindows.reduce((prev, curr) => (prev.zIndex > curr.zIndex ? prev : curr));
      if (topWindow && params.appId !== topWindow.id) {
        router.push(`/${topWindow.id}`, { scroll: false });
      }
    }
  // This hook should run when the openWindows array changes, or when the appId param changes.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openWindows, params.appId]);


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
    if (activeAppId === id) {
       // If it's already active but minimized, un-minimize it.
       const window = openWindows.find(w => w.id === id);
       if(window?.isMinimized) {
         setOpenWindows(currentWindows =>
           currentWindows.map(w => (w.id === id ? { ...w, isMinimized: false } : w))
         );
       }
       return;
    }
    
    setZCounter(prev => {
        const newZ = prev + 1;
        setOpenWindows(currentWindows => {
          return currentWindows.map(w => 
            w.id === id ? { ...w, zIndex: newZ, isMinimized: false } : w
          );
        });
        return newZ;
    });

    const app = appConfig[id];
    if (app && !app.externalUrl && params.appId !== id) {
      router.push(`/${id}`, { scroll: false });
    }
  }, [activeAppId, router, openWindows, params.appId]);

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
    
            // On the server, we don't know the window size.
            // These will be defined on the client in AppWindow.
            const vw = typeof window !== 'undefined' ? window.innerWidth : 0;
            const vh = typeof window !== 'undefined' ? window.innerHeight : 0;
            const headerHeight = 32;
            const dockWidth = 96;

            const initialWidth = Math.min(800, vw - dockWidth - 20);
            const initialHeight = Math.min(600, vh - headerHeight - 20);
           
            const newWindow: WindowState = {
                id,
                isMinimized: false,
                isMaximized: false,
                zIndex: newZ,
                // Position is now set in the AppWindow component to avoid SSR issues
                position: undefined, 
                size: { width: initialWidth, height: initialHeight },
            };
            
            setOpenWindows(current => {
              // Final check to prevent race conditions from adding duplicates
              if (current.some(w => w.id === id)) {
                return current;
              }
              return [...current, newWindow];
            });

            if (params.appId !== id) {
              router.push(`/${id}`, { scroll: false });
            }
            return newZ;
        });
    }
  }, [apps, openWindows, focusApp, router, params.appId]);

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
