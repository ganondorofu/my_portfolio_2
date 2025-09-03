import { historyData } from '@/lib/data';
import { GitCommitHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function History() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">Update History</h2>
      <div className="font-code text-sm">
        {historyData.map((entry, index) => (
          <div key={index} className="border-l-2 border-muted pl-8 pb-10 relative">
            <div className="absolute -left-[13px] top-1.5">
              <div className="size-6 bg-background flex items-center justify-center rounded-full">
                <GitCommitHorizontal className="size-5 text-muted-foreground" />
              </div>
            </div>
            
            <div className='flex flex-col sm:flex-row sm:items-center sm:gap-4'>
              <p className="text-yellow-400">commit {entry.id}</p>
              <div className='flex items-center gap-2'>
                <Badge variant="secondary">{entry.version}</Badge>
                <p className="text-muted-foreground">{entry.date}</p>
              </div>
            </div>
            
            <p className="mt-2 text-foreground/90 text-base">{entry.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
