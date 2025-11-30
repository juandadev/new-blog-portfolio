'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Plus } from 'lucide-react';
import { Tool } from '@/types/tool';
import { getTools } from '@/services/tool-client';
import ToolsStats from '@/app/dashboard/tools/ToolsStats';
import ToolsTable from '@/app/dashboard/tools/ToolsTable';
import ToolsActions from '@/app/dashboard/tools/ToolsActions';
import { DashboardPageLayout } from '@/components/dashboard/DashboardPageLayout';
import { DashboardCardHeader } from '@/components/dashboard/DashboardCardHeader';

export default function ToolsManagerPage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const isMounted = React.useRef<boolean>(false);

  useEffect(() => {
    if (isMounted.current) return;

    getTools().then(({ data }) => setTools(data!.items));

    isMounted.current = true;
  });

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === 'all' || tool.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardPageLayout
      title="Tools"
      description="Manage the tools you have developed"
    >
      <ToolsStats tools={tools} />
      <div>
        <Card>
          <DashboardCardHeader
            title="Tools Management"
            description="Manage all the tools you have developed"
            actionLabel="New Tool"
            actionHref="/dashboard/tools/new"
            actionIcon={Plus}
          />
          <CardContent>
            <ToolsActions
              tools={tools}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            <ToolsTable tools={filteredTools} />
          </CardContent>
        </Card>
      </div>
    </DashboardPageLayout>
  );
}
