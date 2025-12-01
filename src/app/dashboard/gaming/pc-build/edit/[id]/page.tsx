import React from 'react';
import { getPCParts } from '@/services/gaming-client';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import PCPartForm from '@/components/GamingForm/PCPartForm';

interface EditPCPartPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPCPartPage({ params }: EditPCPartPageProps) {
  const { id } = await params;
  const response = await getPCParts();
  const part = response.data?.find((p) => p.id === id);

  if (!part) {
    return notFound();
  }

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
                <h1 className="text-lg font-semibold">Edit PC Part</h1>
                <p className="text-sm text-gray-500">{part.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PCPartForm method="PATCH" part={part} />
    </div>
  );
}
