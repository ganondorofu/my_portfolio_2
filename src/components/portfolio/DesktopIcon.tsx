import type { ReactNode } from 'react';

interface DesktopIconProps {
  icon: ReactNode;
  title: string;
  onClick: () => void;
}

export default function DesktopIcon({ icon, title, onClick }: DesktopIconProps) {
  return (
    <button
      onClick={onClick}
      className="flex h-24 w-28 flex-col items-center justify-center gap-2 rounded-lg p-2 text-foreground transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <div className="text-primary">{icon}</div>
      <span className="w-full truncate text-center text-xs font-medium">
        {title}
      </span>
    </button>
  );
}
