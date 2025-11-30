'use client';

import React, { useEffect, useState } from 'react';
import Link from '@/components/ui/Link';
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Plus } from 'lucide-react';
import { Tool } from '@/types/tool';
import { getTools } from '@/services/tool-client';
import ToolsStats from '@/app/dashboard/tools/ToolsStats';
import ToolsTable from '@/app/dashboard/tools/ToolsTable';
import ToolsActions from '@/app/dashboard/tools/ToolsActions';

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
    <div>
      <div>
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Tools</h1>
              <p>Manage the tools you have developed</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <ToolsStats tools={tools} />
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Tools Management</CardTitle>
                <CardDescription>
                  Manage all the tools you have developed
                </CardDescription>
              </div>
              <Button asChild>
                <Link href="/dashboard/tools/new">
                  <Plus className="mr-2 h-4 w-4" />
                  New Tool
                </Link>
              </Button>
            </div>
          </CardHeader>
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
    </div>
  );
}
