import Image from 'next/image';
import { projectsData } from '@/lib/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, Link as LinkIcon } from 'lucide-react';

export default function Projects() {
  const getStatusColor = (status: 'Production' | 'Completed' | 'Active') => {
    switch (status) {
      case 'Production': return 'bg-green-500';
      case 'Completed': return 'bg-blue-500';
      case 'Active': return 'bg-yellow-500';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectsData.map((project) => (
          <Card key={project.title} className="flex flex-col">
            <CardHeader>
              <div className="relative mb-4 h-40 w-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                  data-ai-hint={`${project.category} technology`}
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.category}</CardDescription>
                </div>
                 <Badge variant="outline" className="flex items-center gap-2 shrink-0">
                    <span className={`h-2 w-2 rounded-full ${getStatusColor(project.status)}`}></span>
                    {project.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => <Badge key={tech} variant="secondary">{tech}</Badge>)}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex w-full justify-end gap-2">
                {project.url && (
                  <Button asChild variant="outline" size="sm">
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      <LinkIcon className="mr-2 h-4 w-4" />
                      Visit
                    </a>
                  </Button>
                )}
                {project.github && (
                  <Button asChild variant="outline" size="sm">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
