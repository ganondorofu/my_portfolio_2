'use client';

import { useState, useMemo, useEffect } from 'react';
import type { ReactNode } from 'react';
import {
  User,
  Folder,
  Wrench,
  Award,
  BrainCircuit,
  Mail,
  Github,
  Grid3x3,
} from 'lucide-react';
import Header from '@/components/portfolio/Header';
import Dock from '@/components/portfolio/Dock';
import AppDrawer from '@/components/portfolio/AppDrawer';
import AppWindow from '@/components/portfolio/AppWindow';
import LoginScreen from '@/components/portfolio/LoginScreen';

// App Contents
import Profile from '@/components/portfolio/apps/Profile';
import Projects from '@/components/portfolio/apps/Projects';
import Skills from '@/components/portfolio/apps/Skills';
import Achievements from '@/components/portfolio/apps/Achievements';
import LearningStatement from '@/components/portfolio/apps/LearningStatement';
import Contact from '@/components/portfolio/apps/Contact';

export type AppID =
  | 'profile'
  | 'projects'
  | 'skills'
  | 'achievements'
  | 'learning'
  | 'contact'
  | 'github'
  | 'show-apps';

interface App {
  id: AppID;
  title: string;
  icon: ReactNode;
  content?: ReactNode;
  externalUrl?: string;
}

export default function Home() {
  const [activeApp, setActiveApp] = useState<AppID | null>(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Prevent scrolling when app windows or drawers are open
  useEffect(() => {
    if (activeApp || isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [activeApp, isDrawerOpen]);


  const apps: Record<AppID, App> = useMemo(
    () => ({
      profile: {
        id: 'profile',
        title: 'プロフィール (Profile)',
        icon: <User className="size-8" />,
        content: <Profile />,
      },
      projects: {
        id: 'projects',
        title: 'プロジェクト (Projects)',
        icon: <Folder className="size-8" />,
        content: <Projects />,
      },
      skills: {
        id: 'skills',
        title: 'スキル (Skills)',
        icon: <Wrench className="size-8" />,
        content: <Skills />,
      },
      achievements: {
        id: 'achievements',
        title: '実績 (Achievements)',
        icon: <Award className="size-8" />,
        content: <Achievements />,
      },
      learning: {
        id: 'learning',
        title: '学習方針ジェネレーター',
        icon: <BrainCircuit className="size-8" />,
        content: <LearningStatement />,
      },
      contact: {
        id: 'contact',
        title: 'お問い合わせ (Contact)',
        icon: <Mail className="size-8" />,
        content: <Contact />,
      },
      github: {
        id: 'github',
        title: 'GitHub',
        icon: <Github className="size-8" />,
        externalUrl: 'https://github.com/ganondorofu',
      },
      'show-apps': {
        id: 'show-apps',
        title: 'Show Applications',
        icon: <Grid3x3 className="size-7" />,
      },
    }),
    []
  );

  const openApp = (id: AppID) => {
    if (id === 'show-apps') {
      setDrawerOpen(true);
      return;
    }
    const app = apps[id];
    if (app.externalUrl) {
      window.open(app.externalUrl, '_blank');
    } else {
      setActiveApp(id);
      setDrawerOpen(false);
    }
  };

  const closeApp = () => {
    setActiveApp(null);
  };
  
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <LoginScreen onLoginComplete={handleLogin} />;
  }

  const dockApps: AppID[] = ['profile', 'projects', 'learning', 'contact', 'github'];
  const allAppsForDrawer = Object.values(apps).filter(app => app.id !== 'show-apps');

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-background font-headline">
      <Header />
      <div className="flex flex-1">
        <Dock 
          apps={dockApps.map((id) => apps[id])} 
          showAppsButton={apps['show-apps']}
          onAppClick={openApp}
          activeApp={activeApp}
        />
        <main className="flex-1 p-4 md:p-8">
          {/* Desktop icons removed for a cleaner look */}
        </main>
      </div>

      {activeApp && apps[activeApp] && (
        <AppWindow title={apps[activeApp].title} onClose={closeApp}>
          {apps[activeApp].content}
        </AppWindow>
      )}

      <AppDrawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        apps={allAppsForDrawer}
        onAppClick={openApp}
      />
    </div>
  );
}
