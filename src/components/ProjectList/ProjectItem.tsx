import React from 'react';
import { PreviewProject } from '@/types/project';
import { Button } from '@/components/ui/Button';
import Link from '@/components/ui/Link';
import GitHubIcon from '@/icons/GitHubIcon';
import { ExternalLinkIcon, InfoIcon } from 'lucide-react';

interface ProjectItemProps {
  project: PreviewProject;
  index: number;
}

export default function ProjectItem({ project, index }: ProjectItemProps) {
  return (
    <div key={project.id} className="border-border border-b last:border-0">
      <div className="mb-6 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex-1">
          <div className="mb-3 flex items-center gap-4">
            <span className="text-muted-foreground text-sm">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="text-primary text-sm">
              {new Date(project.date).getFullYear()}
            </span>
            {project.featured && (
              <span className="bg-primary/10 text-primary rounded-md px-2 py-0.5 text-xs">
                Featured
              </span>
            )}
          </div>
          <h3 className="font-reddit mb-3 text-2xl font-bold text-balance md:text-3xl">
            {project.name}
          </h3>
          <p className="text-muted-foreground leading-relaxed text-pretty">
            {project.shortDescription}
          </p>
        </div>
        <div className="flex flex-col gap-2 self-start md:self-auto">
          <Button asChild variant="ghost" size="sm" className="justify-start">
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2"
              preventProgressBar
            >
              <GitHubIcon />
              GitHub
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="justify-start">
            <Link
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2"
              preventProgressBar
            >
              <ExternalLinkIcon />
              Demo
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="justify-start">
            <Link href={`/projects/${project.slug}`} className="gap-2">
              <InfoIcon />
              Details
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="bg-secondary text-secondary-foreground rounded-md px-3 py-1 text-sm"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
