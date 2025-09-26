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
        <Heading level={2} preset={1} className="text-center">
          Featured <span className="text-gradient">Projects</span>
        </Heading>
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
        <Heading level={2} preset={1} className="text-center">
          Latest <span className="text-gradient">Blog Posts</span>
        </Heading>
        <Typography className="mx-auto max-w-2xl text-center">
          Sharing knowledge, experiences, and insights from my journey as a
          frontend dev. From technical deep-dives to gaming-inspired design
          patterns.
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
