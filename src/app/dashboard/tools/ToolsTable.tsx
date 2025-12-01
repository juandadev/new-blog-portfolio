import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Edit, ExternalLink, MoreHorizontal, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Button } from '@/components/ui/Button';
import Link from '@/components/ui/Link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Tool, GetToolsResponse } from '@/types/tool';
import { toast } from 'sonner';
import { deleteTool } from '@/services/tool-client';
import {
  DashboardTable,
  DashboardTableColumn,
} from '@/components/dashboard/DashboardTable';

interface ToolsTableProps {
  tools: GetToolsResponse;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export default function ToolsTable({
  tools,
  isLoading,
  onPageChange,
  onPageSizeChange,
}: ToolsTableProps) {
  const handleDeleteTool = async (toolId: string) => {
    toast.promise(deleteTool(toolId), {
      loading: 'Processing...',
      success: ({ data }) => ({
        message: `Tool ${data?.name} deleted`,
      }),
      error: (error) => `Error: ${error.message}`,
    });
  };

  const columns: DashboardTableColumn<Tool>[] = [
    {
      key: 'name',
      label: 'Tool',
      render: (tool) => (
        <div className="flex w-[480px] items-center gap-3">
          <div className="w-full">
            <div className="text-sm font-medium text-wrap">{tool.name}</div>
            <div className="line-clamp-1 truncate text-sm text-gray-500">
              {tool.description}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      render: (tool) => (
        <Badge className="bg-pink-800 text-pink-100">{tool.category}</Badge>
      ),
    },
    {
      key: 'url',
      label: 'URL',
      render: (tool) => (
        <Link
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hyperlink flex items-center text-sm"
        >
          <ExternalLink className="mr-1 h-3 w-3" />
          View
        </Link>
      ),
    },
  ];

  const renderActions = (tool: Tool) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/tools/edit/${tool.id}`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href={tool.url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            Open Tool
          </a>
        </DropdownMenuItem>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete tool?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will permanently delete{' '}
                <strong>
                  &quot;
                  {tool.name}&quot;
                </strong>{' '}
                from your catalog. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDeleteTool(tool.id)}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <DashboardTable
      data={tools.items}
      columns={columns}
      isLoading={isLoading}
      getRowKey={(tool) => tool.id}
      actions={renderActions}
      pagination={tools.pagination}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
    />
  );
}
