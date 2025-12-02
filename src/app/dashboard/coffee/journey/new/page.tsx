import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import JourneyForm from './JourneyForm';

export default function NewJourneyPage() {
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
                <h1 className="text-lg font-semibold">Add New Milestone</h1>
                <p className="text-sm text-gray-500">
                  Complete your milestone information
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <JourneyForm method="POST" />
    </div>
  );
}
