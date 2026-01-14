import React from 'react';
import { fetchTools } from '@/services/tool-server';
import AffiliateBanner from '@/components/views/v0-labs/AffiliateBanner';
import V0AmbassadorBadge from '@/components/views/v0-labs/V0AmbassadorBadge';
import V0ProjectCard from '@/components/views/v0-labs/V0ProjectCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'v0 Labs',
  description:
    'Experiments and projects built with v0 by Vercel. Vibe-coding ideas into reality. Browse apps and utilities created using AI-assisted development.',
  keywords: [
    'v0',
    'v0 by Vercel',
    'v0 labs',
    'v0 experiments',
    'AI development',
    'vibe coding',
    'React components',
    'Next.js apps',
    'v0 ambassador',
    'Juan Martinez',
  ],
  alternates: {
    canonical: 'https://juanda.dev/tools',
  },
  openGraph: {
    title: 'v0 Labs – Juan Martinez',
    description:
      'Experiments and projects built with v0 by Vercel. Vibe-coding ideas into reality.',
    url: 'https://juanda.dev/tools',
    siteName: 'Juanda.dev',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'v0 Labs – Juan Martinez',
    description:
      'Experiments and projects built with v0 by Vercel. Vibe-coding ideas into reality.',
    creator: '@juandadotdev',
  },
};

export const dynamic = 'force-static';

export default async function ToolsPage() {
  const tools = await fetchTools();

  return (
    // TODO: Add featured projects and pagination component
    <>
      <div className="space-y-4">
        <V0AmbassadorBadge />
        <AffiliateBanner />
      </div>
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <h2 className="text-foreground text-xl font-semibold">
            all experiments
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools?.map((tool) => (
            <V0ProjectCard key={`tool-${tool.id}`} tool={tool} />
          ))}
        </div>
      </section>
    </>
  );
}
