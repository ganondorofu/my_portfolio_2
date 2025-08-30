import { profileData } from '@/lib/data';
import { Mail, Github, GraduationCap, Building } from 'lucide-react';
import { useEffect, useState, ReactNode } from 'react';

const CommandLine = ({ children, prompt = true }: { children: React.ReactNode; prompt?: boolean }) => (
  <div className="flex items-center gap-2">
    {prompt && (
      <>
        <span className="text-green-400">{profileData.name.toLowerCase()}@portfolio</span>
        <span className="text-primary">:</span>
        <span className="text-blue-400">~</span>
        <span className="text-white">$</span>
      </>
    )}
    <span className="ml-2 text-white">{children}</span>
  </div>
);

const allOutputLines: ReactNode[] = [
  <div key="name" className="text-3xl font-bold text-primary">{profileData.name}</div>,
  <div key="title" className="text-lg text-gray-400">{profileData.title}</div>,
  <div key="spacer1" className="mt-6 space-y-2">
    <div className="flex items-center gap-3">
      <GraduationCap className="size-5 text-primary"/>
      <span>{profileData.school}</span>
    </div>
    <div className="flex items-center gap-3">
      <Building className="size-5 text-primary"/>
      <span>{profileData.affiliation}</span>
    </div>
    <div className="flex items-center gap-3">
      <Mail className="size-5 text-primary" />
      <a href={`mailto:${profileData.email}`} className="hover:underline text-cyan-400">{profileData.email}</a>
    </div>
    <div className="flex items-center gap-3">
      <Github className="size-5 text-primary" />
      <a href={`https://github.com/${profileData.github.substring(1)}`} target="_blank" rel="noopener noreferrer" className="hover:underline text-cyan-400">{`https://github.com/${profileData.github.substring(1)}`}</a>
    </div>
  </div>,
  <div key="policy-header" className="pt-6">
    <h3 className="text-xl font-bold text-primary mb-3"># 学習方針</h3>
  </div>,
  ...profileData.learningPolicy.map((policy, index) => (
    <div key={`policy-${index}`} className="space-y-3 pl-2">
        <div className="font-bold text-base text-gray-200">- {policy.title}</div>
        <p className="text-gray-400 pl-4">{policy.description}</p>
    </div>
  )),
];

let hasAnimatedInSession = false;

export default function Profile() {
  const [command, setCommand] = useState(hasAnimatedInSession ? 'cat ./profile.md' : '');
  const [outputLines, setOutputLines] = useState<ReactNode[]>(hasAnimatedInSession ? allOutputLines : []);
  const [isAnimating, setIsAnimating] = useState(!hasAnimatedInSession);

  useEffect(() => {
    if (hasAnimatedInSession) {
      return;
    }

    const fullCommand = 'cat ./profile.md';
    let i = 0;
    const typing = setInterval(() => {
      setCommand(fullCommand.slice(0, i + 1));
      i++;
      if (i > fullCommand.length) {
        clearInterval(typing);
        
        let j = 0;
        const displayOutput = setInterval(() => {
          setOutputLines(prev => [...prev, allOutputLines[j]]);
          j++;
          if (j >= allOutputLines.length) {
            clearInterval(displayOutput);
            hasAnimatedInSession = true;
            setIsAnimating(false);
          }
        }, 50);
      }
    }, 50);

    return () => {
      clearInterval(typing);
    };
  }, []);

  return (
    <div className="font-code text-sm text-white rounded-lg">
      <CommandLine>
        {command}
        {isAnimating && <span className="inline-block w-2 h-4 bg-white animate-pulse ml-1"></span>}
      </CommandLine>
      
      {outputLines.length > 0 && (
        <div className="mt-4 space-y-2 text-gray-300">
          {outputLines.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
          {!isAnimating && (
             <CommandLine><span className="inline-block w-2 h-4 bg-white animate-pulse ml-1"></span></CommandLine>
          )}
        </div>
      )}
    </div>
  );
}
