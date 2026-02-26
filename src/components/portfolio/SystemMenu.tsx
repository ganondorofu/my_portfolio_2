'use client';

import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import ShutdownDialog from './ShutdownDialog';
import {
  Volume2,
  Power,
  Wifi,
  Settings,
  Lock,
  Moon,
  Sun,
  BatteryFull,
  ChevronRight,
} from 'lucide-react';
import { useTheme } from 'next-themes';

export default function SystemMenu() {
  const { theme, setTheme } = useTheme();
  const [showShutdownDialog, setShowShutdownDialog] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="flex h-full items-center gap-2 rounded px-2.5 py-0.5 text-white/90 transition-colors hover:bg-white/15"
          >
            <Wifi className="size-3.5" />
            <Volume2 className="size-3.5" />
            <BatteryFull className="size-3.5" />
            <Power className="size-3.5" />
          </button>
        </PopoverTrigger>

        {/* GNOME Quick Settings パネル */}
        <PopoverContent
          className="mr-1 w-[340px] rounded-xl border-none p-0 text-white shadow-2xl"
          style={{
            background: 'linear-gradient(180deg, #3d3846 0%, #2d2833 100%)',
          }}
          sideOffset={4}
        >
          <div className="p-4 pb-3">
            {/* Quick Toggles (グリッド) */}
            <div className="grid grid-cols-2 gap-2">
              {/* Wi-Fi */}
              <button className="flex items-center gap-3 rounded-xl bg-white/10 px-3 py-2.5 text-left transition-colors hover:bg-white/15">
                <div className="flex size-8 items-center justify-center rounded-full bg-[#1c71d8]">
                  <Wifi className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">Wi-Fi</p>
                  <p className="truncate text-xs text-white/60">接続済み</p>
                </div>
              </button>

              {/* テーマ切り替え */}
              <button
                onClick={toggleTheme}
                className="flex items-center gap-3 rounded-xl bg-white/10 px-3 py-2.5 text-left transition-colors hover:bg-white/15"
              >
                <div className="flex size-8 items-center justify-center rounded-full bg-[#613583]">
                  {theme === 'dark' ? <Moon className="size-4" /> : <Sun className="size-4" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">
                    {theme === 'dark' ? 'ダーク' : 'ライト'}
                  </p>
                  <p className="text-xs text-white/60">スタイル</p>
                </div>
              </button>

              {/* 電力 */}
              <button className="flex items-center gap-3 rounded-xl bg-white/10 px-3 py-2.5 text-left transition-colors hover:bg-white/15">
                <div className="flex size-8 items-center justify-center rounded-full bg-[#26a269]">
                  <BatteryFull className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">バッテリー</p>
                  <p className="text-xs text-white/60">100%</p>
                </div>
              </button>

              {/* 設定 */}
              <button className="flex items-center gap-3 rounded-xl bg-white/10 px-3 py-2.5 text-left transition-colors hover:bg-white/15">
                <div className="flex size-8 items-center justify-center rounded-full bg-white/15">
                  <Settings className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">設定</p>
                </div>
              </button>
            </div>
          </div>

          {/* ボリュームスライダー */}
          <div className="px-4 pb-3">
            <div className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2.5">
              <Volume2 className="size-4 shrink-0 text-white/70" />
              <Slider defaultValue={[66]} max={100} step={1} className="w-full" />
            </div>
          </div>

          <Separator className="bg-white/10" />

          {/* フッター : ロック & 電源 */}
          <div className="flex items-center justify-between px-4 py-3">
            <button className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-white/80 transition-colors hover:bg-white/10">
              <Lock className="size-4" />
              <span>ロック</span>
            </button>
            <button className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-white/80 transition-colors hover:bg-white/10" onClick={() => setShowShutdownDialog(true)}>
              <Power className="size-4" />
              <span>電源オフ…</span>
              <ChevronRight className="size-3.5" />
            </button>
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
