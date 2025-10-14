import React from 'react';
import { Tool } from '@/types/tool';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { WrenchIcon, TagsIcon, StarIcon } from 'lucide-react';

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

  return (
    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total de Herramientas
          </CardTitle>
          <WrenchIcon className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalTools}</div>
          <p className="text-muted-foreground text-xs">
            Herramientas publicadas
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Categorías</CardTitle>
          <TagsIcon className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{categories.length}</div>
          <p className="text-muted-foreground text-xs">Diferentes tipos</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Más Popular</CardTitle>
          <StarIcon className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {categoryStats[Object.keys(categoryStats)[0]] || 0}
          </div>
          <p className="text-muted-foreground text-xs">
            {Object.keys(categoryStats)[0] || 'N/A'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
