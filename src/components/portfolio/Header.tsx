'use client';

import Clock from './Clock';
import ThemeToggle from './ThemeToggle';
import { profileData } from '@/lib/data';
import { Wifi, Volume2, Power } from 'lucide-react';

export default function Header() {
  return (
    <header className="relative z-50 flex h-8 w-full shrink-0 items-center justify-between bg-black/50 px-4 text-sm font-medium text-white/90 backdrop-blur-sm">
      <div className="w-1/3 font-bold">Activities</div>
      <div className="flex w-1/3 justify-center">
        <Clock />
      </div>
      <div className="flex w-1/3 items-center justify-end gap-3">
        <ThemeToggle />
        {/* These are decorative icons */}
        <Wifi className="h-4 w-4" />
        <Volume2 className="h-4 w-4" />
        <Power className="h-4 w-4" />
      </div>
    </header>
  );
}
