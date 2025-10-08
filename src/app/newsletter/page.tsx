import React from 'react';
import { Heading } from '@/components/ui/Heading';
import { Typography } from '@/components/Typography/Typography';
import SubscribeForm from '@/app/newsletter/SubscribeForm';
import LightRays from '@/components/backgrounds/LightRays/LightRays';

export const metadata = {
  title: 'Newsletter – Juandadev',
  description:
    'Suscríbete a mi newsletter para recibir artículos, tutoriales y tips de desarrollo web directamente en tu correo.',
  alternates: {
    canonical: 'https://juanda.dev/newsletter',
  },
  openGraph: {
    title: 'Newsletter – Juandadev',
    description:
      'Suscríbete a mi newsletter para recibir artículos, tutoriales y tips de desarrollo web directamente en tu correo.',
    url: 'https://juanda.dev/newsletter',
    siteName: 'Juanda.dev',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Newsletter de Juandadev',
    description:
      'Suscríbete a mi newsletter para recibir artículos, tutoriales y tips de desarrollo web directamente en tu correo.',
    creator: '@juandadotdev',
  },
};

export default function NewsletterPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-16 sm:px-6 lg:px-8">
      <div className="absolute top-0 left-0 h-svh w-full">
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
