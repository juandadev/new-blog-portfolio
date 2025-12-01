import React from 'react';
import { Edit, MoreHorizontal, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Button } from '@/components/ui/Button';
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
import { Console } from '@/types/gaming';
import { toast } from 'sonner';
import { deleteConsole } from '@/services/gaming-client';
import {
  DashboardTable,
  DashboardTableColumn,
} from '@/components/dashboard/DashboardTable';
import Link from 'next/link';
import Image from 'next/image';

interface ConsolesTableProps {
  consoles: Console[];
  isLoading: boolean;
  onRefresh?: () => void;
}

export default function ConsolesTable({
  consoles,
  isLoading,
  onRefresh,
}: ConsolesTableProps) {
  const handleDeleteConsole = async (consoleId: string) => {
    toast.promise(deleteConsole(consoleId), {
      loading: 'Processing...',
      success: ({ data }) => {
        onRefresh?.();
        return {
          message: `Console ${data?.name} deleted`,
        };
      },
      error: (error) => `Error: ${error.message}`,
    });
  };

  const columns: DashboardTableColumn<Console>[] = [
    {
      key: 'name',
      label: 'Console',
      render: (console) => (
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md">
            <Image
              src={console.image || '/placeholder.svg'}
              alt={console.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="font-medium">{console.name}</div>
        </div>
      ),
    },
    {
      key: 'story',
      label: 'Story',
      render: (console) => (
        <div className="text-muted-foreground max-w-md truncate">
          {console.story}
        </div>
      ),
    },
    {
      key: 'order',
      label: 'Order',
      render: (console) => console.order,
    },
  ];

  const renderActions = (console: Console) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/gaming/consoles/edit/${console.id}`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </DropdownMenuItem>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete {console.name}. This action cannot
                be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDeleteConsole(console.id)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  if (!isLoading && consoles.length === 0) {
    return (
      <div className="text-muted-foreground py-8 text-center">
        No consoles yet. Add your first console!
      </div>
    );
  }

  return (
    <DashboardTable
      data={consoles}
      columns={columns}
      isLoading={isLoading}
      actions={renderActions}
      getRowKey={(console) => `console-${console.id}`}
    />
  );
}
