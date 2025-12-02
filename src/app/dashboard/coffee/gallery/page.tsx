'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Plus } from 'lucide-react';
import { getCoffeePhotos } from '@/services/coffee-client';
import { CoffeePhoto } from '@/types/coffee';
import { DashboardPageLayout } from '@/components/dashboard/DashboardPageLayout';
import { DashboardCardHeader } from '@/components/dashboard/DashboardCardHeader';
import GalleryTable from './GalleryTable';

export default function GalleryManagerPage() {
  const [photos, setPhotos] = useState<CoffeePhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getCoffeePhotos()
      .then(({ data }) => setPhotos(data || []))
      .finally(() => setIsLoading(false));
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    getCoffeePhotos()
      .then(({ data }) => setPhotos(data || []))
      .finally(() => setIsLoading(false));
  };

  return (
    <DashboardPageLayout
      title="Gallery Management"
      description="Manage your coffee gallery photos"
    >
      <Card>
        <DashboardCardHeader
          title="Gallery Photos"
          description="Manage all your gallery photos"
          action={{
            label: 'Add Photo',
            url: '/dashboard/coffee/gallery/new',
            icon: Plus,
          }}
        />
        <CardContent>
          <GalleryTable
            photos={photos}
            isLoading={isLoading}
            onRefresh={handleRefresh}
          />
        </CardContent>
      </Card>
    </DashboardPageLayout>
  );
}
