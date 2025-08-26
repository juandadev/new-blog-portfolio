import React from 'react';
import { Heading } from '@/components/ui/Heading';
import { Separator } from '@/components/ui/Separator';
import PostList from '@/components/PostList/PostList';
import Link from '@/components/ui/Link';
import ProjectList from '@/components/ProjectList/ProjectList';
import Hero from '@/components/Hero/Hero';
import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <Hero />
      <div className="flex flex-col gap-8">
        <Heading level={2} preset={1} className="text-center">
          Featured <span className="text-gradient">Projects</span>
        </Heading>
        <ProjectList withLimit />
        <Button
          variant="outline"
          size="lg"
          asChild
          className="w-fit self-center"
        >
          <Link href="/projects">View all projects</Link>
        </Button>
      </div>
      <Separator />
      <div className="flex flex-col gap-8">
        <Heading level={2} preset={2}>
          Últimos Posts
        </Heading>
        <PostList withLimit />
        <Link className="hyperlink" href="/blog">
          Ver más posts
        </Link>
      </div>
    </div>
  );
}
