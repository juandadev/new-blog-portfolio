import React from 'react';
import { Heading } from '@/components/ui/Heading';
import { Separator } from '@/components/ui/Separator';
import PostList from '@/components/PostList/PostList';
import Link from '@/components/ui/Link';
import ProjectList from '@/components/ProjectList/ProjectList';
import Hero from '@/components/Hero/Hero';

export default function Home() {
  return (
    <div className={'flex flex-col gap-8'}>
      <Hero />
      <div className={'flex flex-col gap-8'}>
        <div className={'flex items-center justify-between'}>
          <Heading level={2} preset={2}>
            Proyectos Destacados
          </Heading>
          <Link className={'hyperlink'} href={'/projects'}>
            Ver todos los proyectos
          </Link>
        </div>
        <ProjectList withLimit />
      </div>
      <Separator />
      <div className={'flex flex-col gap-8'}>
        <Heading level={2} preset={2}>
          Últimos Posts
        </Heading>
        <PostList withLimit />
        <Link className={'hyperlink'} href={'/blog'}>
          Ver más posts
        </Link>
      </div>
    </div>
  );
}
