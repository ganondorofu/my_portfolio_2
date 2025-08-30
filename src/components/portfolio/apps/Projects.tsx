import { projectsData } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, Link as LinkIcon, Folder, FileText } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Projects() {
  const getStatusColor = (status: 'Production' | 'Completed' | 'Active') => {
    switch (status) {
      case 'Production': return 'text-green-500';
      case 'Completed': return 'text-blue-500';
      case 'Active': return 'text-yellow-500';
      default: return 'text-muted-foreground';
    }
  };

  const getIcon = (category: string) => {
    switch(category.toLowerCase()) {
      case 'web application':
      case 'mobile app':
      case 'desktop app':
      case 'unity showcase':
        return <FileText className="h-5 w-5 text-primary" />;
      default:
        return <Folder className="h-5 w-5 text-primary" />;
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">Projects</h2>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Links</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projectsData.map((project) => (
              <TableRow key={project.title}>
                <TableCell>{getIcon(project.category)}</TableCell>
                <TableCell>
                  <div className="font-medium">{project.title}</div>
                  <div className="text-sm text-muted-foreground">{project.description}</div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.technologies.map(tech => <Badge key={tech} variant="secondary">{tech}</Badge>)}
                  </div>
                </TableCell>
                <TableCell>
                   <Badge variant="outline" className="flex items-center gap-2 shrink-0">
                      <span className={`h-2 w-2 rounded-full ${getStatusColor(project.status).replace('text-','bg-')}`}></span>
                      {project.status}
                  </Badge>
                </TableCell>
                <TableCell>{project.category}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {project.url && (
                      <Button asChild variant="ghost" size="icon">
                        <a href={project.url} target="_blank" rel="noopener noreferrer" title="Visit project">
                          <LinkIcon className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {project.github && (
                      <Button asChild variant="ghost" size="icon">
                        <a href={project.github} target="_blank" rel="noopener noreferrer" title="View on GitHub">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
