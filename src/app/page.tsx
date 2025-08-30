'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginScreen from '@/components/portfolio/LoginScreen';
import { useAppManager } from '@/hooks/useAppManager';

export default function Home() {
  const { isLoggedIn, handleLogin } = useAppManager();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/profile');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return <LoginScreen onLoginComplete={handleLogin} />;
  }

  // You can show a loading spinner here while redirecting
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <p>Loading Desktop...</p>
    </div>
  );
}
