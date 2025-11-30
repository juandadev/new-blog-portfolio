import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
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
import { Tool } from '@/types/tool';
import { toast } from 'sonner';
import { deleteTool } from '@/services/tool-client';

interface ToolsTableProps {
  tools: Tool[];
}

export default function ToolsTable({ tools }: ToolsTableProps) {
  const handleDeleteTool = async (toolId: string) => {
    toast.promise(deleteTool(toolId), {
      loading: 'Processing...',
      success: ({ data }) => ({
        message: `Tool ${data?.name} deleted`,
      }),
      error: (error) => `Error: ${error.message}`,
    });
  };

  return (
    <div className="overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <input type="checkbox" className="rounded" />
            </TableHead>
            <TableHead>Tool</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>URL</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tools.map((tool) => (
            <TableRow key={tool.id}>
              <TableCell>
                <input type="checkbox" className="rounded" />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  {tool.icon && <span className="text-2xl">{tool.icon}</span>}
                  <div>
                    <div className="font-medium">{tool.name}</div>
                    <div className="line-clamp-1 text-sm text-gray-500">
                      {tool.description}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge className="bg-pink-800 text-pink-100">
                  {tool.category}
                </Badge>
              </TableCell>
              <TableCell>
                <code className="rounded bg-gray-800 px-2 py-1 text-xs">
                  {tool.slug}
                </code>
              </TableCell>
              <TableCell>
                <Link
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hyperlink flex items-center text-sm"
                >
                  <ExternalLink className="mr-1 h-3 w-3" />
                  View
                </Link>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
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
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
