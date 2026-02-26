'use client';

import { useEffect, useState } from 'react';
import { profileData } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2, Lock } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import LoginHeader from './LoginHeader';

interface LoginScreenProps {
  onLoginComplete: () => void;
}

export default function LoginScreen({ onLoginComplete }: LoginScreenProps) {
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showDesktop, setShowDesktop] = useState(false);
  const fakePassword = 'password123'; // This can be anything

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoggingIn(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoggingIn) {
      let i = 0;
      const typing = setInterval(() => {
        setPassword(fakePassword.slice(0, i + 1));
        i++;
        if (i >= fakePassword.length) {
          clearInterval(typing);
          // Wait a bit after typing before transitioning
          setTimeout(() => {
            setShowDesktop(true);
          }, 500);
        }
      }, 100);
      return () => clearInterval(typing);
    }
  }, [isLoggingIn]);

  useEffect(() => {
    if (showDesktop) {
      const timer = setTimeout(onLoginComplete, 500); // Transition to desktop
      return () => clearTimeout(timer);
    }
  }, [showDesktop, onLoginComplete]);

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex flex-col text-white transition-opacity duration-500',
        showDesktop ? 'opacity-0' : 'opacity-100'
      )}
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 20% 30%, rgba(119,41,83,0.55) 0%, transparent 70%), ' +
          'linear-gradient(160deg, #1A0010 0%, #2C001E 40%, #4A1040 70%, #772953 90%, #9B3060 100%)',
      }}
    >
      <LoginHeader />
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="flex w-80 flex-col items-center gap-4">
          {/* Ubuntu ログイン画面スタイルのアバター */}
          <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-white/20 shadow-lg">
            <Image
              src="/avatar.png"
              alt={profileData.name}
              fill
              className="object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </div>
          <h1 className="text-2xl font-medium">{profileData.name}</h1>
          {/* Ubuntu GDM スタイルのパスワード入力 */}
          <form
            className="relative w-full"
            onSubmit={(e) => {
              e.preventDefault();
              if (!isLoggingIn) setIsLoggingIn(true);
            }}
          >
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <Input
              type="password"
              placeholder="パスワード"
              defaultValue={password}
              onChange={() => {}}
              readOnly
              className="h-11 w-full rounded-full border-none bg-white/10 pl-10 pr-12 text-center text-base text-white placeholder:text-white/40 focus-visible:ring-1 focus-visible:ring-white/30"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-1.5 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-white/15 hover:bg-white/25 border-none"
              disabled={isLoggingIn}
            >
              {isLoggingIn && !showDesktop ? (
                <Loader2 className="size-4 animate-spin text-white/80" />
              ) : (
                <ArrowRight className="size-4 text-white/80" />
              )}
            </Button>
          </form>
          <a href="#" className="text-sm text-gray-400 hover:underline">
            アカウントが見つかりませんか？
          </a>
        </div>
      </div>
      {/* Ubuntu ロゴ + ブランド名 */}
      <footer className="mb-8 flex items-center justify-center gap-2.5">
        {/* Ubuntu Circle of Friends ロゴ */}
        <svg viewBox="0 0 256 256" className="h-8 w-8" role="img" aria-label="Ubuntu">
          <circle cx="128" cy="128" r="128" fill="#E95420" />
          <circle cx="128" cy="42.7" r="24" fill="white" />
          <circle cx="54.1" cy="170.7" r="24" fill="white" />
          <circle cx="201.9" cy="170.7" r="24" fill="white" />
          <circle cx="128" cy="128" r="36" fill="none" stroke="white" strokeWidth="16" />
        </svg>
        <span className="text-xl font-medium tracking-wide text-white/80">ubuntu</span>
      </footer>
    </div>
  );
}
