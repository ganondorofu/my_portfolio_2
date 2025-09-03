
'use client';

import Header from '@/components/portfolio/Header';
import Dock from '@/components/portfolio/Dock';
import AppDrawer from '@/components/portfolio/AppDrawer';
import { useAppManager } from '@/hooks/useAppManager';
import { AppView } from '@/components/portfolio/AppView';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const {
    isDrawerOpen,
    apps,
    allApps,
    dockApps,
    setDrawerOpen,
  } = useAppManager();

  return (
    <div className="desktop-background flex h-screen w-screen flex-col overflow-hidden font-headline">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Dock
          apps={dockApps.map(id => apps[id])}
          showAppsButton={apps['show-apps']}
        />
        <main className="relative flex-1" style={{ height: 'calc(100vh - 2rem)' }}>
          <AppView />
          {children}
        </main>
      </div>

      <AppDrawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        apps={allApps}
      />
    </div>
  );
}
