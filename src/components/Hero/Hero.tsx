import SocialMediaContainer from '@/components/SocialMediaContainer/SocialMediaContainer';
import React from 'react';
import DarkVeil from '@/components/DarkVeil/DarkVeil';
import BlurText from '@/components/animations/BlurText';
import SplitText from '@/components/animations/SplitText';
import Image from 'next/legacy/image';
import FadeContent from '@/components/animations/FadeContent';

const experienceYears = new Date().getFullYear() - 2019;

export default function Hero() {
  return (
    <div className="grid h-[calc(100svh-144px)] min-h-[610px] grid-cols-1 items-end gap-4 pb-24 md:h-[calc(100svh-192px)] md:grid-cols-[1fr_auto] md:pb-20 lg:pb-32">
      <div className="flex flex-col gap-6">
        <div className="absolute top-0 left-0 -z-1 h-full w-full">
          <DarkVeil hueShift={272} noiseIntensity={0.14} />
        </div>
        <div>
          <BlurText
            as="h1"
            text="Hi! I'm Juan"
            delay={150}
            animateBy="words"
            direction="top"
            className="font-reddit text-5xl leading-tight font-bold text-balance text-neutral-50 md:text-6xl lg:text-7xl"
          />
          <BlurText
            as="h1"
            text="Software Engineer"
            delay={200}
            animateBy="words"
            direction="top"
            className="font-reddit text-5xl leading-tight font-bold text-balance md:text-6xl lg:text-7xl"
            textGradientClass="text-gradient"
          />
        </div>
        <SplitText
          text={`A guy from Mexico 🇲🇽 with ${experienceYears}+ years specializing in frontend development with React & Next.js, building modern, performant, and scalable web applications. I love sharing knowledge through my blog and social media.`}
          className="font-dm text-muted-foreground max-w-2xl text-lg leading-relaxed text-pretty md:text-xl"
          delay={200}
          duration={2}
          ease="power3.out"
          splitType="lines"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="left"
        />
        <SocialMediaContainer animated />
      </div>
      <div className="hidden md:block">
        <FadeContent
          blur={true}
          duration={1500}
          easing="ease-out"
          initialOpacity={0}
        >
          <Image
            src="/juan.webp"
            alt="Juan Daniel picture"
            width={350}
            height={422}
            unoptimized
            priority
            className="glow-pink w-[300px] rounded-3xl object-cover xl:w-[350px]"
          />
        </FadeContent>
      </div>
    </div>
  );
}
