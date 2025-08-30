'use client';

import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import ThemeToggle from './ThemeToggle';
import ShutdownDialog from './ShutdownDialog';
import {
  Wifi,
  Volume2,
  Power,
  Camera,
  Network,
  ChevronRight,
  Battery,
  Moon,
  Sun,
} from 'lucide-react';
import { useTheme } from 'next-themes';

export default function SystemMenu() {
  const { theme, setTheme } = useTheme();
  const [showShutdownDialog, setShowShutdownDialog] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleShutdownClick = () => {
    setShowShutdownDialog(true);
  };
  
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-auto items-center justify-end gap-3 rounded-none p-1 hover:bg-white/20"
          >
            <Wifi className="h-4 w-4" />
            <Volume2 className="h-4 w-4" />
            <Power className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="mr-2 w-80 rounded-2xl bg-zinc-800/90 p-4 text-white backdrop-blur-md border-zinc-700">
          <div className="space-y-4">
            <div className="flex justify-between">
              <Button variant="ghost" size="icon" className="rounded-full bg-zinc-700/80 hover:bg-zinc-600">
                 <Camera className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-zinc-700/80 hover:bg-zinc-600" onClick={handleShutdownClick}>
                <Power className="size-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Volume2 className="size-5" />
              <Slider defaultValue={[66]} max={100} step={1} className="w-full" />
            </div>

            <Button className="flex h-auto w-full items-center justify-between bg-primary p-3 text-base hover:bg-primary/90">
              <div className="flex items-center gap-2">
                <Network className="size-5" />
                <span>有線</span>
              </div>
              <ChevronRight className="size-5" />
            </Button>

            <div className="grid grid-cols-2 gap-2">
              <Button variant="secondary" className="flex h-auto flex-col items-start bg-zinc-700/80 p-2 hover:bg-zinc-600">
                <span>電力設定</span>
                <span className="text-xs text-zinc-400">バランス</span>
              </Button>
               <Button
                variant="secondary"
                className="flex h-auto w-full items-center justify-start gap-2 bg-zinc-700/80 p-2 hover:bg-zinc-600"
                onClick={toggleTheme}
              >
                {theme === 'dark' ? <Moon className="size-4" /> : <Sun className="size-4" />}
                <span>{theme === 'dark' ? '暗いスタイル' : '明るいスタイル'}</span>
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      {showShutdownDialog && (
        <ShutdownDialog
          onClose={() => setShowShutdownDialog(false)}
          onShutdown={() => window.close()}
        />
      )}
    </>
  );
}
