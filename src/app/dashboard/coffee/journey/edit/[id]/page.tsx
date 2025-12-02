'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import { getCoffeeJourney } from '@/services/coffee-client';
import { CoffeeJourneyMilestone } from '@/types/coffee';
import JourneyForm from '../../new/JourneyForm';

export default function EditJourneyPage({
  params,
}: {
  params: { id: string };
}) {
  const [milestone, setMilestone] = useState<CoffeeJourneyMilestone | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCoffeeJourney()
      .then(({ data }) => {
        const found = data?.find((m) => m.id === params.id);
        setMilestone(found || null);
      })
      .finally(() => setIsLoading(false));
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="text-muted-foreground py-8 text-center">Loading...</div>
    );
  }

  if (!milestone) {
    return (
      <div className="text-muted-foreground py-8 text-center">
        Milestone not found
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
                <Link href="/dashboard/coffee/journey">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Link>
              </Button>
              <div>
                <h1 className="text-lg font-semibold">Edit Milestone</h1>
                <p className="text-sm text-gray-500">
                  Update your milestone information
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <JourneyForm milestone={milestone} method="PATCH" />
    </div>
  );
}
