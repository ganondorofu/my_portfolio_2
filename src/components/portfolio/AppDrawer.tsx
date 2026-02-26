'use client';

import { useState, useEffect, useRef } from 'react';
import type { AppID } from '@/lib/apps';
import * as LucideIcons from 'lucide-react';
import { Search } from 'lucide-react';
import { useAppManager } from '@/hooks/useAppManager';
import { UbuntuAppIcon } from './UbuntuAppIcon';

interface DrawerApp {
  id: AppID;
  title: string;
  icon: keyof typeof LucideIcons;
  iconBg?: [string, string];
  externalUrl?: string;
}

interface AppDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  apps: DrawerApp[];
}

export default function AppDrawer({ isOpen, onClose, apps }: AppDrawerProps) {
  const { openApp } = useAppManager();
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  // 開いたときに検索欄にフォーカス
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => searchRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? apps.filter((app) =>
        app.title.toLowerCase().includes(query.toLowerCase())
      )
    : apps;

  const handleAppClick = (app: DrawerApp) => {
    openApp(app.id);
    onClose();
  };

  return (
    /* オーバーレイ全体: クリックで閉じる */
    <div
      className="fixed inset-y-0 left-[72px] right-0 z-40 flex flex-col"
      style={{
        background: 'rgba(20, 6, 16, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
      onClick={onClose}
    >
      {/* 検索バー (GNOME Activities 風) */}
      <div className="flex justify-center pt-10" onClick={(e) => e.stopPropagation()}>
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/50" />
          <input
            ref={searchRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="アプリを検索..."
            className="h-10 w-full rounded-full border border-white/15 bg-white/10 pl-10 pr-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/30"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* アプリグリッド */}
      <div className="flex-1 overflow-y-auto p-8 pt-8" onClick={(e) => e.stopPropagation()}>
        {filtered.length === 0 ? (
          <p className="mt-8 text-center text-sm text-white/40">
            「{query}」に一致するアプリはありません
          </p>
        ) : (
          <div className="grid grid-cols-4 gap-8 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
            {filtered.map((app) => (
              <button
                key={app.id}
                onClick={() => handleAppClick(app)}
                className="group flex flex-col items-center justify-center gap-2.5 text-white transition-transform hover:scale-110 focus:outline-none"
              >
                <UbuntuAppIcon
                  icon={app.icon}
                  iconBg={app.iconBg}
                  size={64}
                  className="transition-[box-shadow] duration-150 group-hover:shadow-[0_0_0_3px_rgba(233,84,32,0.5)]"
                />
                <span className="w-full truncate text-center text-xs font-medium text-white/90 drop-shadow">
                  {app.title}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
