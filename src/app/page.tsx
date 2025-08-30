'use client';

import { useEffect } from 'react';
import Header from '@/components/portfolio/Header';
import Dock from '@/components/portfolio/Dock';
import AppDrawer from '@/components/portfolio/AppDrawer';
import AppWindow from '@/components/portfolio/AppWindow';
import LoginScreen from '@/components/portfolio/LoginScreen';
import { useAppManager } from '@/hooks/useAppManager';

export default function Home() {
  const {
    activeApp,
    isDrawerOpen,
    isLoggedIn,
    apps,
    allApps,
    dockApps,
    openApp,
    closeApp,
    handleLogin,
    setDrawerOpen,
  } = useAppManager();

  // Prevent scrolling when app windows or drawers are open
  useEffect(() => {
    if (activeApp || isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [activeApp, isDrawerOpen]);

  if (!isLoggedIn) {
    return <LoginScreen onLoginComplete={handleLogin} />;
  }

  return (
    <div className="desktop-background flex h-screen w-screen flex-col overflow-hidden font-headline">
      <Header />
      <div className="flex flex-1">
        <Dock
          apps={dockApps.map(id => apps[id])}
          showAppsButton={apps['show-apps']}
          onAppClick={openApp}
          activeApp={activeApp}
        />
        <main className="flex-1">
          {/* Desktop icons are managed by the OS-like UI */}
        </main>
      </div>

      {activeApp && apps[activeApp] && (
        <AppWindow title={apps[activeApp].title} onClose={closeApp}>
          {apps[activeApp].content}
        </AppWindow>
      )}

      <AppDrawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        apps={allApps}
        onAppClick={openApp}
      />
    </div>
  );
}
