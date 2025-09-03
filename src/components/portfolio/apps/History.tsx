import { historyData } from '@/lib/data';
import { GitCommitHorizontal, User, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function History() {
  return (
    <div className="space-y-6 font-code">
      <h2 className="text-2xl font-bold text-primary font-headline">
        Update History
      </h2>
      <div className="space-y-8 border-l-2 border-border pl-6 relative">
         <div className="absolute -left-[1.6rem] top-0 h-full w-4 bg-gradient-to-t from-transparent via-card to-card"></div>
        {historyData.map((commit, index) => (
          <div key={commit.hash} className="relative">
            <div className="absolute -left-[calc(1.5rem+2px)] top-[2px] flex h-6 w-6 items-center justify-center rounded-full bg-card">
              <div className="h-3 w-3 rounded-full bg-primary ring-4 ring-card"></div>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-lg text-foreground">{commit.message}</p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <User className="size-3.5" />
                  <span>{commit.author}</span>
                </div>
                <div className="flex items-center gap-1.5">
                   <Calendar className="size-3.5" />
                   <time dateTime={commit.date}>{commit.date}</time>
                </div>
                <div className="flex items-center gap-1.5">
                  <GitCommitHorizontal className="size-3.5" />
                   <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="secondary" className="cursor-pointer font-mono">
                          {commit.hash}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy hash</p>
                      </TooltipContent>
                    </Tooltip>
                   </TooltipProvider>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
