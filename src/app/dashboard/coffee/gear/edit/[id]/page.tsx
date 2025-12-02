import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import { getCoffeeGearItem } from '@/services/coffee-client';
import GearForm from '../../new/GearForm';
import { notFound } from 'next/navigation';

interface EditGearPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditGearPage({ params }: EditGearPageProps) {
  const { id } = await params;

  const response = await getCoffeeGearItem(id);
  const gear = response.data;

  if (!gear) {
    return notFound();
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
