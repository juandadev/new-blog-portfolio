import React from 'react';
import { Heading } from '@/components/ui/Heading';
import { Typography } from '@/components/Typography/Typography';
import SubscribeForm from '@/app/newsletter/SubscribeForm';

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
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Newsletter de Juandadev',
    description:
      'Suscríbete a mi newsletter para recibir artículos, tutoriales y tips de desarrollo web directamente en tu correo.',
  },
};

export default function NewsletterPage() {
  return (
    <div className={'flex flex-col gap-300'}>
      <div className={'flex flex-col gap-200'}>
        <Heading level={1} preset={2}>
          Newsletter
        </Heading>
        <Typography>
          ¿Quieres enterarte de mis últimos posts, tutoriales de código y una
          que otra aventura personal? Suscríbete a mi newsletter. Es la forma
          más fácil de no perderte nada nuevo y recibir de vez en cuando tips o
          ideas que valen la pena compartir.
        </Typography>
        <Typography preset={5}>
          Me encantaría que te unas a esta travesía y también conocer un poco de
          la tuya.
        </Typography>
      </div>
      <SubscribeForm />
    </div>
  );
}
