'use client';

import { useAppManager } from '@/hooks/useAppManager';
import AppWindow from '@/components/portfolio/AppWindow';
import FishEasterEgg from '@/components/portfolio/FishEasterEgg';

export default function AppView() {
  const { activeApp, apps } = useAppManager();

  return (
    <>
      <FishEasterEgg />
      {activeApp && apps[activeApp] && (
        <AppWindow
          appId={activeApp}
          title={apps[activeApp].title}
        >
          {apps[activeApp].content}
        </AppWindow>
      )}
    </>
  );
}
