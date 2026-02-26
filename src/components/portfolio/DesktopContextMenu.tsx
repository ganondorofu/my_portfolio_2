'use client';

import { useEffect, useRef } from 'react';
import { RefreshCw, Layout, Settings, Info } from 'lucide-react';

interface DesktopContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onOpenSettings?: () => void;
  onOpenAbout?: () => void;
}

export default function DesktopContextMenu({
  x,
  y,
  onClose,
  onOpenSettings,
  onOpenAbout,
}: DesktopContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // 外部クリック / ESC で閉じる
  useEffect(() => {
    const handleDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  // 画面端からはみ出さないよう位置を補正
  const safeX = Math.min(x, window.innerWidth - 220);
  const safeY = Math.min(y, window.innerHeight - 200);

  const Item = ({
    icon: Icon,
    label,
    onClick,
    separator,
  }: {
    icon?: React.ComponentType<{ className?: string }>;
    label: string;
    onClick?: () => void;
    separator?: boolean;
  }) => (
    <>
      {separator && <div className="my-1 border-t border-white/10" />}
      <button
        className="flex w-full items-center gap-3 rounded-lg px-3 py-1.5 text-left text-sm text-white/90 transition-colors hover:bg-white/15"
        onClick={() => {
          onClick?.();
          onClose();
        }}
      >
        {Icon && <Icon className="size-4 shrink-0 text-white/60" />}
        {label}
      </button>
    </>
  );

  return (
    <div
      ref={menuRef}
      className="fixed z-[200] w-52 rounded-xl border border-white/10 py-1.5 shadow-2xl"
      style={{
        left: safeX,
        top: safeY,
        background: 'linear-gradient(180deg, #3d3846 0%, #2d2833 100%)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <Item
        icon={RefreshCw}
        label="デスクトップを更新"
        onClick={() => window.location.reload()}
      />
      <Item
        icon={Layout}
        label="壁紙と外観"
        onClick={onOpenSettings}
        separator
      />
      <Item
        icon={Settings}
        label="設定"
        onClick={onOpenSettings}
      />
      <Item
        icon={Info}
        label="このシステムについて"
        onClick={onOpenAbout}
        separator
      />
    </div>
  );
}
