'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { profileData } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoginScreenProps {
  onLoginComplete: () => void;
}

export default function LoginScreen({ onLoginComplete }: LoginScreenProps) {
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showDesktop, setShowDesktop] = useState(false);
  const fakePassword = 'password123';

  useEffect(() => {
    // Start the login sequence automatically
    const timer = setTimeout(() => {
      let i = 0;
      const typing = setInterval(() => {
        setPassword(fakePassword.slice(0, i + 1));
        i++;
        if (i > fakePassword.length) {
          clearInterval(typing);
          setIsLoggingIn(true);
        }
      }, 100);
      return () => clearInterval(typing);
    }, 500); // Initial delay
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoggingIn) {
      const timer = setTimeout(() => {
        setShowDesktop(true);
      }, 1500); // Simulate loading time
      return () => clearTimeout(timer);
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
        "fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-500",
        showDesktop ? "opacity-0" : "opacity-100"
      )}
    >
      <div className="flex flex-col items-center gap-6">
        <Image
          src="/avatar.png"
          alt="User Avatar"
          width={96}
          height={96}
          className="rounded-full"
          priority
        />
        <h1 className="text-2xl font-bold text-foreground">{profileData.name}</h1>

        <form
          className="w-64 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setIsLoggingIn(true);
          }}
        >
          <div className="relative">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              readOnly
              className="pr-10 text-center text-lg"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <Loader2 className="animate-spin" />
              ) : (
                <ArrowRight />
              )}
            </Button>
          </div>
        </form>
        
        <p className="text-sm text-muted-foreground">
          {isLoggingIn ? 'Logging in...' : 'Welcome'}
        </p>
      </div>
    </div>
  );
}
