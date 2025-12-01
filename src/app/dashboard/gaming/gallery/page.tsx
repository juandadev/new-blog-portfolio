'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Plus } from 'lucide-react';
import { getGamingPhotos } from '@/services/gaming-client';
import { GamingPhoto } from '@/types/gaming';
import { DashboardPageLayout } from '@/components/dashboard/DashboardPageLayout';
import { DashboardCardHeader } from '@/components/dashboard/DashboardCardHeader';
import GalleryTable from './GalleryTable';

export default function GalleryPage() {
  const [photos, setPhotos] = useState<GamingPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getGamingPhotos()
      .then(({ data }) => setPhotos(data || []))
      .finally(() => setIsLoading(false));
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    getGamingPhotos()
      .then(({ data }) => setPhotos(data || []))
      .finally(() => setIsLoading(false));
  };

  return (
    <DashboardPageLayout
      title="Gallery Management"
      description="Manage your gaming gallery photos"
    >
      <Card>
        <DashboardCardHeader
          title="Gallery Photos"
          description="Manage all your gallery photos"
          action={{
            label: 'Add Photo',
            url: '/dashboard/gaming/gallery/new',
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
