import type { ReactNode } from 'react';
import type { AppID } from '@/app/page';

interface DrawerApp {
  id: AppID;
  title: string;
  icon: ReactNode;
}

interface AppDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  apps: DrawerApp[];
  onAppClick: (id: AppID) => void;
}

export default function AppDrawer({ isOpen, onClose, apps, onAppClick }: AppDrawerProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-y-0 right-0 left-20 z-40 flex flex-col bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div className="flex-1 p-8 pt-20 md:p-16">
        <div className="grid grid-cols-4 gap-8 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
          {apps.map((app) => (
            <button
              key={app.id}
              onClick={() => onAppClick(app.id)}
              className="flex flex-col items-center justify-center gap-2 text-white transition-transform hover:scale-110 focus:outline-none"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-black/40">
                {app.icon}
              </div>
              <span className="w-full truncate text-center text-xs font-medium">
                {app.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
