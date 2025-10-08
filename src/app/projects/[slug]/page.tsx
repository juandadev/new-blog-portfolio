import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeftIcon, ExternalLinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from '@/components/ui/Link';
import GitHubIcon from '@/icons/GitHubIcon';
import Image from 'next/legacy/image';
import { Heading } from '@/components/ui/Heading';
import { fetchProject, fetchProjectSlugs } from '@/services/project-server';
import { notFound } from 'next/navigation';
import { getFormattedDate } from '@/lib/utils';
import { PROJECT_APPLICATION_TYPE } from '@/constants/ui';
import MarkdownRenderer from '@/components/MarkdownRenderer/MarkdownRenderer';
import { Separator } from '@/components/ui/Separator';
import { Metadata } from 'next';
import PixelBlast from '@/components/backgrounds/PixelBlast/PixelBlast';

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await fetchProject(slug);

  if (!project) {
    return { title: 'Project Not Found – Juandadev' };
  }

  const cleanName = project.name.trim();

  return {
    title: `${cleanName} – Project by Juandadev`,
    description:
      project.shortDescription ||
      `Learn more about ${cleanName}, a project by Juandadev built using ${project.technologies?.join(', ') || 'modern web technologies'}.`,
    keywords: [
      cleanName,
      ...(project.technologies ?? []),
      'web development',
      'Next.js project',
      'React app',
      'frontend engineering',
      'Juandadev',
    ],
    alternates: {
      canonical: `https://juanda.dev/projects/${project.slug}`,
    },
    openGraph: {
      title: `${cleanName} – Project by Juandadev`,
      description: project.shortDescription,
      type: 'article',
      url: `https://juanda.dev/projects/${project.slug}`,
      publishedTime: project.createdAt,
      authors: ['https://juanda.dev/about'],
      tags: [cleanName, ...(project.technologies ?? [])],
      images: project.coverImage
        ? [
            {
              url: project.coverImage,
              width: 1200,
              height: 630,
              alt: `Preview image of ${cleanName}`,
            },
          ]
        : [],
      siteName: 'Juanda.dev',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${cleanName} – Project by Juandadev`,
      description: project.shortDescription,
      images: project.coverImage ? [project.coverImage] : [],
      creator: '@juandadotdev',
    },
  };
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

  const formattedDate = getFormattedDate(project.date, 'yyyy');
  const applicationType = PROJECT_APPLICATION_TYPE[project.applicationType];
  const badgeColors = applicationType.color;

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/projects"
        className="text-muted-foreground hover:text-foreground bg-background relative z-[1] mb-8 inline-flex h-10 items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors"
      >
        <ArrowLeftIcon />
        Back to Projects
      </Link>
      <div className="absolute top-0 left-0 h-[600px] w-full">
        <PixelBlast
          variant="square"
          pixelSize={4}
          color="#fb64b6"
          patternScale={2}
          patternDensity={1}
          pixelSizeJitter={0}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          speed={0.5}
          edgeFade={0.25}
          transparent
        />
      </div>
      <article className="space-y-8">
        <div className="relative z-[1] space-y-6">
          <div className="space-y-4">
            <div className="flex gap-4">
              <span className="bg-background text-primary rounded-md px-2 py-0.5 text-xs">
                {formattedDate}
              </span>
              {project.featured && (
                <span className="bg-background text-primary rounded-md px-2 py-0.5 text-xs">
                  Featured
                </span>
              )}
              <Badge
                className={`${badgeColors.bg} ${badgeColors.text} ${badgeColors.hover}`}
              >
                {`${applicationType.emoji} ${applicationType.label}`}
              </Badge>
            </div>
            <Heading level={1}>{project.postTitle}</Heading>
            <p className="bg-background text-muted-foreground mb-8 translate-x-[-16px] rounded-lg px-4 py-2 text-xl leading-relaxed text-pretty">
              {project.shortDescription}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLinkIcon className="mr-2 h-4 w-4" />
                View Demo
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon className="mr-2 h-4 w-4" />
                View Code
              </Link>
            </Button>
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
        <div className="border-border relative mx-auto aspect-[2/1] w-full overflow-hidden rounded-lg border md:w-[80%]">
          <Image
            src={project.coverImage}
            alt="Project cover image"
            layout="fill"
            className="object-cover"
            priority
          />
        </div>
        <div className="mb-8 flex flex-col gap-4">
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
              Explore Live Demo
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon className="mr-2 h-5 w-5" />
              View Source on GitHub
            </Link>
          </Button>
        </div>
      </article>
    </div>
  );
}
