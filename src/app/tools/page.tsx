import React from 'react';
import { Button } from '@/components/ui/Button';
import Link from '@/components/ui/Link';
import { ArrowLeftIcon, ExternalLink, Sparkles } from 'lucide-react';
import { fetchTools } from '@/services/tool-server';
import { V0_LINK } from '@/constants/ui';

export default async function ToolsPage() {
  const tools = await fetchTools();

  return (
    <section>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-16">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-2 text-sm transition-colors"
            >
              <ArrowLeftIcon />
              Back to Home
            </Link>
            <h1 className="mb-4 text-4xl font-bold text-balance md:text-6xl">
              Tiny Tools
            </h1>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed text-pretty">
              A collection of small, focused tools I built to solve everyday
              problems. Each one does one thing well.
            </p>

            <div className="border-border/50 bg-muted/20 mb-8 rounded-lg border p-6">
              <div className="flex items-start gap-3">
                <Sparkles className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-muted-foreground mb-3 text-sm leading-relaxed text-pretty">
                    These tools were quickly prototyped with{' '}
                    <Link
                      href={V0_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary inline-flex items-center gap-1 hover:underline"
                    >
                      v0
                      <ExternalLink className="h-3 w-3" />
                    </Link>{' '}
                    to test ideas and create proof-of-concepts with minimal
                    effort. Unlike my{' '}
                    <Link
                      href="/projects"
                      className="text-primary hover:underline"
                    >
                      formal projects
                    </Link>{' '}
                    that involve extensive planning and development, these are
                    quick experiments where I vibe-coded the initial version and
                    added custom functionalities as needed.
                  </p>
                  <p className="text-muted-foreground/80 text-xs">
                    Full disclosure: The v0 link above is a referral link. If
                    you sign up through it, you support my work at no extra cost
                    to you.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {tools?.map((tool) => (
              <article
                key={tool.id}
                className="border-border hover:border-primary/50 rounded-lg border p-6 transition-colors"
              >
                <div className="mb-4 flex items-start gap-4">
                  <div className="text-4xl">{tool.icon}</div>
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <h2 className="text-xl font-bold text-balance">
                        {tool.name}
                      </h2>
                      <span className="bg-secondary text-secondary-foreground rounded-md px-2 py-0.5 font-mono text-xs">
                        {tool.category}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed text-pretty">
                      {tool.description}
                    </p>
                    <Button asChild size="sm" className="gap-2">
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open Tool
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
