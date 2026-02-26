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
import { useAppManager } from '@/hooks/useAppManager';
import * as LucideIcons from 'lucide-react';
import { UbuntuAppIcon } from './UbuntuAppIcon';

interface DockApp {
  id: AppID;
  title: string;
  icon: keyof typeof LucideIcons;
  iconBg?: [string, string];
  externalUrl?: string;
}

interface DockProps {
  apps: DockApp[];
  showAppsButton: DockApp;
}

export default function Dock({ apps, showAppsButton }: DockProps) {
  const { openWindows, activeAppId, openApp, setDrawerOpen } = useAppManager();

  const isAppOpen = (appId: AppID) => openWindows.some((w) => w.id === appId);
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
    const active = isAppActive(app.id);
    const open = isAppOpen(app.id);

    return (
      <button
        aria-label={`Open ${app.title}`}
        onClick={() => handleAppClick(app)}
        className={cn(
          'relative flex h-16 w-16 items-center justify-center rounded-xl',
          'transition-all duration-150 ease-out',
          'hover:scale-110 focus:outline-none',
          'focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black/50',
          active
            ? 'scale-[1.08] drop-shadow-[0_0_8px_rgba(233,84,32,0.7)]'
            : ''
        )}
      >
        {/* Ubuntu Yaru スタイルのアイコン */}
        <UbuntuAppIcon
          icon={app.icon}
          iconBg={app.iconBg}
          size={52}
        />

        {/* 開いているアプリのドット (Ubuntu Dock スタイル) */}
        {open && !isSpecialButton && (
          <span
            className={cn(
              'absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full',
              active
                ? 'h-1.5 w-1.5 bg-[#E95420]'
                : 'h-1 w-1 bg-white/60'
            )}
          />
        )}
      </button>
    );
  };

  return (
    <TooltipProvider>
      <aside className="z-50 flex shrink-0 flex-col items-center">
        {/* Ubuntu Dock : 半透明ダークパネル + 細いハイライトボーダー */}
        <div
          className="flex h-full w-[72px] flex-col items-center justify-between py-3"
          style={{
            background:
              'linear-gradient(180deg, rgba(30,10,24,0.85) 0%, rgba(44,0,30,0.88) 100%)',
            borderRight: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <div className="flex flex-col items-center gap-1">
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
                {app.id === 'contact' && (
                  <Separator className="my-1.5 h-px w-10 bg-white/15" />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="flex flex-col items-center gap-1">
            <Separator className="my-1.5 h-px w-10 bg-white/15" />
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
