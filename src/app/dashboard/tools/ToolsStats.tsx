import React from 'react';
import { Tool } from '@/types/tool';
import { WrenchIcon, TagsIcon, StarIcon } from 'lucide-react';
import { DashboardStatsCard } from '@/components/dashboard/DashboardStatsCard';

interface ToolsStatsProps {
  tools: Tool[];
}

export default function ToolsStats({ tools }: ToolsStatsProps) {
  const totalTools = tools.length;
  const categories = Array.from(new Set(tools.map((tool) => tool.category)));
  const categoryStats = categories.reduce(
    (acc, category) => {
      acc[category] = tools.filter((t) => t.category === category).length;
      return acc;
    },
    {} as Record<string, number>
  );

  const mostPopularCategory = Object.keys(categoryStats)[0];
  const mostPopularCount = categoryStats[mostPopularCategory] || 0;

  return (
    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
      <DashboardStatsCard
        title="Total Tools"
        value={totalTools}
        description="Published tools"
        icon={WrenchIcon}
      />
      <DashboardStatsCard
        title="Categories"
        value={categories.length}
        description="Different types"
        icon={TagsIcon}
      />
      <DashboardStatsCard
        title="Most Popular"
        value={mostPopularCount}
        description={mostPopularCategory || 'N/A'}
        icon={StarIcon}
      />
    </div>
  );
}
