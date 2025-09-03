
'use client';

import Header from '@/components/portfolio/Header';
import Dock from '@/components/portfolio/Dock';
import AppDrawer from '@/components/portfolio/AppDrawer';
import { useAppManager } from '@/hooks/useAppManager';
import { AppView } from '@/components/portfolio/AppView';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { type AppID } from '@/lib/apps';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const {
    isDrawerOpen,
    apps,
    allApps,
    dockApps,
    setDrawerOpen,
    handleLogin,
    isLoggedIn,
    openApp,
  } = useAppManager();
  const params = useParams();

  useEffect(() => {
    // If the user lands directly on an app page, we should consider them logged in.
    if (!isLoggedIn) {
      handleLogin();
      const appId = params.appId as AppID;
      if (appId && apps[appId] && appId !== 'profile') {
        openApp(appId);
      }
    }
  }, [handleLogin, isLoggedIn, params.appId, apps, openApp]);

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
