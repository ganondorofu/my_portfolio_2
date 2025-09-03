
'use client';

import { ReactNode, useRef, useEffect, useState } from 'react';
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
import { ResizableBox, ResizeCallbackData } from 'react-resizable';
import 'react-resizable/css/styles.css';


interface AppWindowProps {
  appId: AppID;
  title: string;
  children: ReactNode;
  windowState: WindowState;
}

export default function AppWindow({ appId, title, children, windowState }: AppWindowProps) {
  const { 
    closeApp, 
    minimizeApp, 
    toggleMaximize, 
    focusApp, 
    activeAppId, 
    updateWindowPosition, 
    updateWindowSize,
  } = useAppManager();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isTerminal = appId === 'profile';
  const isMobile = useIsMobile();
  const nodeRef = useRef(null);

  const handleDrag = (e: any, data: any) => {
    updateWindowPosition(appId, { x: data.x, y: data.y });
  };
  
  const onResizeStop = (e: MouseEvent, data: ResizeCallbackData) => {
    updateWindowSize(appId, { width: data.size.width, height: data.size.height });
  };

  const isMaximized = isMobile || windowState.isMaximized;
  const isActive = activeAppId === appId;

  const cardBgClass = isTerminal ? 'bg-[#300A24]/95 backdrop-blur-xl' : 'bg-card';
  const headerBgClass = isTerminal ? 'bg-black/50' : 'bg-muted/40';
  const textColorClass = isTerminal ? 'text-white/80' : 'text-card-foreground';
  const contentPadding = isTerminal ? 'p-0' : 'p-4 md:p-6';

  if (windowState.isMinimized || !windowState.position) {
    return null; // Don't render if minimized or position is not yet calculated
  }
  
  const animationClass = isMounted && !windowState.isClosing ? "animate-window-open" : windowState.isClosing ? "animate-window-close" : "";

  const windowContent = (
      <Card
        data-window-id={appId}
        onMouseDownCapture={() => focusApp(appId)}
        className={cn(
          "flex flex-col overflow-hidden shadow-2xl w-full h-full",
          isMaximized ? 'rounded-none border-0' : 'rounded-lg',
          isTerminal ? 'border-2 border-primary/50' : 'border',
          isActive ? 'shadow-primary/50' : 'shadow-black/50',
          cardBgClass,
          animationClass
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
  
  const commonWrapperClass = "transition-[left,top,width,height] duration-200 ease-in-out";

  if (isMobile) {
    return (
      <div className={cn(
        "absolute inset-0 z-30",
        commonWrapperClass
      )}>
        {windowContent}
      </div>
    )
  }

  if (isMaximized) {
    return (
      <div
        className={cn(
          "absolute inset-0",
          commonWrapperClass
        )}
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
      position={windowState.position}
      onDrag={handleDrag}
      cancel=".no-drag"
      onStart={() => focusApp(appId)}
    >
        <div ref={nodeRef} 
          className={cn(
            "absolute",
            commonWrapperClass
          )} 
          style={{ 
            zIndex: windowState.zIndex, 
            width: windowState.size.width, 
            height: windowState.size.height,
            top: windowState.position.y,
            left: windowState.position.x,
          }}>
            <ResizableBox
                height={windowState.size.height}
                width={windowState.size.width}
                onResizeStop={onResizeStop}
                minConstraints={[300, 200]}
                maxConstraints={[1200, 900]}
            >
                <div className="w-full h-full">
                {windowContent}
                </div>
            </ResizableBox>
        </div>
    </Draggable>
  );
}
