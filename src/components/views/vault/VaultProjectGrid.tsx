import React from 'react';
import { VaultProject, VaultProjectCategory } from '@/types/vault';
import { VaultProjectCard } from './VaultProjectCard';

const CATEGORY_LABELS: Record<VaultProjectCategory, string> = {
  [VaultProjectCategory.web_app]: 'Web Apps',
  [VaultProjectCategory.mobile_app]: 'Mobile Apps',
  [VaultProjectCategory.landing_page]: 'Landing Pages',
  [VaultProjectCategory.dashboard]: 'Dashboards',
  [VaultProjectCategory.ui_components]: 'UI Components',
  [VaultProjectCategory.branding]: 'Branding',
  [VaultProjectCategory.other]: 'Other',
};

const CATEGORY_ORDER: VaultProjectCategory[] = [
  VaultProjectCategory.web_app,
  VaultProjectCategory.mobile_app,
  VaultProjectCategory.landing_page,
  VaultProjectCategory.dashboard,
  VaultProjectCategory.ui_components,
  VaultProjectCategory.branding,
  VaultProjectCategory.other,
];

function getLastItemColSpan(count: number): string {
  const classes: string[] = [];
  const lgRemainder = count % 3;
  const smRemainder = count % 2;

  if (lgRemainder === 1) classes.push('lg:col-span-3');
  else if (lgRemainder === 2) classes.push('lg:col-span-2');

  if (smRemainder === 1) classes.push('sm:col-span-2');

  return classes.join(' ');
}

interface VaultProjectGridProps {
  projects: VaultProject[];
}

export function VaultProjectGrid({ projects }: VaultProjectGridProps) {
  if (projects.length === 0) {
    return (
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">The Work</h2>
        </div>
        <p className="text-muted-foreground text-sm">
          Nothing here yet. Check back soon.
        </p>
      </section>
    );
  }

  const projectsByCategory = CATEGORY_ORDER.reduce<
    Record<string, VaultProject[]>
  >((acc, category) => {
    const items = projects.filter((p) => p.category === category);
    if (items.length > 0) {
      acc[category] = items;
    }
    return acc;
  }, {});

  return (
    <section className="space-y-12">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">The Work</h2>
        <p className="text-muted-foreground text-sm">
          {projects.length} {projects.length === 1 ? 'project' : 'projects'}{' '}
          across {Object.keys(projectsByCategory).length}{' '}
          {Object.keys(projectsByCategory).length === 1
            ? 'category'
            : 'categories'}
        </p>
      </div>

      <div className="space-y-12">
        {Object.entries(projectsByCategory).map(([category, items]) => (
          <div key={category} className="space-y-4">
            <div className="flex items-center gap-3">
              <h3 className="text-muted-foreground font-mono text-sm tracking-wider uppercase">
                {CATEGORY_LABELS[category as VaultProjectCategory]}
              </h3>
              <div className="from-primary/30 h-px flex-1 bg-gradient-to-r to-transparent" />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((project, index) => {
                const isLast = index === items.length - 1;
                return (
                  <VaultProjectCard
                    key={project.id}
                    project={project}
                    featured={project.featured && index === 0}
                    className={isLast ? getLastItemColSpan(items.length) : undefined}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
