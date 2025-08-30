
'use client';

import { ReactNode, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Minus, Square } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { AppID } from '@/lib/apps';

interface AppWindowProps {
  appId: AppID | null;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

type WindowState = 'default' | 'maximized' | 'minimized';

export default function AppWindow({ appId, title, onClose, children }: AppWindowProps) {
  const isTerminal = appId === 'profile';
  const [windowState, setWindowState] = useState<WindowState>('default');

  // Reset window state when app changes
  useEffect(() => {
    setWindowState('default');
  }, [appId]);

  if (windowState === 'minimized') {
    // In a real OS, this would render something in the dock/taskbar
    // For now, it just hides the window. We'd need a way to restore it.
    // This part of the logic is stubbed out.
    return null;
  }

  const handleMaximize = () => {
    setWindowState(current => (current === 'maximized' ? 'default' : 'maximized'));
  };

  const handleMinimize = () => {
    // Minimizing logic would go here. For now, we'll just log it.
    console.log('Minimize clicked');
    // setWindowState('minimized');
  };

  const windowSizeClasses = {
    default: 'h-[90vh] w-[90vw] max-w-4xl',
    maximized: 'h-full w-full max-w-full',
  };
  
  const cardBgClass = isTerminal ? 'bg-[#300A24]/95' : 'bg-card/80';
  const headerBgClass = isTerminal ? 'bg-black/50' : 'bg-card/90';
  const textColorClass = isTerminal ? 'text-white/80' : 'text-card-foreground';
  const contentPadding = isTerminal ? 'p-0' : 'p-6';

  return (
    <div
      className={cn(
        "fixed inset-0 z-40 flex items-center justify-center transition-all duration-300 ease-in-out",
        !isTerminal && "bg-black/30 backdrop-blur-sm",
        windowState === 'maximized' ? 'p-0' : 'p-0'
      )}
      onClick={onClose}
    >
      <Card
        className={cn(
          "flex flex-col overflow-hidden shadow-2xl transition-all duration-300 ease-in-out",
          windowSizeClasses[windowState],
          cardBgClass,
          windowState === 'maximized' ? 'rounded-none border-0' : 'rounded-lg border-2 border-primary/50 backdrop-blur-xl'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader className={cn(
          "flex flex-row items-center justify-between space-y-0 p-2 pl-4",
          headerBgClass
        )}>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="size-3 rounded-full bg-red-500 hover:bg-red-600"
              onClick={onClose}
            >
              <X className="size-2 opacity-0 transition-opacity group-hover:opacity-100" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-3 rounded-full bg-yellow-500 hover:bg-yellow-600"
              onClick={handleMinimize}
              disabled // Minimization not fully implemented
            >
               <Minus className="size-2 opacity-0 transition-opacity group-hover:opacity-100" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-3 rounded-full bg-green-500 hover:bg-green-600"
              onClick={handleMaximize}
            >
               <Square className="size-2 opacity-0 transition-opacity group-hover:opacity-100" />
            </Button>
          </div>
           <h3 className={cn("font-bold text-sm absolute left-1/2 -translate-x-1/2", textColorClass)}>
            {title}
          </h3>
          {/* Empty div to balance the flex layout */}
          <div></div>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-0">
          <ScrollArea className="h-full w-full window-content-scrollbar">
            <div className={cn(
              "h-full",
               windowState === 'maximized' && isTerminal ? 'p-4' : contentPadding
            )}>
              {children}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
