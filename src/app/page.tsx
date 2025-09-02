'use client';

import { useAppManager } from '@/hooks/useAppManager';
import LoginScreen from '@/components/portfolio/LoginScreen';
import { AppManagerProvider } from '@/providers/AppManagerProvider';
import Header from '@/components/portfolio/Header';
import Dock from '@/components/portfolio/Dock';
import AppDrawer from '@/components/portfolio/AppDrawer';
import { AppView } from '@/components/portfolio/AppView';

function Desktop() {
  const { 
    isLoggedIn, 
    handleLogin,
    isDrawerOpen,
    apps,
    allApps,
    dockApps,
    setDrawerOpen,
  } = useAppManager();

  if (!isLoggedIn) {
    return <LoginScreen onLoginComplete={handleLogin} />;
  }

  return (
    <div className="desktop-background flex h-screen w-screen flex-col overflow-hidden font-headline">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Dock
          apps={dockApps.map(id => apps[id])}
          showAppsButton={apps['show-apps']}
        />
        <main className="relative flex-1">
          <AppView />
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

export default function HomePageWrapper() {
  return (
    <AppManagerProvider>
      <Desktop />
    </AppManagerProvider>
  );
}
