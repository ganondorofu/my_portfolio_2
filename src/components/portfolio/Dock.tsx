import type { ReactNode } from 'react';
import React from 'react';
import type { AppID } from '@/lib/apps';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { useAppManager } from '@/hooks/useAppManager';

interface DockApp {
  id: AppID;
  title: string;
  icon: ReactNode;
  externalUrl?: string;
}

interface DockProps {
  apps: DockApp[];
  showAppsButton: DockApp;
}

export default function Dock({ apps, showAppsButton }: DockProps) {
  const { activeApp, minimizedApps, isDrawerOpen, setDrawerOpen } = useAppManager();
  const isAppOpen = (appId: AppID) => activeApp === appId || minimizedApps.has(appId);

  const handleAppClick = (app: DockApp) => {
    if (app.id === 'show-apps') {
      setDrawerOpen(true);
    } else if (app.externalUrl) {
      window.open(app.externalUrl, '_blank');
    }
  };

  const AppButton = ({ app }: { app: DockApp }) => {
    const commonProps = {
      className: cn(
        'relative flex h-16 w-16 items-center justify-center rounded-xl border-2 border-transparent transition-all duration-200 ease-in-out hover:scale-110 focus:outline-none',
        'focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black/50',
        activeApp === app.id ? 'border-primary/80 bg-white/20' : 'hover:bg-white/10'
      ),
      'aria-label': `Open ${app.title}`,
    };

    const buttonContent = (
      <>
        {app.icon}
        {isAppOpen(app.id) && (
          <span className={cn(
            "absolute bottom-0 h-1 w-4 rounded-full",
            activeApp === app.id ? "bg-primary" : "bg-gray-400"
          )}></span>
        )}
      </>
    );

    if (app.externalUrl || app.id === 'show-apps') {
      return (
        <button {...commonProps} onClick={() => handleAppClick(app)}>
          {buttonContent}
        </button>
      );
    }

    return (
      <Link href={`/${app.id}`} {...commonProps}>
        {buttonContent}
      </Link>
    );
  };

  return (
    <TooltipProvider>
      <aside className="z-50 flex shrink-0 flex-col items-center">
        <div className="flex h-full w-24 flex-col items-center justify-between bg-black/50 py-2">
          <div className="flex flex-col items-center gap-2">
            {apps.map((app) => (
              <React.Fragment key={app.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <AppButton app={app} />
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{app.title}</p>
                  </TooltipContent>
                </Tooltip>
                {app.id === 'contact' && <Separator className="my-1 h-px w-12 bg-white/20" />}
              </React.Fragment>
            ))}
          </div>

          <div className="flex flex-col items-center gap-2">
            <Separator className="my-1 h-px w-12 bg-white/20" />
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setDrawerOpen(true)}
                  className="flex h-16 w-16 items-center justify-center rounded-xl transition-all duration-200 ease-in-out hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black/50"
                  aria-label={showAppsButton.title}
                >
                  {showAppsButton.icon}
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{showAppsButton.title}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </aside>
    </TooltipProvider>
  );
}
