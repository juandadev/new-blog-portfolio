'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Plus } from 'lucide-react';
import {
  getPCParts,
  getPCBuildStory,
  updatePCBuildStory,
} from '@/services/gaming-client';
import { PCPart } from '@/types/gaming';
import { DashboardPageLayout } from '@/components/dashboard/DashboardPageLayout';
import { DashboardCardHeader } from '@/components/dashboard/DashboardCardHeader';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { toast } from 'sonner';
import PCPartsTable from './PCPartsTable';

export default function PCBuildPage() {
  const [parts, setParts] = useState<PCPart[]>([]);
  const [storyText, setStoryText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingStory, setIsSavingStory] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getPCParts(), getPCBuildStory()])
      .then(([partsRes, storyRes]) => {
        setParts(partsRes.data || []);
        setStoryText(storyRes.data?.story || '');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleSaveStory = async () => {
    setIsSavingStory(true);
    try {
      await updatePCBuildStory({ story: storyText });
      toast.success('PC build story updated successfully');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to update story'
      );
    } finally {
      setIsSavingStory(false);
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    Promise.all([getPCParts(), getPCBuildStory()])
      .then(([partsRes, storyRes]) => {
        setParts(partsRes.data || []);
        setStoryText(storyRes.data?.story || '');
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <DashboardPageLayout
      title="PC Build Management"
      description="Manage your PC parts and build story"
    >
      <div className="space-y-6">
        <Card>
          <DashboardCardHeader
            title="PC Parts"
            description="Manage all your PC components"
            action={{
              label: 'Add Part',
              url: '/dashboard/gaming/pc-build/new',
              icon: Plus,
            }}
          />
          <CardContent>
            <PCPartsTable
              parts={parts}
              isLoading={isLoading}
              onRefresh={handleRefresh}
            />
          </CardContent>
        </Card>
        <Card>
          <DashboardCardHeader
            title="PC Build Story"
            description="Tell the story of your PC build"
          />
          <CardContent className="space-y-4">
            <Textarea
              value={storyText}
              onChange={(e) => setStoryText(e.target.value)}
              placeholder="Enter your PC build story..."
              className="min-h-[200px] resize-none"
            />
            <Button onClick={handleSaveStory} disabled={isSavingStory}>
              {isSavingStory ? 'Saving...' : 'Save Story'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardPageLayout>
  );
}
