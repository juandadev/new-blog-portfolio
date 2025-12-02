'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import { getCoffeePhotos } from '@/services/coffee-client';
import { CoffeePhoto } from '@/types/coffee';
import GalleryForm from '../../new/GalleryForm';

export default function EditGalleryPage({
  params,
}: {
  params: { id: string };
}) {
  const [photo, setPhoto] = useState<CoffeePhoto | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCoffeePhotos()
      .then(({ data }) => {
        const found = data?.find((p) => p.id === params.id);
        setPhoto(found || null);
      })
      .finally(() => setIsLoading(false));
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="text-muted-foreground py-8 text-center">Loading...</div>
    );
  }

  if (!photo) {
    return (
      <div className="text-muted-foreground py-8 text-center">
        Photo not found
      </div>
    );
  }

  return (
    <div>
      <div className="bg-background sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/coffee/gallery">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Link>
              </Button>
              <div>
                <h1 className="text-lg font-semibold">Edit Photo</h1>
                <p className="text-sm text-gray-500">
                  Update your photo information
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <GalleryForm photo={photo} method="PATCH" />
    </div>
  );
}
