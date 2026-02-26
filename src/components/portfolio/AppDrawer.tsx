import type { AppID } from '@/lib/apps';
import * as LucideIcons from 'lucide-react';
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
  if (!isOpen) return null;

  const handleAppClick = (app: DrawerApp) => {
    openApp(app.id);
  };

  return (
    <div
      className="fixed inset-y-0 left-[72px] z-40 flex flex-col"
      style={{
        background: 'rgba(20, 6, 16, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
      onClick={onClose}
    >
      <div className="flex-1 p-8 pt-20 md:p-16">
        <div className="grid grid-cols-4 gap-8 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
          {apps.map((app) => (
            <button
              key={app.id}
              onClick={() => handleAppClick(app)}
              className="group flex flex-col items-center justify-center gap-2.5 text-white transition-transform hover:scale-110 focus:outline-none"
            >
              {/* Ubuntu GNOME アプリ一覧スタイルのアイコン */}
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
      </div>
    </div>
  );
}
