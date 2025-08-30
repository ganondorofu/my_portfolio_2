'use client';

import Header from '@/components/portfolio/Header';
import Dock from '@/components/portfolio/Dock';
import AppDrawer from '@/components/portfolio/AppDrawer';
import { useAppManager } from '@/hooks/useAppManager';
import { AppManagerProvider } from '@/providers/AppManagerProvider';

function DesktopLayoutContent({ children }: { children: React.ReactNode }) {
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
        <main className="relative flex-1">
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

export default function DesktopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppManagerProvider>
      <DesktopLayoutContent>{children}</DesktopLayoutContent>
    </AppManagerProvider>
  );
}
