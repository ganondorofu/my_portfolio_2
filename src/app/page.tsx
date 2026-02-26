
'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAppManager } from '@/hooks/useAppManager';
import LoginScreen from '@/components/portfolio/LoginScreen';
import Header from '@/components/portfolio/Header';
import Dock from '@/components/portfolio/Dock';
import AppDrawer from '@/components/portfolio/AppDrawer';
import { AppView } from '@/components/portfolio/AppView';
import DesktopContextMenu from '@/components/portfolio/DesktopContextMenu';

function Desktop() {
  const {
    isLoggedIn,
    handleLogin,
    isDrawerOpen,
    apps,
    allApps,
    dockApps,
    setDrawerOpen,
    openApp,
  } = useAppManager();

  const [ctxMenu, setCtxMenu] = useState<{ x: number; y: number } | null>(null);

  // ─── キーボードショートカット ────────────────────────────────────
  useEffect(() => {
    if (!isLoggedIn) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Super (Meta) キー → アプリドロワー切替
      if (e.key === 'Meta' || e.key === 'Super') {
        e.preventDefault();
        setDrawerOpen((prev: boolean) => !prev);
        return;
      }
      // Ctrl+Alt+T → ターミナル (Profile) を開く
      if (e.ctrlKey && e.altKey && e.key === 't') {
        e.preventDefault();
        openApp('profile');
        return;
      }
      // ESC → ドロワーを閉じる
      if (e.key === 'Escape') {
        setDrawerOpen(false);
        setCtxMenu(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLoggedIn, openApp, setDrawerOpen]);

  // ─── デスクトップ右クリックメニュー ─────────────────────────────
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    // ウィンドウ要素の上では発火させない
    if ((e.target as HTMLElement).closest('[data-window-id]')) return;
    e.preventDefault();
    setCtxMenu({ x: e.clientX, y: e.clientY });
  }, []);

  if (!isLoggedIn) {
    return <LoginScreen onLoginComplete={handleLogin} />;
  }

  return (
    <div
      className="desktop-background flex h-screen w-screen flex-col overflow-hidden font-headline"
      onContextMenu={handleContextMenu}
    >
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Dock
          apps={dockApps.map((id: string) => apps[id as keyof typeof apps])}
          showAppsButton={apps['show-apps']}
        />
        <main className="relative flex-1" style={{ height: 'calc(100vh - 1.75rem)' }}>
          <AppView />
        </main>
      </div>

      <AppDrawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        apps={allApps}
      />

      {ctxMenu && (
        <DesktopContextMenu
          x={ctxMenu.x}
          y={ctxMenu.y}
          onClose={() => setCtxMenu(null)}
          onOpenSettings={() => openApp('skills')}
          onOpenAbout={() => openApp('profile')}
        />
      )}
    </div>
  );
}

export default function HomePageWrapper() {
  return <Desktop />;
}
