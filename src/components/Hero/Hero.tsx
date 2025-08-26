import SocialMediaContainer from '@/components/SocialMediaContainer/SocialMediaContainer';
import React from 'react';
import DarkVeil from '@/components/DarkVeil/DarkVeil';
import { Typography } from '@/components/Typography/Typography';

export default function Hero() {
  return (
    <div className="flex h-screen min-h-[610px] flex-col justify-end pt-24 pb-10 md:pb-20 lg:pb-32">
      <div className="flex flex-col gap-6">
        <div className="absolute top-0 left-0 -z-1 h-full w-full">
          <DarkVeil hueShift={272} noiseIntensity={0.14} />
        </div>
        <h1 className="font-reddit text-5xl leading-tight font-bold text-neutral-50 md:text-6xl lg:text-7xl">
          Hola! soy Juan
          <br />
          <span className="text-gradient">Desarrollador Frontend</span>
        </h1>
        <Typography preset={7}>
          Especializado en React y Next.js con 5 años de experiencia creando
          aplicaciones web modernas y escalables. Me gusta compartir mis
          conocimientos a través de mi blog y redes sociales.
        </Typography>
        <SocialMediaContainer />
      </div>
    </div>
  );
}
