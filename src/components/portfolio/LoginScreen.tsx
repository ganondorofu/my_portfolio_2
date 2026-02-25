'use client';

import { useEffect, useState } from 'react';
import { profileData } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2, User } from 'lucide-react';
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
          <form
            className="relative w-full"
            onSubmit={(e) => {
              e.preventDefault();
              if (!isLoggingIn) setIsLoggingIn(true);
            }}
          >
            <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              type="password"
              placeholder="Password"
              defaultValue={password}
              onChange={() => {}}
              readOnly
              className="h-12 w-full rounded-md border-primary/50 bg-black/30 pl-10 pr-12 text-center text-lg text-white placeholder:text-gray-400"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-primary/50 hover:bg-primary"
              disabled={isLoggingIn}
            >
              {isLoggingIn && !showDesktop ? (
                <Loader2 className="animate-spin" />
              ) : (
                <ArrowRight />
              )}
            </Button>
          </form>
          <a href="#" className="text-sm text-gray-400 hover:underline">
            アカウントが見つかりませんか？
          </a>
        </div>
      </div>
      <footer className="mb-8 flex items-center justify-center gap-2">
        <svg role="img" viewBox="0 0 24 24" className="h-8 w-8 text-primary">
          <path
            fill="currentColor"
            d="M12,0C5.373,0,0,5.373,0,12s5.373,12,12,12s12-5.373,12-12S18.627,0,12,0z M12,2.4c1.54,0,2.8,1.26,2.8,2.8c0,1.54-1.26,2.8-2.8,2.8c-1.54,0-2.8-1.26-2.8-2.8C9.2,3.66,10.46,2.4,12,2.4z M5.2,9.2c1.54,0,2.8,1.26,2.8,2.8c0,1.54-1.26,2.8-2.8,2.8s-2.8-1.26-2.8-2.8C2.4,10.46,3.66,9.2,5.2,9.2z M18.8,9.2c1.54,0,2.8,1.26,2.8,2.8c0,1.54-1.26,2.8-2.8,2.8s-2.8-1.26-2.8-2.8C16,10.46,17.26,9.2,18.8,9.2z M12,16c-1.54,0-2.8,1.26-2.8,2.8c0,1.54,1.26,2.8,2.8,2.8c1.54,0,2.8-1.26,2.8-2.8C14.8,17.26,13.54,16,12,16z"
          />
        </svg>
        <span className="text-2xl font-medium">Portfolio</span>
      </footer>
    </div>
  );
}
