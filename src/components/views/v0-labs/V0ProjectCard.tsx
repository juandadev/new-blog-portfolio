import React from 'react';
import { Tool } from '@/types/tool';
import Link from '@/components/ui/Link';
import { ExternalLink } from 'lucide-react';

interface V0ProjectCardProps {
  tool: Tool;
}

export default function V0ProjectCard({ tool }: V0ProjectCardProps) {
  return (
    <div className="group bg-card border-border hover:border-primary/50 relative rounded-lg border p-5 transition-all duration-300">
      {/*{tool.featured && (*/}
      {/*  <span className="bg-primary text-primary-foreground absolute -top-2 -right-2 flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-xs">*/}
      {/*    <Sparkles className="h-3 w-3" />*/}
      {/*    featured*/}
      {/*  </span>*/}
      {/*)}*/}
      <div className="flex h-full flex-col justify-between gap-3">
        <h3 className="text-foreground group-hover:text-primary text-lg font-semibold transition-colors">
          {tool.name}
        </h3>

        <p className="text-muted-foreground text-sm leading-relaxed">
          {tool.description}
        </p>
        <div className="flex flex-col gap-3">
          <span className="bg-muted text-muted-foreground w-fit rounded px-2 py-1 font-mono text-xs">
            {tool.category}
          </span>
          <Link
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary flex items-center gap-1 font-mono text-xs hover:underline"
          >
            view on v0
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
