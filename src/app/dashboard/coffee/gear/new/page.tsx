import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import GearForm from './GearForm';

export default function NewGearPage() {
  return (
    <div>
      <div className="bg-background sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/coffee/gear">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Link>
              </Button>
              <div>
                <h1 className="text-lg font-semibold">Add New Gear</h1>
                <p className="text-sm text-gray-500">
                  Complete your gear information
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <GearForm method="POST" />
    </div>
  );
}
