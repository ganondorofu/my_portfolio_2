'use client';

import Clock from './Clock';
import SystemMenu from './SystemMenu';
import { useAppManager } from '@/hooks/useAppManager';

export default function Header() {
  const { setDrawerOpen } = useAppManager();

  return (
    <header className="relative z-50 flex h-7 w-full shrink-0 items-center justify-between bg-[#1a1a1a] px-3 text-[13px] font-medium text-white/90 shadow-md">
      {/* Activities ボタン (GNOME Shell 準拠) */}
      <div className="w-1/3">
        <button
          onClick={() => setDrawerOpen(true)}
          className="rounded px-2.5 py-0.5 font-bold transition-colors hover:bg-white/15"
        >
          Activities
        </button>
      </div>

      {/* 中央時計 */}
      <div className="flex w-1/3 justify-center">
        <button className="rounded px-2.5 py-0.5 transition-colors hover:bg-white/15">
          <Clock />
        </button>
      </div>

      {/* システムインジケーター */}
      <div className="flex w-1/3 items-center justify-end">
        <SystemMenu />
      </div>
    </header>
  );
}
