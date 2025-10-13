import React from 'react';
import { Heading } from '@/components/ui/Heading';
import { Separator } from '@/components/ui/Separator';
import PostList from '@/components/PostList/PostList';
import Link from '@/components/ui/Link';
import ProjectList from '@/components/ProjectList/ProjectList';
import Hero from '@/components/Hero/Hero';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/Typography/Typography';
import { ExternalLinkIcon, SparklesIcon } from 'lucide-react';
import { V0_LINK } from '@/constants/ui';

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <Hero />
      <section className="bg-background border-b border-white/10">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <SparklesIcon className="h-6 w-6 text-pink-600" />
            </div>
            <div className="flex-1">
              <h2 className="font-heading text-foreground text-lg font-semibold sm:text-xl">
                Built with v0 by Vercel
              </h2>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed sm:text-base">
                I&apos;m a v0 ambassador and this site was built using v0&apos;s
                AI-powered development platform for design inspiration. If
                you&apos;d like to support my work, you can{' '}
                <Link
                  href={V0_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-pink-600 underline decoration-pink-600/30 underline-offset-4 transition-colors hover:text-pink-500 hover:decoration-pink-500/50"
                >
                  try v0 using my referral link
                  <ExternalLinkIcon className="h-3 w-3" />
                </Link>{' '}
                (yes, it&apos;s a referral link, full transparency).
              </p>
            </div>
          </div>
        </div>
      </section>
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
