import type { ReactNode } from 'react';
import React from 'react';
import type { AppID } from '@/lib/apps';
import * as LucideIcons from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { useAppManager } from '@/hooks/useAppManager';

interface DockApp {
  id: AppID;
  title: string;
  icon: keyof typeof LucideIcons;
  iconColor?: string;
  externalUrl?: string;
}

interface DockProps {
  apps: DockApp[];
  showAppsButton: DockApp;
}

const Icon = ({ name, className }: { name: keyof typeof LucideIcons; className?: string }) => {
  const LucideIcon = LucideIcons[name];
  if (!LucideIcon) return null;
  return <LucideIcon className={cn('size-10', className)} />;
}

export default function Dock({ apps, showAppsButton }: DockProps) {
  const { openWindows, activeAppId, openApp, setDrawerOpen } = useAppManager();
  
  const isAppOpen = (appId: AppID) => openWindows.some(w => w.id === appId);
  const isAppActive = (appId: AppID) => activeAppId === appId;

  const handleAppClick = (app: DockApp) => {
    if (app.id === 'show-apps') {
      setDrawerOpen(true);
    } else {
      openApp(app.id);
    }
  };

  const AppButton = ({ app }: { app: DockApp }) => {
    const isSpecialButton = app.id === 'show-apps';

    const commonProps = {
      className: cn(
        'relative flex h-16 w-16 items-center justify-center rounded-xl border-2 border-transparent transition-all duration-200 ease-in-out hover:scale-110 focus:outline-none',
        'focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black/50',
        isAppActive(app.id) ? 'border-primary/80 bg-white/20' : 'hover:bg-white/10'
      ),
      'aria-label': `Open ${app.title}`,
      onClick: () => handleAppClick(app),
    };

    const buttonContent = (
      <>
        <Icon name={app.icon} className={cn(app.id === 'show-apps' ? 'size-9' : 'size-10', app.iconColor)} />
        {isAppOpen(app.id) && !isSpecialButton && (
          <span className={cn(
            "absolute bottom-0 h-1 w-4 rounded-full",
            isAppActive(app.id) ? "bg-primary" : "bg-gray-400"
          )}></span>
        )}
      </>
    );

    return (
      <button {...commonProps}>
        {buttonContent}
      </button>
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
                <AppButton app={showAppsButton} />
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
