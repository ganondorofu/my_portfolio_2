import { profileData } from '@/lib/data';
import { Mail, Github, GraduationCap, Building } from 'lucide-react';
import { useEffect, useState } from 'react';

const CommandLine = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-2">
    <span className="text-green-400">yoneyone@portfolio</span>
    <span className="text-primary">:</span>
    <span className="text-blue-400">~</span>
    <span className="text-white">$</span>
    <span className="ml-2 text-white">{children}</span>
  </div>
);

export default function Profile() {
  const [command, setCommand] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const fullCommand = `cat ./profile.md`;

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      setCommand(fullCommand.slice(0, i + 1));
      i++;
      if (i >= fullCommand.length) {
        clearInterval(typing);
        setTimeout(() => setShowOutput(true), 300);
      }
    }, 100);
    return () => clearInterval(typing);
  }, [fullCommand]);

  return (
    <div className="font-code text-sm p-4 bg-[#300A24] text-white rounded-lg">
      <CommandLine>{command}<span className="inline-block w-2 h-4 bg-white animate-pulse ml-1"></span></CommandLine>
      
      {showOutput && (
        <div className="mt-4 space-y-4 text-gray-300">
          <div className="text-3xl font-bold text-primary">{profileData.name}</div>
          <div className="text-lg text-gray-400">{profileData.title}</div>
          
          <div className="mt-6 space-y-2">
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
          </div>
          
          <div className="pt-6">
            <h3 className="text-xl font-bold text-primary mb-3"># 学習方針</h3>
            <ul className="space-y-3">
              {profileData.learningPolicy.map((policy) => (
                <li key={policy.title}>
                  <div className="font-bold text-base text-gray-200">{policy.title}</div>
                  <p className="text-gray-400 pl-2">- {policy.description}</p>
                </li>
              ))}
            </ul>
          </div>

          <CommandLine><span className="inline-block w-2 h-4 bg-white animate-pulse ml-1"></span></CommandLine>
        </div>
      )}
    </div>
  );
}
