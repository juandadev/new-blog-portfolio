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
import Link from 'next/link';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { Skeleton } from '@/components/ui/Skeleton';

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

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (consoles.length === 0) {
    return (
      <div className="text-muted-foreground py-8 text-center">
        No consoles yet. Add your first console!
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Console</TableHead>
          <TableHead>Story</TableHead>
          <TableHead>Order</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {consoles.map((console) => (
          <TableRow key={console.id}>
            <TableCell>
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
            </TableCell>
            <TableCell className="text-muted-foreground max-w-md truncate">
              {console.story}
            </TableCell>
            <TableCell>{console.order}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link
                      href={`/dashboard/gaming/consoles/edit/${console.id}`}
                    >
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
                          This will permanently delete {console.name}. This
                          action cannot be undone.
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
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
