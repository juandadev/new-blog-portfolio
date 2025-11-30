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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-muted-foreground h-12 px-4 text-left align-middle text-sm font-medium">
            Tool
          </TableHead>
          <TableHead className="text-muted-foreground h-12 px-4 text-left align-middle text-sm font-medium">
            Category
          </TableHead>
          <TableHead className="text-muted-foreground h-12 px-4 text-left align-middle text-sm font-medium">
            Slug
          </TableHead>
          <TableHead className="text-muted-foreground h-12 px-4 text-left align-middle text-sm font-medium">
            URL
          </TableHead>
          <TableHead className="text-muted-foreground h-12 px-4 text-left align-middle text-sm font-medium" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {tools.map((tool) => (
          <TableRow key={tool.id}>
            <TableCell className="p-4 align-middle">
              <div className="flex items-center gap-3">
                {tool.icon && <span className="text-2xl">{tool.icon}</span>}
                <div>
                  <div className="text-sm font-medium">{tool.name}</div>
                  <div className="line-clamp-1 text-sm text-gray-500">
                    {tool.description}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell className="p-4 align-middle">
              <Badge className="bg-pink-800 text-pink-100">
                {tool.category}
              </Badge>
            </TableCell>
            <TableCell className="p-4 align-middle">
              <code className="rounded bg-gray-800 px-2 py-1 text-xs">
                {tool.slug}
              </code>
            </TableCell>
            <TableCell className="p-4 align-middle">
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
            <TableCell className="p-4 align-middle">
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
  );
}
