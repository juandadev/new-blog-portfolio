import React from 'react';
import CountUp from '@/components/animations/CountUp';

interface SkillBadgeProps {
  label: string;
}

function SkillBadge({ label }: SkillBadgeProps) {
  return (
    <span className="bg-secondary text-secondary-foreground border-border hover:border-primary/50 cursor-default rounded-md border px-3 py-1 font-mono text-sm transition-colors">
      {label}
    </span>
  );
}

const experienceYears = new Date().getFullYear() - 2019;

export function AboutSection() {
  const skills = [
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'PostgreSQL',
    'CSS',
  ];

  return (
    <section className="space-y-12 py-8">
      <div className="flex items-center gap-4">
        <span className="text-primary font-mono text-sm">02</span>
        <h2 className="text-2xl font-semibold tracking-tight">about</h2>
        <div className="from-border h-px flex-1 bg-gradient-to-r to-transparent" />
      </div>
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-muted-foreground font-mono text-sm tracking-wider uppercase">
              {'// technical_background'}
            </h3>
            <p className="text-foreground leading-relaxed">
              Frontend developer with {experienceYears}+ years building
              production-grade web apps. I specialize in React, Next.js, and
              TypeScript, designing scalable architectures with a strong focus
              on performance and DX. Lately, I&apos;ve been doubling down on
              design as a self-taught path, aiming to blend engineering and
              visual craft into the kind of work I&apos;ve always wanted to
              build.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
              stack.map()
            </h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <SkillBadge key={skill} label={skill} />
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-muted-foreground font-mono text-sm tracking-wider uppercase">
              {'// personal_insights'}
            </h3>
            <p className="text-foreground leading-relaxed">
              Beyond the code, I&apos;m basically powered by coffee, nostalgia,
              and anything that scratches my creative itch. I grew up on Pokémon
              and still love diving into new games, tinkering with LEGO builds,
              and getting lost in worlds that spark imagination. Those same
              vibes influence the stuff I create, colorful, playful, a little
              nerdy, and built with the same curiosity I had as a kid.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Based in the digital realm, working async across time zones.
              Strong advocate for open source and knowledge sharing.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <StatBlock label="years coding" value={`${experienceYears}`} />
            <StatBlock label="projects shipped" value="13" />
          </div>
        </div>
      </div>
    </section>
  );
}

interface StatBlockProps {
  label: string;
  value: string;
}

function StatBlock({ label, value }: StatBlockProps) {
  return (
    <div className="bg-card border-border rounded-lg border p-4">
      <span className="text-primary text-3xl font-bold">
        <CountUp
          from={0}
          to={parseInt(value)}
          separator=","
          direction="up"
          duration={1}
        />
        +
      </span>
      <p className="text-muted-foreground mt-1 font-mono text-xs tracking-wider uppercase">
        {label}
      </p>
    </div>
  );
}
