
'use client';

import { ReactNode, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Minus, Square } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { AppID } from '@/lib/apps';
import { useIsMobile } from '@/hooks/use-mobile';

interface AppWindowProps {
  appId: AppID | null;
  title: string;
  onClose: () => void;
  onMinimize: (id: AppID) => void;
  children: ReactNode;
}

type WindowState = 'default' | 'maximized';

export default function AppWindow({ appId, title, onClose, onMinimize, children }: AppWindowProps) {
  const isTerminal = appId === 'profile';
  const [windowState, setWindowState] = useState<WindowState>('default');
  const isMobile = useIsMobile();

  // Reset window state when app changes
  useEffect(() => {
    setWindowState('default');
  }, [appId]);

  const handleMaximize = () => {
    setWindowState(current => (current === 'maximized' ? 'default' : 'maximized'));
  };
  
  const handleMinimize = () => {
    if(appId) {
      onMinimize(appId);
    }
  };

  const windowSizeClasses = {
    default: 'h-[90vh] md:w-[90vw] w-screen max-w-4xl',
    maximized: 'h-full w-full',
  };
  
  const cardBgClass = isTerminal ? 'bg-[#300A24]/95 backdrop-blur-xl' : 'bg-card';
  const headerBgClass = isTerminal ? 'bg-black/50' : 'bg-muted/40';
  const textColorClass = isTerminal ? 'text-white/80' : 'text-card-foreground';
  const contentPadding = isTerminal ? 'p-0' : 'p-4 md:p-6';

  return (
    <div
      className={cn(
        "absolute inset-0 z-30 flex items-center justify-center transition-all ease-in-out",
        windowState === 'maximized' || isMobile ? 'p-0' : 'p-4 md:p-8',
        !isTerminal ? '' : 'bg-black/30 backdrop-blur-sm'
      )}
      onClick={onClose}
    >
      <Card
        className={cn(
          "flex flex-col overflow-hidden shadow-2xl transition-[width,height] ease-in-out",
          (isMobile || windowState === 'maximized') ? windowSizeClasses.maximized : windowSizeClasses.default,
          cardBgClass,
          (isMobile || windowState === 'maximized') ? 'rounded-none border-0' : 'rounded-lg',
          isTerminal ? 'border-2 border-primary/50' : 'border'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader className={cn(
          "flex flex-row items-center justify-between space-y-0 p-2 pl-4",
          headerBgClass
        )}>
          <h3 className={cn("font-bold text-sm", textColorClass)}>
            {title}
          </h3>
          <div className="flex items-center justify-end gap-2">
             <Button
              variant="ghost"
              size="icon"
              className="size-6 rounded-full bg-neutral-600 hover:bg-neutral-700"
              onClick={handleMinimize}
            >
               <Minus className="size-3 text-white" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-6 rounded-full bg-neutral-600 hover:bg-neutral-700"
              onClick={handleMaximize}
            >
               <Square className="size-3 text-white" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-6 rounded-full bg-red-500 hover:bg-red-600"
              onClick={onClose}
            >
              <X className="size-4 text-white" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-0">
          <ScrollArea className="h-full w-full window-content-scrollbar">
            <div className={cn(
              "h-full",
              isTerminal ? 'p-4' : contentPadding
            )}>
              {children}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
