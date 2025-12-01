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
import { PCPart } from '@/types/gaming';
import { toast } from 'sonner';
import { deletePCPart } from '@/services/gaming-client';
import {
  DashboardTable,
  DashboardTableColumn,
} from '@/components/dashboard/DashboardTable';
import Link from 'next/link';

interface PCPartsTableProps {
  parts: PCPart[];
  isLoading: boolean;
  onRefresh?: () => void;
}

export default function PCPartsTable({
  parts,
  isLoading,
  onRefresh,
}: PCPartsTableProps) {
  const handleDeletePart = async (partId: string) => {
    toast.promise(deletePCPart(partId), {
      loading: 'Processing...',
      success: ({ data }) => {
        onRefresh?.();
        return {
          message: `PC part ${data?.name} deleted`,
        };
      },
      error: (error) => `Error: ${error.message}`,
    });
  };

  const columns: DashboardTableColumn<PCPart>[] = [
    {
      key: 'component',
      label: 'Component',
      render: (part) => <div className="font-medium">{part.component}</div>,
    },
    {
      key: 'name',
      label: 'Name',
      render: (part) => <div className="w-[200px] truncate">{part.name}</div>,
    },
    {
      key: 'notes',
      label: 'Notes',
      render: (part) => (
        <div className="text-muted-foreground w-[300px] truncate">
          {part.notes || '-'}
        </div>
      ),
    },
    {
      key: 'order',
      label: 'Order',
      render: (part) => part.order,
    },
  ];

  const renderActions = (part: PCPart) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/gaming/pc-build/edit/${part.id}`}>
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
                This will permanently delete {part.name}. This action cannot be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDeletePart(part.id)}
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

  if (!isLoading && parts.length === 0) {
    return (
      <div className="text-muted-foreground py-8 text-center">
        No PC parts yet. Add your first part!
      </div>
    );
  }

  return (
    <DashboardTable
      data={parts}
      columns={columns}
      isLoading={isLoading}
      actions={renderActions}
      getRowKey={(part) => `part-${part.id}`}
    />
  );
}
