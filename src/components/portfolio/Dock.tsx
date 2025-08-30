import type { ReactNode } from 'react';
import type { AppID } from '@/app/page';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface DockApp {
  id: AppID;
  title: string;
  icon: ReactNode;
}

interface DockProps {
  apps: DockApp[];
  onAppClick: (id: AppID) => void;
  activeApp: AppID | null;
}

export default function Dock({ apps, onAppClick, activeApp }: DockProps) {
  return (
    <TooltipProvider>
      <aside className="flex w-16 shrink-0 flex-col items-center gap-2 bg-black/30 p-2">
        {apps.map((app) => (
          <Tooltip key={app.id}>
            <TooltipTrigger asChild>
              <button
                onClick={() => onAppClick(app.id)}
                className={cn(
                  'relative flex h-12 w-12 items-center justify-center rounded-lg text-white transition-all duration-200 ease-in-out hover:scale-110 focus:outline-none',
                  'focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black/50',
                  app.id === activeApp ? 'bg-white/20' : 'bg-white/10'
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
      </aside>
    </TooltipProvider>
  );
}