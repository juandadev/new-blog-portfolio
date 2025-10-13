import React from 'react';
import DarkVeil from '@/components/DarkVeil/DarkVeil';
import { Heading } from '@/components/ui/Heading';
import { Typography } from '@/components/Typography/Typography';
import LogoLoop from '@/components/animations/LogoLoop/LogoLoop';
import ReactIcon from '@/icons/ReactIcon';
import NextIcon from '@/icons/NextIcon';
import TypescriptIcon from '@/icons/TypescriptIcon';
import TailwindIcon from '@/icons/TailwindIcon';
import NodejsIcon from '@/icons/NodejsIcon';
import ShadcnIcon from '@/icons/ShadcnIcon';
import DatabuddyIcon from '@/icons/DatabuddyIcon';
import V0Icon from '@/icons/V0Icon';
import VercelIcon from '@/icons/VercelIcon';
import PostgresqlIcon from '@/icons/PostgresqlIcon';
import PrismaormIcon from '@/icons/PrismaormIcon';
import SupabaseIcon from '@/icons/SupabaseIcon';
import GradientBlinds from '@/components/backgrounds/GradientBlinds/GradientBlinds';
import { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import { ExternalLinkIcon } from 'lucide-react';
import { V0_LINK } from '@/constants/ui';

export const metadata: Metadata = {
  title: 'About Juandadev – Frontend Developer & Creator',
  description:
    'I’m Juan Daniel Martínez (Juandadev), a frontend developer passionate about creating modern web experiences with React, Next.js, and thoughtful design. Learn more about my journey and work.',
  keywords: [
    'frontend developer',
    'React developer',
    'Next.js developer',
    'web developer portfolio',
    'software engineer',
    'about Juandadev',
  ],
  alternates: {
    canonical: 'https://juanda.dev/about',
  },
  openGraph: {
    title: 'About Juandadev – Frontend Developer & Creator',
    description:
      'Discover who Juandadev is, a web developer and creative builder focused on crafting elegant and performant digital experiences.',
    url: 'https://juanda.dev/about',
    siteName: 'Juanda.dev',
    locale: 'en_US',
    type: 'profile',
  },
  twitter: {
    card: 'summary',
    title: 'About Juandadev',
    description:
      'Frontend developer with a love for React, design systems, and clean interfaces. Get to know my story.',
    creator: '@juandadotdev',
  },
} as const;

const EXPERIENCE = [
  {
    id: 1,
    role: 'Software Engineer',
    company: 'GlobalLogic',
    period: '2023 - Present',
    description:
      'Building scalable UI components and payment integrations using React, TypeScript, and modern web tooling.',
  },
  {
    id: 2,
    role: 'Freelance Web Developer',
    period: '2019 - Present',
    description:
      'Designing and building custom websites and systems for small businesses using React, Next.js, Node.js and PHP.',
  },
  {
    id: 3,
    role: 'Web UI Developer',
    company: 'Globant',
    period: '2021 - 2023',
    description:
      'Contributed to an e-commerce, implementing reusable UI patterns and improving cross-team development workflows.',
  },
  {
    id: 4,
    role: 'Web Developer',
    company: 'INAD',
    period: '2020 - 2021',
    description:
      'Developed and maintained web portals; modernized legacy views, improved UX, and automated processes with Zapier.',
  },
];

const TECHNOLOGIES = [
  {
    node: <ReactIcon size={40} className="text-white" />,
    title: 'React',
    href: 'https://react.dev',
  },
  {
    node: <NextIcon size={40} />,
    title: 'Next.js',
    href: 'https://nextjs.org',
  },
  {
    node: <TypescriptIcon size={40} className="text-white" />,
    title: 'TypeScript',
    href: 'https://www.typescriptlang.org',
  },
  {
    node: <TailwindIcon size={40} className="text-white" />,
    title: 'Tailwind CSS',
    href: 'https://tailwindcss.com',
  },
  {
    node: <NodejsIcon size={40} />,
    title: 'Node.js',
    href: 'https://nodejs.org',
  },
  {
    node: <PostgresqlIcon size={40} className="text-white" />,
    title: 'PostgreSQL',
    href: 'https://www.postgresql.org',
  },
  {
    node: <PrismaormIcon size={40} className="text-white" />,
    title: 'Prisma ORM',
    href: 'https://www.prisma.io',
  },
  {
    node: <SupabaseIcon size={40} className="text-white" />,
    title: 'Supabase',
    href: 'https://supabase.com',
  },
  {
    node: <V0Icon size={40} className="text-white" />,
    title: 'v0',
    href: 'https://v0.dev?via=juan-daniel-martinez',
  },
  {
    node: <VercelIcon size={40} className="text-white" />,
    title: 'Vercel',
    href: 'https://vercel.com',
  },
  {
    node: <ShadcnIcon size={40} className="text-white" />,
    title: 'Shadcn/ui',
    href: 'https://ui.shadcn.com',
  },
  {
    node: <DatabuddyIcon size={40} className="text-white" />,
    title: 'Databuddy',
    href: 'https://www.databuddy.cc',
  },
];

const experienceYears = new Date().getFullYear() - 2019;

export default function AboutPage() {
  return (
    <div className="w-full">
      <div className="absolute top-0 left-0 h-[400px] w-full md:h-[460px]">
        <GradientBlinds
          gradientColors={['#e60076', '#c800de']}
          angle={20}
          noise={0.5}
          blindCount={16}
          blindMinWidth={60}
          spotlightRadius={0.5}
          spotlightSoftness={1}
          spotlightOpacity={1}
          mouseDampening={0.15}
          distortAmount={0}
          shineDirection="left"
          mixBlendMode="lighten"
          className="hidden lg:block"
        />
        <DarkVeil
          hueShift={272}
          noiseIntensity={0.14}
          className="block lg:hidden"
        />
      </div>
      <section className="relative flex items-center justify-center overflow-hidden">
        <div className="relative container mx-auto my-20">
          <div className="mx-auto space-y-6 text-center">
            <h1 className="text-5xl leading-tight font-bold text-balance md:text-6xl lg:text-7xl">
              About <span className="text-primary">Me</span>
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed text-pretty md:text-2xl">
              Building the web, one component at a time
            </p>
          </div>
        </div>
      </section>
      <section className="mx-auto px-6">
        <div className="space-y-12">
          <div className="space-y-8">
            <div className="text-muted-foreground space-y-6 text-lg leading-relaxed">
              <p>
                I&apos;m Juan Daniel Martínez, a software engineer who loves
                bringing ideas to life through code. For the past{' '}
                {experienceYears} years, I’ve been building web experiences that
                blend clean design, performance, and a touch of personality
                using React, Next.js, and TypeScript.
              </p>
              <p>
                What drives me is curiosity, exploring how small details can
                make interfaces feel intuitive, alive, and meaningful. Whether
                I’m crafting a feature for production or experimenting with side
                projects, I’m always chasing that moment when technology feels
                effortless and human.
              </p>
            </div>
            <div className="pt-8">
              <Heading
                level={2}
                overrideClassName="font-heading text-foreground mb-6 text-2xl font-bold md:text-3xl"
              >
                Skills & Technologies
              </Heading>
              <div className="relative overflow-hidden">
                <LogoLoop
                  logos={TECHNOLOGIES}
                  speed={50}
                  direction="left"
                  logoHeight={60}
                  gap={60}
                  pauseOnHover
                  scaleOnHover
                  fadeOut
                  fadeOutColor="#000000"
                  ariaLabel="Skills & Technologies"
                  className="mx-auto max-w-[300px] md:max-w-[700px] lg:max-w-[900px]"
                />
              </div>
            </div>
            <div className="pt-8">
              <Heading
                level={2}
                overrideClassName="font-heading text-foreground mb-6 text-2xl font-bold md:text-3xl"
              >
                Experience
              </Heading>
              <div className="space-y-8">
                {EXPERIENCE.map((job) => (
                  <div key={job.id} className="space-y-2">
                    <Heading
                      level={3}
                      overrideClassName="font-heading text-foreground text-xl font-semibold"
                    >
                      {job.role}
                    </Heading>
                    <Typography overrideClassName="text-muted-foreground">
                      {job.company && `${job.company} •`} {job.period}
                    </Typography>
                    <Typography overrideClassName="text-muted-foreground leading-relaxed">
                      {job.description}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8">
          <h2 className="font-heading text-foreground mb-4 text-2xl font-semibold md:text-3xl">
            Support My Work
          </h2>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              If you find my content helpful and want to support my work,
              consider trying out v0 by Vercel. I&apos;m a v0 ambassador, and
              this site was built using it for design inspiration.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Full transparency: The link below is my referral link. If you sign
              up through it, I may receive a commission at no extra cost to you.
              I only recommend tools I genuinely use and believe in.
            </p>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="gap-2 bg-transparent"
            >
              <a href={V0_LINK} target="_blank" rel="noopener noreferrer">
                Try v0 (Referral Link)
                <ExternalLinkIcon className="size-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
