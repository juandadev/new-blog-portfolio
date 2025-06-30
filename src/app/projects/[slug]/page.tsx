import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { CalendarIcon, ExternalLinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from '@/components/ui/Link';
import GitHubIcon from '@/icons/GitHubIcon';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Heading } from '@/components/ui/Heading';
import { Typography } from '@/components/Typography/Typography';
import { fetchProject, fetchProjectSlugs } from '@/services/project-server';
import { notFound } from 'next/navigation';
import { getFormattedDate } from '@/lib/utils';
import { PROJECT_APPLICATION_TYPE } from '@/constants/ui';
import MarkdownRenderer from '@/components/MarkdownRenderer/MarkdownRenderer';
import { Separator } from '@/components/ui/Separator';

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 86400; // 1 day
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = (await fetchProjectSlugs()) || [];

  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await fetchProject(slug);

  if (!project) {
    return notFound();
  }

  const formattedDate = getFormattedDate(project.date, 'LLLL yyyy');
  const applicationType = PROJECT_APPLICATION_TYPE[project.applicationType];
  const badgeColors = applicationType.color;

  return (
    <div className="mx-auto max-w-4xl px-4 pb-8 md:pb-12">
      <article className="space-y-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <Badge
              className={`${badgeColors.bg} ${badgeColors.text} ${badgeColors.hover}`}
            >
              {`${applicationType.emoji} ${applicationType.label}`}
            </Badge>
            <Heading level={1}>{project.postTitle}</Heading>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Avatar className={'rounded-full'}>
                  <AvatarImage src="https://github.com/juandadev.png" />
                  <AvatarFallback>JM</AvatarFallback>
                </Avatar>
                <Typography preset={9}>Juan Daniel Martínez</Typography>
              </div>
              <div className="flex items-center space-x-1">
                <CalendarIcon size={16} />
                <Typography preset={9}>{formattedDate}</Typography>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLinkIcon className="mr-2 h-4 w-4" />
                Ver Demo
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon className="mr-2 h-4 w-4" />
                Ver Código
              </Link>
            </Button>
          </div>
        </div>
        <div className="space-y-3">
          <Image
            src={project.coverImage}
            alt="Prototipo de TaskFlow mostrando el dashboard principal con lista de proyectos y tareas"
            width={800}
            height={400}
            className="w-full rounded-xl border border-gray-200 object-cover"
          />
        </div>
        <div className={'mb-200 flex flex-col gap-150'}>
          <MarkdownRenderer content={project.content} />
        </div>
        <Separator />
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild>
            <Link
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLinkIcon className="mr-2 h-5 w-5" />
              Explorar Demo en Vivo
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon className="mr-2 h-5 w-5" />
              Ver Código Fuente
            </Link>
          </Button>
        </div>
      </article>
    </div>
  );
}
