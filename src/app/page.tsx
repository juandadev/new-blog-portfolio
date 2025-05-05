import React from 'react';
import { Heading } from '@/components/ui/Heading';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { SOCIAL_MEDIA_LINKS } from '@/lib/constants';
import { Separator } from '@/components/ui/Separator';
import { Callout } from '@/components/ui/Callout';

export default function Home() {
  const renderSocialMediaLinks = () => {
    return SOCIAL_MEDIA_LINKS.map(({ href, label, icon }) => (
      <Button
        className={
          'border border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900'
        }
        variant={'icon'}
        size={'icon'}
        key={href}
        asChild
      >
        <Link
          href={href}
          target={'_blank'}
          rel={'noopener noreferrer'}
          aria-label={label}
        >
          {icon()}
        </Link>
      </Button>
    ));
  };

  return (
    <div className={'flex flex-col gap-400'}>
      <div className="flex flex-col gap-300">
        <Heading level={1} preset={2} decoration={1}>
          ¡Hola! Soy Juanda 👋
        </Heading>
        <p className={'text-preset-7'}>
          Desarrollador frontend con años de bugs encima y aún así con ganas de
          seguir aprendiendo. En este rincón comparto lo que voy construyendo,
          desde proyectos serios hasta ideas que nacieron a las 2 a.m. con un
          café en la mano (o un mando en la otra 🎮).
        </p>
        <p className={'text-preset-7'}>
          Este blog existe para llevar registro de lo que aprendo, evitar que se
          me olvide cómo resolví algo, y quizá ayudarte a ti también en el
          proceso. Si te interesa el desarrollo web, los experimentos con React,
          y uno que otro desahogo técnico, estás en el lugar correcto.
          Bienvenido a mi caos organizado! 😄
        </p>
        <div className={'flex gap-150'}>{renderSocialMediaLinks()}</div>
      </div>
      <Separator />
      <div className={'flex flex-col gap-400'}>
        <Heading level={2} preset={2} decoration={2}>
          Últimos Posts
        </Heading>
        <Callout>Próximamente...</Callout>
      </div>
    </div>
  );
}
