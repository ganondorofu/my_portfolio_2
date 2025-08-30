'use client';

import { useEffect } from 'react';
import Header from '@/components/portfolio/Header';
import Dock from '@/components/portfolio/Dock';
import AppDrawer from '@/components/portfolio/AppDrawer';
import AppWindow from '@/components/portfolio/AppWindow';
import LoginScreen from '@/components/portfolio/LoginScreen';
import FishEasterEgg from '@/components/portfolio/FishEasterEgg';
import { useAppManager } from '@/hooks/useAppManager';

export default function Home() {
  const {
    activeApp,
    isDrawerOpen,
    isLoggedIn,
    apps,
    allApps,
    dockApps,
    minimizedApps,
    openApp,
    closeApp,
    minimizeApp,
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
      <div className="flex flex-1 overflow-hidden">
        <Dock
          apps={dockApps.map(id => apps[id])}
          showAppsButton={apps['show-apps']}
          onAppClick={openApp}
          activeApp={activeApp}
          minimizedApps={minimizedApps}
        />
        <main className="relative flex-1">
           <FishEasterEgg />
          {activeApp && apps[activeApp] && (
            <AppWindow 
              appId={activeApp}
              title={apps[activeApp].title} 
              onClose={closeApp}
              onMinimize={minimizeApp}
            >
              {apps[activeApp].content}
            </AppWindow>
          )}
        </main>
      </div>

      <AppDrawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        apps={allApps}
        onAppClick={openApp}
      />
    </div>
  );
}
