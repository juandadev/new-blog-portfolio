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
      <div className="flex flex-col">
        <Heading
          level={2}
          overrideClassName="text-4xl md:text-5xl font-bold mb-4 text-balance"
        >
          Featured <span className="text-gradient">Projects</span>
        </Heading>
        <Typography overrideClassName="text-muted-foreground mb-16 text-lg leading-relaxed text-pretty">
          A selection of recent work showcasing my expertise in modern web
          development.
        </Typography>
        <ProjectList withLimit />
        <Button
          variant="outline"
          size="lg"
          className="mt-16 w-fit self-center"
          asChild
        >
          <Link href="/projects">View all projects</Link>
        </Button>
      </div>
      <Separator className="my-14" />
      <div className="flex flex-col">
        <Heading
          level={2}
          overrideClassName="text-4xl md:text-5xl font-bold mb-4 text-balance"
        >
          Latest <span className="text-gradient">Articles</span>
        </Heading>
        <Typography overrideClassName="text-lg text-muted-foreground mb-16 text-pretty leading-relaxed">
          Sharing insights, tutorials, and thoughts on web development and
          content creation.
        </Typography>
        <PostList withLimit />
        <Button
          variant="outline"
          size="lg"
          className="mt-16 w-fit self-center"
          asChild
        >
          <Link href="/blog">View all posts</Link>
        </Button>
      </div>
    </div>
  );
}
