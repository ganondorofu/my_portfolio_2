'use client';

import Clock from './Clock';
import SystemMenu from './SystemMenu';

export default function Header() {
  return (
    <header className="relative z-50 flex h-8 w-full shrink-0 items-center justify-between bg-black px-4 text-sm font-medium text-white/90">
      <div className="w-1/3 font-bold">Activities</div>
      <div className="flex w-1/3 justify-center">
        <Clock />
      </div>
      <div className="flex w-1/3 items-center justify-end">
        <SystemMenu />
      </div>
    </header>
  );
}
