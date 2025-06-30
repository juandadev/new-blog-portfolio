import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/Card';
import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';
import { ExternalLinkIcon, StarIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from '@/components/ui/Link';
import GitHubIcon from '@/icons/GitHubIcon';
import { Typography } from '@/components/Typography/Typography';
import { PreviewProject } from '@/types/project';

interface ProjectCardProps {
  project: PreviewProject;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card
      key={project.id}
      className="group pt-0 transition-shadow duration-200 hover:shadow-lg"
    >
      <div className="relative">
        <Image
          src={
            project.coverImage ||
            'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/placeholder.svg'
          }
          alt={`${project.name} cover image`}
          width={590}
          height={200}
          className="h-48 w-full rounded-t-lg object-cover"
        />
        {project.featured && (
          <div className="absolute top-3 right-3">
            <Badge
              variant="secondary"
              className="bg-yellow-100 text-yellow-800"
            >
              <StarIcon className="mr-1 h-3 w-3 fill-current" />
              Destacado
            </Badge>
          </div>
        )}
      </div>
      <CardHeader className="pb-3">
        <CardTitle>
          <Typography
            preset={'7-semi-bold'}
            className={'transition-colors group-hover:text-blue-500'}
          >
            {project.name}
          </Typography>
        </CardTitle>
        <CardDescription>
          <Typography preset={9}>{project.shortDescription}</Typography>
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="mb-4 flex flex-wrap gap-1">
          {project.technologies.slice(0, 3).map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 3 && (
            <Badge variant="outline">+{project.technologies.length - 3}</Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-border flex-1" asChild>
            <Link href={project.demoUrl}>
              <ExternalLinkIcon size={16} />
              Demo
            </Link>
          </Button>
          <Button variant="outline" asChild className={'border-border'}>
            <Link href={project.githubUrl}>
              <GitHubIcon size={16} />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
