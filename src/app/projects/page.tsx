import React from 'react';
import { Heading } from '@/components/ui/Heading';
import { Typography } from '@/components/Typography/Typography';
import ProjectList from '@/components/ProjectList/ProjectList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Featured Web Projects & Experiments – Juandadev',
  description:
    'Discover my collection of personal web development projects built with React, Next.js, and modern technologies. From creative tools to technical experiments, each project reflects my growth, curiosity, and passion for building digital experiences.',
  keywords: [
    'web projects',
    'frontend developer portfolio',
    'Next.js projects',
    'React developer',
    'creative coding',
    'personal projects',
    'Juandadev portfolio',
  ],
  alternates: {
    canonical: 'https://juanda.dev/projects',
  },
  openGraph: {
    title: 'Featured Web Projects & Experiments – Juandadev',
    description:
      'Explore Juandadev’s featured web projects — creative apps and open-source experiments built with React, Next.js, and TypeScript.',
    url: 'https://juanda.dev/projects',
    siteName: 'Juanda.dev',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Featured Projects by Juandadev',
    description:
      'A curated showcase of my favorite web projects — a mix of creativity, design, and clean code. Take a look!',
    creator: '@juandadotdev',
  },
} as const;

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
