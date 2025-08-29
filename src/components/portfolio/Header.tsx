import Clock from './Clock';
import ThemeToggle from './ThemeToggle';
import { profileData } from '@/lib/data';

export default function Header() {
  return (
    <header className="flex h-8 w-full shrink-0 items-center justify-between bg-black/80 px-4 text-sm font-medium text-white backdrop-blur-sm">
      <div className="font-bold">Activities</div>
      <div className="flex items-center gap-4">
        <span>{profileData.name}</span>
        <ThemeToggle />
        <Clock />
      </div>
    </header>
  );
}
