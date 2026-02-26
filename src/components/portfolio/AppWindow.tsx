
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

  const handleDragStop = (e: any, data: any) => {
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
    return null;
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
        {/* Ubuntu GNOME ヘッダー: タイトル中央・ボタン右 */}
        <CardHeader className={cn(
          "relative flex flex-row items-center space-y-0 px-3 py-1.5 cursor-move",
          headerBgClass
        )}>
          {/* タイトル (中央揃え、絶対配置) */}
          <h3 className={cn(
            "pointer-events-none absolute inset-x-0 text-center text-xs font-medium",
            textColorClass
          )}>
            {title}
          </h3>

          {/* 左の余白 (ボタン幅分のプレースホルダ) */}
          <div className="flex-1" />

          {/* Ubuntu GNOME Yaru ウィンドウコントロール (右側) */}
          <div className="window-controls relative z-10 flex items-center gap-2">
            {/* 最小化 */}
            <button
              title="最小化"
              onClick={() => minimizeApp(appId)}
              className="window-btn window-btn-minimize no-drag"
            >
              <Minus className="window-btn-icon" />
            </button>
            {/* 最大化 */}
            {!isMobile && (
              <button
                title="最大化"
                onClick={() => toggleMaximize(appId)}
                className="window-btn window-btn-maximize no-drag"
              >
                <Square className="window-btn-icon" />
              </button>
            )}
            {/* 閉じる */}
            <button
              title="閉じる"
              onClick={() => closeApp(appId)}
              className="window-btn window-btn-close no-drag"
            >
              <X className="window-btn-icon" />
            </button>
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
      defaultPosition={windowState.position}
      onStop={handleDragStop}
      cancel=".no-drag"
      onStart={() => focusApp(appId)}
    >
        <div ref={nodeRef} 
          className={cn(
            "absolute",
          )} 
          style={{ 
            zIndex: windowState.zIndex, 
            width: windowState.size.width, 
            height: windowState.size.height,
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
