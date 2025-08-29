import type { ReactNode } from 'react';
import type { AppID } from '@/app/page';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface DockApp {
  id: AppID;
  title: string;
  icon: ReactNode;
}

interface DockProps {
  apps: DockApp[];
  onAppClick: (id: AppID) => void;
}

export default function Dock({ apps, onAppClick }: DockProps) {
  return (
    <TooltipProvider>
      <aside className="flex w-16 shrink-0 flex-col items-center gap-4 bg-black/50 p-2">
        {apps.map((app) => (
          <Tooltip key={app.id}>
            <TooltipTrigger asChild>
              <button
                onClick={() => onAppClick(app.id)}
                className="rounded-lg p-2 text-white transition-colors hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black/50"
                aria-label={`Open ${app.title}`}
              >
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
