
'use client';

import { ReactNode, useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Minus, Square } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { AppID } from '@/lib/apps';
import type { WindowState } from '@/lib/types';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAppManager } from '@/hooks/useAppManager';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';


interface AppWindowProps {
  appId: AppID;
  title: string;
  children: ReactNode;
  windowState: WindowState;
}

export default function AppWindow({ appId, title, children, windowState }: AppWindowProps) {
  const { closeApp, minimizeApp, toggleMaximize, focusApp, activeAppId } = useAppManager();
  const isTerminal = appId === 'profile';
  const isMobile = useIsMobile();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 800, height: 600 });
  const nodeRef = useRef(null);

  useEffect(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    // Center new windows with a slight offset
    const openWindows = document.querySelectorAll('[data-window-id]');
    const xOffset = (openWindows.length % 5) * 30;
    const yOffset = (openWindows.length % 5) * 30;
    
    setPosition({ x: vw / 2 - size.width / 2 + xOffset, y: vh / 2 - size.height / 2 + yOffset});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appId]);
  
  const handleDragStop = (e: any, data: any) => {
    setPosition({ x: data.x, y: data.y });
  };
  
  const onResizeStop = (e: any, data: any) => {
    setSize({ width: data.size.width, height: data.size.height });
  };

  const isMaximized = isMobile || windowState.isMaximized;
  const isActive = activeAppId === appId;

  const cardBgClass = isTerminal ? 'bg-[#300A24]/95 backdrop-blur-xl' : 'bg-card';
  const headerBgClass = isTerminal ? 'bg-black/50' : 'bg-muted/40';
  const textColorClass = isTerminal ? 'text-white/80' : 'text-card-foreground';
  const contentPadding = isTerminal ? 'p-0' : 'p-4 md:p-6';

  if (windowState.isMinimized) {
    return null;
  }

  const windowContent = (
      <Card
        data-window-id={appId}
        onMouseDown={() => focusApp(appId)}
        className={cn(
          "flex flex-col overflow-hidden shadow-2xl w-full h-full",
          isMaximized ? 'rounded-none border-0' : 'rounded-lg',
          isTerminal ? 'border-2 border-primary/50' : 'border',
          isActive ? 'shadow-primary/50' : 'shadow-black/50',
          cardBgClass
        )}
      >
        <CardHeader className={cn(
          "flex flex-row items-center justify-between space-y-0 p-2 pl-4 cursor-move",
          headerBgClass
        )}>
          <h3 className={cn("font-bold text-sm", textColorClass)}>
            {title}
          </h3>
          <div className="flex items-center justify-end gap-2">
             <Button
              variant="ghost"
              size="icon"
              className="size-6 rounded-full bg-neutral-600 hover:bg-neutral-700 !cursor-default no-drag"
              onClick={() => minimizeApp(appId)}
            >
               <Minus className="size-3 text-white" />
            </Button>
            {!isMobile && (
              <Button
                variant="ghost"
                size="icon"
                className="size-6 rounded-full bg-neutral-600 hover:bg-neutral-700 !cursor-default no-drag"
                onClick={() => toggleMaximize(appId)}
              >
                <Square className="size-3 text-white" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="size-6 rounded-full bg-red-500 hover:bg-red-600 !cursor-default no-drag"
              onClick={() => closeApp(appId)}
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
  );
  
  if (isMobile) {
    return (
      <div className="absolute inset-0 z-30">
        {windowContent}
      </div>
    )
  }

  if (isMaximized) {
    return (
      <div
        className="absolute inset-0"
        style={{ zIndex: windowState.zIndex }}
      >
        {windowContent}
      </div>
    );
  }

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".cursor-move"
      position={position}
      onStop={handleDragStop}
      cancel=".no-drag"
    >
        <ResizableBox
            ref={nodeRef}
            height={size.height}
            width={size.width}
            onResizeStop={onResizeStop}
            minConstraints={[300, 200]}
            maxConstraints={[1200, 900]}
            className="absolute"
            style={{ zIndex: windowState.zIndex }}
        >
            <div className="w-full h-full">
            {windowContent}
            </div>
        </ResizableBox>
    </Draggable>
  );
}
