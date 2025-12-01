import React from 'react';
import { getGamingPhotos } from '@/services/gaming-client';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import GamingPhotoForm from '@/components/GamingForm/GamingPhotoForm';

interface EditGalleryPhotoPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditGalleryPhotoPage({
  params,
}: EditGalleryPhotoPageProps) {
  const { id } = await params;
  const response = await getGamingPhotos();
  const photo = response.data?.find((p) => p.id === id);

  if (!photo) {
    return notFound();
  }

  return (
    <div>
      <div className="bg-background sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/gaming/gallery">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Link>
              </Button>
              <div>
                <h1 className="text-lg font-semibold">Edit Photo</h1>
                <p className="text-sm text-gray-500">{photo.alt}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <GamingPhotoForm method="PATCH" photo={photo} />
    </div>
  );
}
