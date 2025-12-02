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
import { CoffeePhoto } from '@/types/coffee';
import { toast } from 'sonner';
import { deleteCoffeePhoto } from '@/services/coffee-client';
import {
  DashboardTable,
  DashboardTableColumn,
} from '@/components/dashboard/DashboardTable';
import Link from 'next/link';
import Image from 'next/image';

interface GalleryTableProps {
  photos: CoffeePhoto[];
  isLoading: boolean;
  onRefresh?: () => void;
}

export default function GalleryTable({
  photos,
  isLoading,
  onRefresh,
}: GalleryTableProps) {
  const handleDeletePhoto = async (photoId: string) => {
    toast.promise(deleteCoffeePhoto(photoId), {
      loading: 'Processing...',
      success: () => {
        onRefresh?.();
        return {
          message: `Photo deleted`,
        };
      },
      error: (error) => `Error: ${error.message}`,
    });
  };

  const columns: DashboardTableColumn<CoffeePhoto>[] = [
    {
      key: 'src',
      label: 'Photo',
      render: (photo) => (
        <div className="relative h-16 w-16 overflow-hidden rounded-md">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-cover"
          />
        </div>
      ),
    },
    {
      key: 'alt',
      label: 'Alt Text',
      render: (photo) => <span className="text-sm">{photo.alt}</span>,
    },
    {
      key: 'caption',
      label: 'Caption',
      render: (photo) => (
        <p className="text-muted-foreground max-w-md truncate text-sm">
          {photo.caption || '-'}
        </p>
      ),
    },
  ];

  const renderActions = (photo: CoffeePhoto) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/coffee/gallery/edit/${photo.id}`}>
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
                This will permanently delete this photo. This action cannot be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDeletePhoto(photo.id)}
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
      data={photos}
      columns={columns}
      isLoading={isLoading}
      actions={renderActions}
      getRowKey={(photo) => `photo-${photo.id}`}
    />
  );
}
