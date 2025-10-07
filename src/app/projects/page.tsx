import React from 'react';
import { Heading } from '@/components/ui/Heading';
import { Typography } from '@/components/Typography/Typography';
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
    <div className="flex flex-col">
      <div className="mb-16 flex flex-col">
        <Heading
          level={1}
          overrideClassName="text-4xl md:text-6xl font-bold mb-4 text-balance"
        >
          All Projects
        </Heading>
        <Typography overrideClassName="text-lg text-muted-foreground text-pretty leading-relaxed">
          A comprehensive collection of my work spanning web development, design
          systems, and creative tools.
        </Typography>
      </div>
      <ProjectList type="list" />
    </div>
  );
}
