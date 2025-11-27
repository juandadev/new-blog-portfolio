import SocialMediaContainer from '@/components/SocialMediaContainer/SocialMediaContainer';
import React from 'react';
import Image from 'next/legacy/image';
import TextType from '@/components/animations/TextType';
import FadeContent from '@/components/animations/FadeContent';

export default function HeroSection() {
  return (
    <section className="flex min-h-[80vh] flex-col justify-center md:h-dvh">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="order-2 space-y-6 lg:order-1">
          <div className="space-y-2">
            <TextType
              text={[
                "> hello! i'm juan",
                '> software engineer based in mexico',
              ]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
              className="text-primary font-mono text-sm tracking-wider"
            />
            <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl lg:text-6xl">
              I build things
              <br />
              <span className="from-primary to-accent bg-gradient-to-r bg-clip-text text-transparent">
                for the web
              </span>
            </h1>
          </div>
          <p className="text-muted-foreground max-w-md text-lg leading-relaxed">
            Crafting digital experiences with clean code and thoughtful design.
          </p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Currently @</span>
            <a
              href="https://neumo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-accent decoration-primary/50 hover:decoration-accent underline underline-offset-4 transition-colors"
            >
              Neumo
            </a>
            <span className="text-muted-foreground">— Software Engineer</span>
          </div>
          <div className="pt-4">
            <SocialMediaContainer />
          </div>
        </div>
        <div className="relative order-1 flex justify-center lg:order-2 lg:justify-end">
          <div className="relative">
            <div className="from-primary/20 via-accent/20 to-primary/20 absolute -inset-4 rounded-2xl bg-gradient-to-r blur-2xl" />
            <FadeContent
              blur={true}
              duration={1500}
              easing="ease-out"
              initialOpacity={0}
            >
              <div className="border-border relative h-80 w-64 overflow-hidden rounded-xl border md:h-96 md:w-80">
                <Image
                  src="/juan.webp"
                  alt="Juan Martinez"
                  layout="fill"
                  className="object-cover"
                  priority
                />
                <div className="from-background/60 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
              </div>
            </FadeContent>
            <div className="border-primary/30 absolute -right-2 -bottom-2 -z-10 h-24 w-24 rounded-xl border" />
            <div className="border-accent/30 absolute -top-2 -left-2 -z-10 h-16 w-16 rounded-xl border" />
          </div>
        </div>
      </div>
    </section>
  );
}
