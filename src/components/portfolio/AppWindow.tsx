import type { ReactNode } from 'react';
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

export default function AppWindow({ appId, title, onClose, children }: AppWindowProps) {
  const isTerminal = appId === 'profile';

  return (
    <div
      className={cn(
        "fixed inset-0 z-40 flex items-center justify-center",
        !isTerminal && "bg-black/30 backdrop-blur-sm"
      )}
      onClick={onClose}
    >
      <Card
        className={cn(
          "flex flex-col overflow-hidden shadow-2xl",
          isTerminal
            ? "h-screen w-screen border-0 rounded-none bg-[#300A24]"
            : "h-[90vh] w-[90vw] max-w-4xl rounded-lg border-2 border-primary/50 bg-card/80 backdrop-blur-xl"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader className={cn(
          "flex flex-row items-center justify-between space-y-0 p-2 pl-4",
          isTerminal ? "bg-black/50" : "bg-card/90"
        )}>
          <h3 className={cn(
            "font-bold text-sm",
            isTerminal ? "text-white/80" : "text-card-foreground"
          )}>{title}</h3>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className={cn("size-8", isTerminal && "text-white/80 hover:bg-white/20")} disabled>
              <Minus className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" className={cn("size-8", isTerminal && "text-white/80 hover:bg-white/20")} disabled>
              <Square className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "size-8 hover:bg-destructive hover:text-destructive-foreground",
                isTerminal && "text-white/80"
              )}
              onClick={onClose}
            >
              <X className="size-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-0">
          <ScrollArea className="h-full w-full window-content-scrollbar">
            <div className={cn(
              isTerminal ? "p-4" : "p-6"
            )}>
              {children}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
