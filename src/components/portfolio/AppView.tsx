'use client';
import { useAppManager } from '@/hooks/useAppManager';
import AppWindow from '@/components/portfolio/AppWindow';
import FishEasterEgg from '@/components/portfolio/FishEasterEgg';
import { appRegistry } from '@/lib/app-registry';

export function AppView() {
  const { openWindows, apps } = useAppManager();
  
  return (
    <>
      <FishEasterEgg />
      {openWindows
        .filter(window => !window.isMinimized)
        .map((window) => {
          const app = apps[window.id];
          const AppContent = app ? appRegistry[app.id] : null;

          if (!app || !AppContent) return null;

          return (
            <AppWindow
              key={app.id}
              appId={app.id}
              title={app.title}
              windowState={window}
            >
              <AppContent />
            </AppWindow>
          );
      })}
    </>
  );
}
