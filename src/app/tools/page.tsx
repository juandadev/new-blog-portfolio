import React from 'react';
import { Button } from '@/components/ui/Button';
import { ExternalLink } from 'lucide-react';
import { fetchTools } from '@/services/tool-server';
import AffiliateBanner from '@/components/views/v0-labs/AffiliateBanner';
import V0AmbassadorBadge from '@/components/views/v0-labs/V0AmbassadorBadge';
import V0ProjectCard from '@/components/views/v0-labs/V0ProjectCard';

export const metadata = {
  title: 'v0 Labs | Juanda Martinez',
  description: 'Experiments and v0-labs built with v0 by Juan Martinez',
};

export default async function ToolsPage() {
  const tools = await fetchTools();

  return (
    // TODO: Add featured projects and pagination component
    <>
      <div className="space-y-4">
        <V0AmbassadorBadge />
        <AffiliateBanner />
      </div>
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          {/*<span className="text-primary font-mono text-xs">02</span>*/}
          <h2 className="text-foreground text-xl font-semibold">
            all experiments
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools?.map((tool) => (
            <V0ProjectCard key={`tool-${tool.id}`} tool={tool} />
          ))}
        </div>
      </section>
    </>
  );
}
