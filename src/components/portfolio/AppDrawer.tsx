import type { ReactNode } from 'react';
import type { AppID } from '@/lib/apps';
import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppManager } from '@/hooks/useAppManager';

interface DrawerApp {
  id: AppID;
  title: string;
  icon: keyof typeof LucideIcons;
  iconColor?: string;
  externalUrl?: string;
}

interface AppDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  apps: DrawerApp[];
}

const Icon = ({ name, className }: { name: keyof typeof LucideIcons; className?: string }) => {
  const LucideIcon = LucideIcons[name];
  if (!LucideIcon) return null;
  return <LucideIcon className={cn('size-10', className)} />;
};

export default function AppDrawer({ isOpen, onClose, apps }: AppDrawerProps) {
  const { openApp } = useAppManager();
  if (!isOpen) return null;

  const handleAppClick = (app: DrawerApp) => {
    if (app.externalUrl) {
      window.open(app.externalUrl, '_blank');
      onClose();
    } else {
      // The Link component will handle navigation,
      // so we just need to close the drawer.
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-y-0 left-24 z-40 flex flex-col bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div className="flex-1 p-8 pt-20 md:p-16">
        <div className="grid grid-cols-4 gap-8 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
          {apps.map((app) => {
            const buttonContent = (
              <div
                className="flex flex-col items-center justify-center gap-2 text-white transition-transform hover:scale-110 focus:outline-none"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-black/40">
                  <Icon name={app.icon} className={cn('size-10', app.iconColor)} />
                </div>
                <span className="w-full truncate text-center text-xs font-medium">
                  {app.title}
                </span>
              </div>
            );

            if (app.externalUrl) {
              return (
                <button key={app.id} onClick={() => handleAppClick(app)}>
                  {buttonContent}
                </button>
              );
            }

            return (
              <Link key={app.id} href={`/${app.id}`} onClick={() => handleAppClick(app)} passHref>
                {buttonContent}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
