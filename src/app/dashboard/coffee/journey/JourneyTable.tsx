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
import { CoffeeJourneyMilestone } from '@/types/coffee';
import { toast } from 'sonner';
import { deleteCoffeeJourneyMilestone } from '@/services/coffee-client';
import {
  DashboardTable,
  DashboardTableColumn,
} from '@/components/dashboard/DashboardTable';
import Link from 'next/link';

interface JourneyTableProps {
  milestones: CoffeeJourneyMilestone[];
  isLoading: boolean;
  onRefresh?: () => void;
}

export default function JourneyTable({
  milestones,
  isLoading,
  onRefresh,
}: JourneyTableProps) {
  const handleDeleteMilestone = async (milestoneId: string) => {
    toast.promise(deleteCoffeeJourneyMilestone(milestoneId), {
      loading: 'Processing...',
      success: ({ data }) => {
        onRefresh?.();
        return {
          message: `Milestone ${data?.title} deleted`,
        };
      },
      error: (error) => `Error: ${error.message}`,
    });
  };

  const columns: DashboardTableColumn<CoffeeJourneyMilestone>[] = [
    {
      key: 'year',
      label: 'Year',
      render: (milestone) => (
        <span className="text-primary font-mono text-sm">{milestone.year}</span>
      ),
    },
    {
      key: 'title',
      label: 'Title',
      render: (milestone) => (
        <span className="font-medium">{milestone.title}</span>
      ),
    },
    {
      key: 'description',
      label: 'Description',
      render: (milestone) => (
        <p className="text-muted-foreground max-w-md truncate text-sm">
          {milestone.description}
        </p>
      ),
    },
  ];

  const renderActions = (milestone: CoffeeJourneyMilestone) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/coffee/journey/edit/${milestone.id}`}>
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
                This will permanently delete {milestone.title}. This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDeleteMilestone(milestone.id)}
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

  return (
    <DashboardTable
      data={milestones}
      columns={columns}
      isLoading={isLoading}
      actions={renderActions}
      getRowKey={(milestone) => `milestone-${milestone.id}`}
    />
  );
}
