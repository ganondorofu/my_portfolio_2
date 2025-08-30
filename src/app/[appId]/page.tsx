'use client';

import { useAppManager } from '@/hooks/useAppManager';
import AppWindow from '@/components/portfolio/AppWindow';
import FishEasterEgg from '@/components/portfolio/FishEasterEgg';
import { apps } from '@/lib/apps';

export async function generateStaticParams() {
  return Object.values(apps)
    .filter(app => !app.externalUrl && app.content)
    .map(app => ({
      appId: app.id,
    }));
}

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
