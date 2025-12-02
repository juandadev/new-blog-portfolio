import React from 'react';
import { Badge } from '@/components/ui/Badge';
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
import { CoffeeGear, CoffeeGearCategory } from '@/types/coffee';
import { toast } from 'sonner';
import { deleteCoffeeGear } from '@/services/coffee-client';
import {
  DashboardTable,
  DashboardTableColumn,
} from '@/components/dashboard/DashboardTable';
import { PaginatedResponse } from '@/types/pagination';
import Link from 'next/link';
import Image from 'next/image';

interface GearTableProps {
  gear: PaginatedResponse<CoffeeGear>;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onRefresh?: () => void;
}

export default function GearTable({
  gear,
  isLoading,
  onPageChange,
  onPageSizeChange,
  onRefresh,
}: GearTableProps) {
  const handleDeleteGear = async (gearId: string) => {
    toast.promise(deleteCoffeeGear(gearId), {
      loading: 'Processing...',
      success: ({ data }) => {
        onRefresh?.();
        return {
          message: `Gear ${data?.name} deleted`,
        };
      },
      error: (error) => `Error: ${error.message}`,
    });
  };

  const getCategoryBadge = (category: CoffeeGearCategory) => {
    const variants: Record<
      CoffeeGearCategory,
      { className: string; label: string }
    > = {
      [CoffeeGearCategory.machine]: {
        className: 'bg-blue-800 text-blue-100',
        label: 'Machine',
      },
      [CoffeeGearCategory.grinder]: {
        className: 'bg-purple-800 text-purple-100',
        label: 'Grinder',
      },
      [CoffeeGearCategory.accessories]: {
        className: 'bg-orange-800 text-orange-100',
        label: 'Accessories',
      },
      [CoffeeGearCategory.beans]: {
        className: 'bg-amber-800 text-amber-100',
        label: 'Beans',
      },
    };
    const variant = variants[category];
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  const columns: DashboardTableColumn<CoffeeGear>[] = [
    {
      key: 'name',
      label: 'Gear',
      render: (item) => (
        <div className="flex w-[480px] items-center gap-3">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md">
            <Image
              src={item.image || '/placeholder.svg'}
              alt={`${item.brand} ${item.name}`}
              fill
              className="object-cover"
            />
          </div>
          <div className="w-full">
            <div className="text-sm font-medium">{item.name}</div>
            <div className="text-sm text-gray-500">{item.brand}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      render: (item) => getCategoryBadge(item.category),
    },
    {
      key: 'description',
      label: 'Description',
      render: (item) => (
        <p className="text-muted-foreground max-w-md truncate text-sm">
          {item.description}
        </p>
      ),
    },
  ];

  const renderActions = (item: CoffeeGear) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/coffee/gear/edit/${item.id}`}>
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
                This will permanently delete {item.name}. This action cannot be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDeleteGear(item.id)}
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
      data={gear.items}
      columns={columns}
      isLoading={isLoading}
      pagination={gear.pagination}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      actions={renderActions}
      getRowKey={(item) => `gear-${item.id}`}
    />
  );
}
