import type { ReactNode } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Minus, Square } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AppWindowProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export default function AppWindow({ title, onClose, children }: AppWindowProps) {
  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <Card
        className="flex h-[90vh] w-[90vw] max-w-4xl flex-col overflow-hidden rounded-lg border-2 border-primary/50 bg-card/80 shadow-2xl backdrop-blur-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-card/90 p-2 pl-4">
          <h3 className="font-bold text-sm text-card-foreground">{title}</h3>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="size-8" disabled>
              <Minus className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" className="size-8" disabled>
              <Square className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 hover:bg-destructive hover:text-destructive-foreground"
              onClick={onClose}
            >
              <X className="size-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-0">
          <ScrollArea className="h-full w-full window-content-scrollbar">
            <div className="p-6">{children}</div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
