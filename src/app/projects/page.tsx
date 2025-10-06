import React from 'react';
import { Heading } from '@/components/ui/Heading';
import { Typography } from '@/components/Typography/Typography';
import { Separator } from '@/components/ui/Separator';
import ProjectList from '@/components/ProjectList/ProjectList';

export const metadata = {
  title: 'Proyectos destacados – Juandadev',
  description:
    'Explora los proyectos personales que he creado como desarrollador web. Desde herramientas útiles hasta experimentos creativos, cada uno refleja mi proceso, aprendizajes y pasión por el desarrollo.',
  alternates: {
    canonical: 'https://juanda.dev/blog',
  },
  openGraph: {
    title: 'Proyectos destacados – Juandadev',
    description:
      'Explora los proyectos personales que he creado como desarrollador web. Desde herramientas útiles hasta experimentos creativos, cada uno refleja mi proceso, aprendizajes y pasión por el desarrollo.',
    url: 'https://juanda.dev/projects',
    siteName: 'Juanda.dev',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Proyectos destacados – Juandadev',
    description:
      'Algunos de los proyectos personales que he creado con pasión, código y un toque de diseño bonito. ¡Descúbrelos!',
    creator: '@juandadotdev',
  },
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <Heading level={1} className="text-5xl md:text-6xl">
          All Projects
        </Heading>
        <Typography className="text-muted-foreground text-lg leading-relaxed text-pretty">
          A comprehensive collection of my work spanning web development, design
          systems, and creative tools.
        </Typography>
      </div>
      <Separator />
      <ProjectList type="list" />
    </div>
  );
}
