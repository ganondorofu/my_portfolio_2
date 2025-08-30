'use client';
import { useAppManager } from '@/hooks/useAppManager';
import AppWindow from '@/components/portfolio/AppWindow';
import FishEasterEgg from '@/components/portfolio/FishEasterEgg';
import { appRegistry } from '@/lib/app-registry';

export function AppView() {
  const { activeApp, apps } = useAppManager();
  
  const AppContent = activeApp ? appRegistry[activeApp] : null;

  return (
    <>
      <FishEasterEgg />
      {activeApp && apps[activeApp] && AppContent && (
        <AppWindow
          appId={activeApp}
          title={apps[activeApp].title}
        >
          <AppContent />
        </AppWindow>
      )}
    </>
  );
}
