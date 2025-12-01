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
import { GamingPhoto } from '@/types/gaming';
import { toast } from 'sonner';
import { deleteGamingPhoto } from '@/services/gaming-client';
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

interface GalleryTableProps {
  photos: GamingPhoto[];
  isLoading: boolean;
  onRefresh?: () => void;
}

export default function GalleryTable({
  photos,
  isLoading,
  onRefresh,
}: GalleryTableProps) {
  const handleDeletePhoto = async (photoId: string) => {
    toast.promise(deleteGamingPhoto(photoId), {
      loading: 'Processing...',
      success: ({ data }) => {
        onRefresh?.();
        return {
          message: `Photo ${data?.alt} deleted`,
        };
      },
      error: (error) => `Error: ${error.message}`,
    });
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="aspect-video w-full" />
        ))}
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="text-muted-foreground py-8 text-center">
        No photos yet. Add your first photo!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {photos.map((photo) => (
        <div key={photo.id} className="group relative">
          <div className="relative aspect-video w-full overflow-hidden rounded-md border">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover"
              unoptimized
            />
            <div className="bg-background/80 absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/dashboard/gaming/gallery/edit/${photo.id}`}>
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
                          This will permanently delete this photo. This action
                          cannot be undone.
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
            </div>
          </div>
          <p className="text-muted-foreground mt-2 text-sm">{photo.alt}</p>
        </div>
      ))}
    </div>
  );
}
