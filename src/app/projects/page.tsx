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
    <div className={'flex flex-col gap-300'}>
      <div className={'gap-075 flex flex-col'}>
        <Heading level={2} decoration={2}>
          Mis Proyectos
        </Heading>
        <Typography>
          Aquí comparto algunas de las herramientas, apps y experimentos web que
          he construido con cariño y obsesión por los detalles. Todos estos
          proyectos han sido una forma de aprender, resolver problemas reales o
          simplemente divertirme creando cosas desde cero. Si alguno te
          interesa, ¡échale un ojo al proceso detrás de cada uno!
        </Typography>
      </div>
      <Separator />
      <ProjectList />
    </div>
  );
}
