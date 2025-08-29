import { profileData } from '@/lib/data';
import { Mail, Github, GraduationCap, Building } from 'lucide-react';

export default function Profile() {
  const command = `cat ./profile.txt`;
  
  return (
    <div className="font-code text-sm">
      <div className="flex items-center gap-2">
        <span className="text-green-400">yoneyone@portfolio</span>
        <span className="text-primary">:</span>
        <span className="text-blue-400">~</span>
        <span>$</span>
        <span className="ml-2">{command}</span>
      </div>
      <div className="mt-4 space-y-4">
        <div className="text-3xl font-bold text-primary">{profileData.name}</div>
        <div className="text-lg text-muted-foreground">{profileData.title}</div>
        
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
            <a href={`mailto:${profileData.email}`} className="hover:underline">{profileData.email}</a>
          </div>
          <div className="flex items-center gap-3">
            <Github className="size-5 text-primary" />
            <a href={`https://github.com/${profileData.github.substring(1)}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{profileData.github}</a>
          </div>
        </div>
        
        <div className="pt-6">
          <h3 className="text-xl font-bold text-primary mb-3">学習方針</h3>
          <ul className="space-y-3">
            {profileData.learningPolicy.map((policy) => (
              <li key={policy.title}>
                <div className="font-bold text-base">{policy.title}</div>
                <p className="text-muted-foreground pl-2">{policy.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
