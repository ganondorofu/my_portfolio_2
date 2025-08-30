import Clock from './Clock';
import ThemeToggle from './ThemeToggle';
import { profileData } from '@/lib/data';

export default function Header() {
  return (
    <header className="flex h-8 w-full shrink-0 items-center justify-between bg-black/80 px-4 text-sm font-medium text-white backdrop-blur-sm z-50 relative">
      <div className="w-1/3 font-bold">Activities</div>
      <div className="w-1/3 flex justify-center">
        <Clock />
      </div>
      <div className="w-1/3 flex items-center justify-end gap-4">
        <span>{profileData.name}</span>
        <ThemeToggle />
      </div>
    </header>
  );
}
