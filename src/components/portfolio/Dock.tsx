import type { ReactNode } from 'react';
import type { AppID } from '@/lib/apps';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

interface DockApp {
  id: AppID;
  title: string;
  icon: ReactNode;
}

interface DockProps {
  apps: DockApp[];
  showAppsButton: DockApp;
  onAppClick: (id: AppID) => void;
  activeApp: AppID | null;
}

export default function Dock({ apps, showAppsButton, onAppClick, activeApp }: DockProps) {
  return (
    <TooltipProvider>
      <aside className="z-50 flex shrink-0 flex-col items-center">
        <div className="flex h-full w-16 flex-col items-center justify-between bg-black/30 py-2">
          <div className="flex flex-col items-center gap-2">
            {apps.map((app) => (
              <Tooltip key={app.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onAppClick(app.id)}
                    className={cn(
                      'relative flex h-12 w-12 items-center justify-center rounded-lg transition-all duration-200 ease-in-out hover:scale-110 focus:outline-none',
                      'focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black/50',
                      app.id === activeApp ? 'ring-2 ring-primary' : ''
                    )}
                    aria-label={`Open ${app.title}`}
                  >
                    {app.id === activeApp && (
                      <span className="absolute left-0 top-1/2 h-4 w-1 -translate-y-1/2 rounded-r-full bg-primary"></span>
                    )}
                    {app.icon}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{app.title}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          <div className="flex flex-col items-center gap-2">
            <Separator className="my-1 h-px w-8 bg-white/20" />
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onAppClick(showAppsButton.id)}
                  className="flex h-12 w-12 items-center justify-center rounded-lg transition-all duration-200 ease-in-out hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black/50"
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
