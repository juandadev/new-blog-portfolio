'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { getPromoBanner, updatePromoBanner } from '@/services/banner-client';
import { PromoBanner, PromoBannerUpdate } from '@/types/banner';
import { DashboardPageLayout } from '@/components/dashboard/DashboardPageLayout';
import { DashboardCardHeader } from '@/components/dashboard/DashboardCardHeader';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { PromoBannerForm } from './PromoBannerForm';

export default function BannerManagerPage() {
  const [banner, setBanner] = useState<PromoBanner | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    getPromoBanner()
      .then(({ data }) => setBanner(data!))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSubmit = async (data: PromoBannerUpdate) => {
    toast.promise(updatePromoBanner(data), {
      loading: 'Saving...',
      success: ({ data }) => {
        setBanner(data!);
        router.refresh();
        return 'Banner updated successfully';
      },
      error: (error) => `Error: ${error.message}`,
    });
  };

  return (
    <DashboardPageLayout
      title="Promotional Banner"
      description="Manage the site-wide promotional banner"
    >
      <Card>
        <DashboardCardHeader
          title="Banner Settings"
          description="Configure the promotional banner that appears on all pages"
        />
        <CardContent>
          {isLoading ? (
            <div className="text-muted-foreground py-8 text-center">
              Loading...
            </div>
          ) : (
            <PromoBannerForm banner={banner} onSubmit={handleSubmit} />
          )}
        </CardContent>
      </Card>
    </DashboardPageLayout>
  );
}
