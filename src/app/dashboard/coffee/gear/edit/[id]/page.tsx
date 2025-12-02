'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import { getCoffeeGearItem } from '@/services/coffee-client';
import { CoffeeGear } from '@/types/coffee';
import GearForm from '../../new/GearForm';

export default function EditGearPage({ params }: { params: { id: string } }) {
  const [gear, setGear] = useState<CoffeeGear | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCoffeeGearItem(params.id)
      .then(({ data }) => setGear(data!))
      .finally(() => setIsLoading(false));
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="text-muted-foreground py-8 text-center">Loading...</div>
    );
  }

  if (!gear) {
    return (
      <div className="text-muted-foreground py-8 text-center">
        Gear not found
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
                <Link href="/dashboard/coffee/gear">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Link>
              </Button>
              <div>
                <h1 className="text-lg font-semibold">Edit Gear</h1>
                <p className="text-sm text-gray-500">
                  Update your gear information
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <GearForm gear={gear} method="PATCH" />
    </div>
  );
}
