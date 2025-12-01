import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import PCPartForm from '@/components/GamingForm/PCPartForm';

export default function NewPCPartPage() {
  return (
    <div>
      <div className="bg-background sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/gaming/pc-build">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Link>
              </Button>
              <div>
                <h1 className="text-lg font-semibold">Add New PC Part</h1>
                <p className="text-sm text-gray-500">
                  Complete your PC part information
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PCPartForm method="POST" />
    </div>
  );
}
