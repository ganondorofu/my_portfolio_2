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
      <div className="relative flex items-center">
        {/* 左側のランニングインジケーター (Ubuntu Dock スタイル) */}
        {open && !isSpecialButton && (
          <span
            className={cn(
              'absolute -left-[7px] rounded-r-full transition-all duration-200',
              active
                ? 'h-5 w-[3px] bg-[#E95420]'
                : 'h-2 w-[3px] bg-white/50'
            )}
          />
        )}
        <button
          aria-label={`Open ${app.title}`}
          onClick={() => handleAppClick(app)}
          className={cn(
            'relative flex h-[58px] w-[58px] items-center justify-center rounded-xl',
            'transition-all duration-150 ease-out',
            'hover:scale-110 focus:outline-none',
            'focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black/50',
            active && 'brightness-110',
          )}
        >
          <UbuntuAppIcon
            icon={app.icon}
            iconBg={app.iconBg}
            size={48}
          />
        </button>
      </div>
    );
  };

  return (
    <TooltipProvider>
      {/* 幅の確保 (内側のフローティング Dock 用) */}
      <aside className="z-50 flex w-[72px] shrink-0 flex-col items-center py-2">
        {/* Ubuntu 22.04 フローティング Dock パネル */}
        <div
          className="flex flex-col items-center justify-between rounded-xl py-2"
          style={{
            background:
              'linear-gradient(180deg, rgba(30,10,24,0.82) 0%, rgba(44,0,30,0.86) 100%)',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
        >
          {/* アプリアイコン */}
          <div className="flex flex-col items-center gap-0.5 px-[10px]">
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
                  <Separator className="my-1 h-px w-9 bg-white/15" />
                )}
              </React.Fragment>
            ))}
          </div>

          <Separator className="my-1.5 h-px w-9 bg-white/15" />

          {/* Show Apps ボタン */}
          <div className="flex flex-col items-center px-[10px]">
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
