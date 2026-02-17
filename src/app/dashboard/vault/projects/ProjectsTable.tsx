import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Edit, MoreHorizontal, Trash2, Star } from 'lucide-react';
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
import { VaultProject, VaultProjectCategory } from '@/types/vault';
import { toast } from 'sonner';
import { deleteVaultProject } from '@/services/vault-client';
import {
  DashboardTable,
  DashboardTableColumn,
} from '@/components/dashboard/DashboardTable';
import { PaginatedResponse } from '@/types/pagination';
import Link from 'next/link';
import Image from 'next/image';

interface ProjectsTableProps {
  projects: PaginatedResponse<VaultProject>;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onRefresh?: () => void;
}

const CATEGORY_LABELS: Record<
  VaultProjectCategory,
  { label: string; className: string }
> = {
  [VaultProjectCategory.web_app]: {
    label: 'Web App',
    className: 'bg-cyan-800 text-cyan-100',
  },
  [VaultProjectCategory.mobile_app]: {
    label: 'Mobile App',
    className: 'bg-purple-800 text-purple-100',
  },
  [VaultProjectCategory.landing_page]: {
    label: 'Landing Page',
    className: 'bg-pink-800 text-pink-100',
  },
  [VaultProjectCategory.dashboard]: {
    label: 'Dashboard',
    className: 'bg-blue-800 text-blue-100',
  },
  [VaultProjectCategory.ui_components]: {
    label: 'UI Components',
    className: 'bg-green-800 text-green-100',
  },
  [VaultProjectCategory.branding]: {
    label: 'Branding',
    className: 'bg-orange-800 text-orange-100',
  },
  [VaultProjectCategory.other]: {
    label: 'Other',
    className: 'bg-zinc-700 text-zinc-100',
  },
};

export default function ProjectsTable({
  projects,
  isLoading,
  onPageChange,
  onPageSizeChange,
  onRefresh,
}: ProjectsTableProps) {
  const handleDelete = async (projectId: string) => {
    toast.promise(deleteVaultProject(projectId), {
      loading: 'Processing...',
      success: ({ data }) => {
        onRefresh?.();
        return { message: `Project "${data?.title}" deleted` };
      },
      error: (error) => `Error: ${error.message}`,
    });
  };

  const columns: DashboardTableColumn<VaultProject>[] = [
    {
      key: 'title',
      label: 'Project',
      render: (item) => (
        <div className="flex w-[260px] items-center gap-3 truncate">
          <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded-md">
            <Image
              src={item.thumbnail || '/placeholder.svg'}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="w-full">
            <div className="flex items-center gap-1.5 text-sm font-medium">
              {item.title}
              {item.featured && (
                <Star className="text-primary h-3 w-3 fill-current" />
              )}
            </div>
            <div className="text-muted-foreground font-mono text-xs">
              {item.year}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      render: (item) => {
        const cat = CATEGORY_LABELS[item.category];
        return <Badge className={cat.className}>{cat.label}</Badge>;
      },
    },
    {
      key: 'description',
      label: 'Description',
      render: (item) => (
        <p className="text-muted-foreground max-w-xs truncate text-sm">
          {item.description}
        </p>
      ),
    },
  ];

  const renderActions = (item: VaultProject) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/vault/projects/edit/${item.id}`}>
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
                This will permanently delete &quot;{item.title}&quot;. This
                action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDelete(item.id)}
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
      data={projects.items}
      columns={columns}
      isLoading={isLoading}
      pagination={projects.pagination}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      actions={renderActions}
      getRowKey={(item) => `vault-project-${item.id}`}
    />
  );
}
