'use client';

import { useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import {
  User,
  FolderGit2,
  Wrench,
  Award,
  BrainCircuit,
  Mail,
  Github,
} from 'lucide-react';
import Header from '@/components/portfolio/Header';
import Dock from '@/components/portfolio/Dock';
import DesktopIcon from '@/components/portfolio/DesktopIcon';
import AppWindow from '@/components/portfolio/AppWindow';

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
  | 'github';

interface App {
  id: AppID;
  title: string;
  icon: ReactNode;
  content?: ReactNode;
  externalUrl?: string;
}

export default function Home() {
  const [activeApp, setActiveApp] = useState<AppID | null>(null);

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
        icon: <FolderGit2 className="size-8" />,
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
    }),
    []
  );

  const openApp = (id: AppID) => {
    const app = apps[id];
    if (app.externalUrl) {
      window.open(app.externalUrl, '_blank');
    } else {
      setActiveApp(id);
    }
  };

  const closeApp = () => {
    setActiveApp(null);
  };

  const desktopApps: AppID[] = ['profile', 'projects', 'skills', 'achievements'];
  const dockApps: AppID[] = ['profile', 'projects', 'learning', 'contact', 'github'];

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-background font-headline">
      <Header />
      <div className="flex flex-1">
        <Dock 
          apps={dockApps.map((id) => apps[id])} 
          onAppClick={openApp}
          activeApp={activeApp}
        />
        <main className="flex-1 p-4 md:p-8">
          <div className="grid h-full grid-cols-2 grid-rows-4 items-start justify-start gap-4">
            {desktopApps.map((id) => (
              <DesktopIcon
                key={id}
                icon={apps[id].icon}
                title={apps[id].title}
                onClick={() => openApp(id)}
              />
            ))}
          </div>
        </main>
      </div>

      {activeApp && apps[activeApp] && (
        <AppWindow title={apps[activeApp].title} onClose={closeApp}>
          {apps[activeApp].content}
        </AppWindow>
      )}
    </div>
  );
}