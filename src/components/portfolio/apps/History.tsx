import { historyData } from '@/lib/data';
import { GitCommitHorizontal } from 'lucide-react';

export default function History() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">Update History</h2>
      <div className="font-code text-sm">
        {historyData.map((commit, index) => (
          <div key={index} className="border-l-2 border-muted pl-6 pb-8 relative">
            <div className="absolute -left-[11px] top-1.5">
              <GitCommitHorizontal className="size-5 bg-background text-muted-foreground" />
            </div>
            
            <p className="text-yellow-400">commit {commit.hash}</p>
            <p className="text-muted-foreground">
              Author: <span className="text-cyan-400">{commit.author}</span>
            </p>
            <p className="text-muted-foreground">Date: {commit.date}</p>
            
            <p className="mt-4 text-foreground/90">{commit.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
