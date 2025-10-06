import React from 'react';
import { Heading } from '@/components/ui/Heading';
import { Separator } from '@/components/ui/Separator';
import PostList from '@/components/PostList/PostList';
import Link from '@/components/ui/Link';
import ProjectList from '@/components/ProjectList/ProjectList';
import Hero from '@/components/Hero/Hero';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/Typography/Typography';

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <Hero />
      <div className="flex flex-col gap-8">
        <Heading
          level={2}
          preset={1}
          className="text-center text-4xl font-bold text-balance md:text-5xl"
        >
          Featured <span className="text-gradient">Projects</span>
        </Heading>
        <Typography className="text-muted-foreground mb-8 text-center text-lg leading-relaxed text-pretty">
          A selection of recent work showcasing my expertise in modern web
          development.
        </Typography>
        <ProjectList withLimit />
        <Button
          variant="outline"
          size="lg"
          className="w-fit self-center"
          asChild
        >
          <Link href="/projects">View all projects</Link>
        </Button>
      </div>
      <Separator className="my-14" />
      <div className="flex flex-col gap-8">
        <Heading
          level={2}
          preset={1}
          className="text-center text-4xl font-bold text-balance md:text-5xl"
        >
          Latest <span className="text-gradient">Articles</span>
        </Heading>
        <Typography className="text-muted-foreground mb-8 text-center text-lg leading-relaxed text-pretty">
          Sharing insights, tutorials, and thoughts on web development and
          content creation.
        </Typography>
        <PostList withLimit />
        <Button
          variant="outline"
          size="lg"
          className="w-fit self-center"
          asChild
        >
          <Link href="/blog">View all posts</Link>
        </Button>
      </div>
    </div>
  );
}
