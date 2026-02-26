import { profileData } from '@/lib/data';
import { Mail, Github, GraduationCap, Building } from 'lucide-react';
import { useEffect, useState, ReactNode } from 'react';

/**
 * Ubuntu Terminal (Tango カラースキーム) の色定義
 * https://en.wikipedia.org/wiki/Tango_Desktop_Project
 */
const TANGO = {
  green:  '#4E9A06', // プロンプト user@host
  blue:   '#3465A4', // ディレクトリ
  cyan:   '#06989A', // リンク
  fg:     '#D3D7CF', // 標準テキスト
  dim:    '#888A85', // 説明文
  bright: '#EEEEEC', // 強調テキスト
};

const HOSTNAME = 'ubuntu';
const USER = 'komeniki';

const CommandLine = ({ children, prompt = true }: { children: React.ReactNode; prompt?: boolean }) => (
  <div className="flex items-start gap-0 font-code leading-relaxed">
    {prompt && (
      <>
        <span className="font-bold" style={{ color: TANGO.green }}>{USER}@{HOSTNAME}</span>
        <span style={{ color: TANGO.fg }}>:</span>
        <span className="font-bold" style={{ color: TANGO.blue }}>~</span>
        <span style={{ color: TANGO.fg }}>$ </span>
      </>
    )}
    <span style={{ color: TANGO.fg }}>{children}</span>
  </div>
);

const allOutputLines: ReactNode[] = [
  <div key="name" className="text-3xl font-bold text-primary">{profileData.name}</div>,
  <div key="title" className="text-lg" style={{ color: TANGO.dim }}>{profileData.title}</div>,
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
      <a href={`mailto:${profileData.email}`} className="hover:underline" style={{ color: TANGO.cyan }}>{profileData.email}</a>
    </div>
    <div className="flex items-center gap-3">
      <Github className="size-5 text-primary" />
      <a href={`https://github.com/${profileData.github.substring(1)}`} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: TANGO.cyan }}>{`https://github.com/${profileData.github.substring(1)}`}</a>
    </div>
  </div>,
  <div key="policy-header" className="pt-6">
    <h3 className="text-xl font-bold text-primary mb-3"># 学習方針</h3>
  </div>,
  ...profileData.learningPolicy.map((policy, index) => (
    <div key={`policy-${index}`} className="space-y-3 pl-2">
        <div className="font-bold text-base" style={{ color: TANGO.bright }}>- {policy.title}</div>
        <p className="pl-4" style={{ color: TANGO.dim }}>{policy.description}</p>
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
    <div className="font-code text-sm rounded-lg" style={{ color: TANGO.fg }}>
      <CommandLine>
        {command}
        {isAnimating && (
          <span
            className="inline-block w-[0.55em] h-[1.1em] animate-pulse ml-0.5 align-middle"
            style={{ background: TANGO.fg }}
          />
        )}
      </CommandLine>

      {outputLines.length > 0 && (
        <div className="mt-4 space-y-2" style={{ color: TANGO.fg }}>
          {outputLines.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
          {!isAnimating && (
            <CommandLine>
              <span
                className="inline-block w-[0.55em] h-[1.1em] animate-pulse ml-0.5 align-middle"
                style={{ background: TANGO.fg }}
              />
            </CommandLine>
          )}
        </div>
      )}
    </div>
  );
}
