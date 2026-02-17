import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { VaultProject, VaultProjectCategory } from '@/types/vault';
import { cn } from '@/lib/utils';
import FigmaIcon from '@/icons/FigmaIcon';

const CATEGORY_CONFIG: Record<
  VaultProjectCategory,
  { label: string; className: string }
> = {
  [VaultProjectCategory.web_app]: {
    label: 'Web App',
    className: 'bg-cyan-900/80 text-cyan-100',
  },
  [VaultProjectCategory.mobile_app]: {
    label: 'Mobile App',
    className: 'bg-purple-900/80 text-purple-100',
  },
  [VaultProjectCategory.landing_page]: {
    label: 'Landing Page',
    className: 'bg-pink-900/80 text-pink-100',
  },
  [VaultProjectCategory.dashboard]: {
    label: 'Dashboard',
    className: 'bg-blue-900/80 text-blue-100',
  },
  [VaultProjectCategory.ui_components]: {
    label: 'UI Components',
    className: 'bg-green-900/80 text-green-100',
  },
  [VaultProjectCategory.branding]: {
    label: 'Branding',
    className: 'bg-orange-900/80 text-orange-100',
  },
  [VaultProjectCategory.other]: {
    label: 'Other',
    className: 'bg-zinc-800/80 text-zinc-100',
  },
};

interface VaultProjectCardProps {
  project: VaultProject;
  featured?: boolean;
  className?: string;
}

export function VaultProjectCard({
  project,
  featured = false,
  className,
}: VaultProjectCardProps) {
  const category = CATEGORY_CONFIG[project.category];

  return (
    <div
      className={cn(
        'group border-border bg-card relative flex flex-col justify-between overflow-hidden rounded-lg border transition-all duration-300',
        'hover:border-primary/50 hover:shadow-primary/5 hover:shadow-xl',
        featured && 'md:col-span-2',
        className
      )}
    >
      <div
        className={cn('relative aspect-[4/3]', featured && 'md:aspect-[16/9]')}
      >
        <Image
          src={project.thumbnail || '/placeholder.svg'}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500"
          unoptimized
        />
        <div className="from-background/90 via-background/40 absolute inset-0 bg-gradient-to-t to-transparent" />
      </div>
      <div className="space-y-2 p-4">
        <div className="flex items-center gap-2">
          <span className="text-primary font-mono text-xs">{project.year}</span>
          <span
            className={cn(
              'rounded px-1.5 py-0.5 font-mono text-xs',
              category.className
            )}
          >
            {category.label}
          </span>
        </div>
        <h3 className="text-foreground leading-tight font-semibold">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {project.description}
        </p>
        <Link
          href={project.figmaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary/80 inline-flex items-center gap-1.5 font-mono text-xs transition-colors hover:underline"
        >
          <FigmaIcon size={12} />
          view in figma
        </Link>
      </div>
    </div>
  );
}
