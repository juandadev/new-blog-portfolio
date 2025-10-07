import React from 'react';
import { Heading } from '@/components/ui/Heading';
import { Typography } from '@/components/Typography/Typography';
import SocialMediaContainer from '@/components/SocialMediaContainer/SocialMediaContainer';
import { AspectRatio } from '@/components/ui/AspectRatio';
import Image from "next/legacy/image";

export const metadata = {
  title: 'Acerca De Mí – Juandadev',
  description:
    'Conoce quién soy, mi experiencia como desarrollador frontend y mi enfoque al crear productos digitales con React y Next.js.',
  alternates: {
    canonical: 'https://juanda.dev/about',
  },
  openGraph: {
    title: 'Acerca De Mí – Juandadev',
    description:
      'Conoce quién soy, mi experiencia como desarrollador frontend y mi enfoque al crear productos digitales con React y Next.js.',
    url: 'https://juanda.dev/about',
    siteName: 'Juanda.dev',
    locale: 'es_MX',
    type: 'profile',
  },
  twitter: {
    card: 'summary',
    title: 'Acerca De Mí – Juandadev',
    description:
      'Conoce quién soy, mi experiencia como desarrollador frontend y mi enfoque al crear productos digitales con React y Next.js.',
    creator: '@juandadotdev',
  },
};

export default function AboutPage() {
  return (
    <div className={'flex flex-col gap-300'}>
      <Heading level={1} preset={2}>
        Acerca de Mí
      </Heading>
      <Typography>
        ¡Hola, Soy Juanda! Desde siempre me ha gustado resolver problemas,
        construir cosas (sí, incluso antes de saber programar, ya lo hacía con
        Legos), y entender cómo funcionan los sistemas. Todo eso me llevó
        directo al mundo del desarrollo frontend, donde descubrí que hay algo
        muy especial en ver una idea tomar forma en el navegador: desde un
        layout minimalista hasta una interfaz compleja que cobra vida con cada
        línea de código. Trabajo desde hace 5 añosde manera profesional con
        React, TypeScript y toda esa onda moderna del frontend, siempre buscando
        aprender algo nuevo (y de paso, evitar romper producción).
      </Typography>
      <Typography>
        Pero no todo es código, fuera de eso tengo más obsesiones:
      </Typography>
      <ul className={'ml-6 list-disc [&>li]:mt-2'}>
        <li>
          <Typography>
            <span className={'text-preset-7-semi-bold'}>🧱 Los Legos:</span> Sí,
            tenía más llenos los estantes antes de descubrir mi segundo vicio 😅
            construirlos me relaja tanto como refactorizar un componente que
            quedó bonito, y limpiarlos del polvo me estresa tanto como conseguir
            el 100% de coverage en mis unit tests.
          </Typography>
        </li>
        <AspectRatio ratio={9 / 12} className={'bg-muted my-150'}>
          <Image
            className={'rounded-6'}
            alt={'Picture of my lego shelf'}
            src={
              'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/lego-shelf.webp'
            }
            fill
            sizes={'(max-width: 639px) 100vw, 576px'}
            objectFit={'cover'}
          />
        </AspectRatio>
        <li>
          <Typography>
            <span className={'text-preset-7-semi-bold'}>📚 Leer:</span>{' '}
            Últimamente me ha atrapado fuerte. Estoy en la travesía de re-leer
            sagas fantasiosas como{' '}
            <span className={'text-preset-7-italic'}>Harry Potter</span>,{' '}
            <span className={'text-preset-7-italic'}>
              El Señor de los Anillos
            </span>
            , <span className={'text-preset-7-italic'}>Juego de Tronos</span>,
            pero mi favorita absoluta:{' '}
            <span className={'text-preset-7-italic'}>
              Los Juegos del Hambre
            </span>{' '}
            (no lo he podido superar desde que salió{' '}
            <span className={'text-preset-7-italic'}>
              Amanecer en la cosecha
            </span>
            ). También me clavo con novelas de crimen, como las de{' '}
            <span className={'text-preset-7-italic'}>Mario Puzo</span>, que son
            perfectas cuando quiero drama, traición y frases que suenan como si
            fueran de un commit importante.
          </Typography>
        </li>
        <li>
          <Typography>
            <span className={'text-preset-7-semi-bold'}>🎮 Videojuegos:</span>{' '}
            Aunque ya no juego todo lo que quisiera, siempre encuentro algo que
            me inspire o me recuerde por qué amo el desarrollo de software. Me
            centro más en videojuegos single-player (sí, decidí tener una vida
            tranquila) pero también me puedo perder horas en sandbox y
            simuladores (Stardew Valley siempre tendrás un lugar especial en mi
            corazón ❤️).
          </Typography>
        </li>
      </ul>
      <Typography>
        Cuando se trata de mi espacio de trabajo, hablamos de mi santuario.
        Trabajo en modalidad híbrida, así que le he invertido amor, tiempo y
        varios intentos fallidos de gestión de cables para que todo esté en su
        lugar. Es un espacio que me motiva, me concentra y, de vez en cuando, me
        recuerda que necesito pararme a estirarme.
      </Typography>
      <Typography>
        (Si te interesa ver más detalles sobre mi equipo o cómo lo organizo,
        estoy pensando en hacer una entrada de blog o incluso un video solo para
        esto).
      </Typography>
      <AspectRatio ratio={12 / 9} className={'bg-muted'}>
        <Image
          className={'rounded-6'}
          alt={'Picture of my lego shelf'}
          src={
            'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/setup.webp'
          }
          fill
          sizes={'(max-width: 639px) 100vw, 576px'}
          loading="lazy"
          objectFit={'cover'}
        />
      </AspectRatio>
      <Typography>
        Creé este sitio para compartir lo que aprendo, guardar esas soluciones
        que sé que voy a necesitar en tres meses, y dejar una huella digital que
        refleje quién soy: un dev curioso, constante y con muchas ganas de
        seguir creciendo.
      </Typography>
      <Typography>
        Ojalá algo de lo que encuentres aquí te inspire, te ayude o al menos te
        saque una risa. Gracias por darte una vuelta 🤘
      </Typography>
      <div className={'flex flex-col gap-200'}>
        <Heading level={2} preset={4}>
          Sígueme en mis redes!
        </Heading>
        <SocialMediaContainer />
      </div>
    </div>
  );
}
