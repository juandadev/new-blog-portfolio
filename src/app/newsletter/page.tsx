import React from 'react';
import { Heading } from '@/components/ui/Heading';
import { Typography } from '@/components/Typography/Typography';
import SubscribeForm from '@/app/newsletter/SubscribeForm';
import LightRays from '@/components/backgrounds/LightRays/LightRays';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Juandadev Newsletter – Web Dev Tips & Insights',
  description:
    'Join the Juandadev newsletter to receive thoughtful articles, tutorials, and coding insights about React, Next.js, and frontend development directly in your inbox.',
  keywords: [
    'newsletter',
    'web development newsletter',
    'frontend tutorials',
    'React tips',
    'Next.js insights',
    'developer updates',
    'Juandadev',
  ],
  alternates: {
    canonical: 'https://juanda.dev/newsletter',
  },
  openGraph: {
    title: 'Juandadev Newsletter – Frontend Tips & Insights',
    description:
      'Subscribe to receive practical coding advice, project updates, and behind-the-scenes stories from Juandadev.',
    url: 'https://juanda.dev/newsletter',
    siteName: 'Juanda.dev',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Juandadev Newsletter',
    description:
      'Get React, Next.js, and frontend development tips straight to your inbox. No spam, just good dev stuff.',
    creator: '@juandadotdev',
  },
} as const;

export default function NewsletterPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-16 sm:px-6 lg:px-8">
      <div className="absolute top-0 left-0 h-[600px] w-full">
        <LightRays
          raysOrigin="top-center"
          raysColor="#fb64b6"
          raysSpeed={1}
          lightSpread={0.5}
          rayLength={3}
          noiseAmount={0.3}
          distortion={0.05}
          className="custom-rays"
        />
      </div>
      <div className="space-y-4">
        <Heading
          level={1}
          overrideClassName="font-heading text-4xl sm:text-5xl font-bold text-balance"
        >
          Subscribe to the Newsletter
        </Heading>
        <Typography overrideClassName="text-lg text-muted-foreground leading-relaxed">
          Get the latest articles, tutorials, and insights on frontend
          development, React, TypeScript, and web performance delivered straight
          to your inbox. No spam, unsubscribe anytime.
        </Typography>
      </div>
      <SubscribeForm />
    </div>
  );
}
