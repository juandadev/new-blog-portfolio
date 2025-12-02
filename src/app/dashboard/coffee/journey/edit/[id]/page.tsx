import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import { getCoffeeJourneyMilestone } from '@/services/coffee-client';
import JourneyForm from '../../new/JourneyForm';
import { notFound } from 'next/navigation';

interface EditJourneyPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditJourneyPage({
  params,
}: EditJourneyPageProps) {
  const { id } = await params;
  const response = await getCoffeeJourneyMilestone(id);
  const milestone = response.data;

  if (!milestone) {
    return notFound();
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
