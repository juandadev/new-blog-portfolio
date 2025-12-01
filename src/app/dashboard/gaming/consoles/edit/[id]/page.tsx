import React from 'react';
import { getConsoles } from '@/services/gaming-client';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ConsoleForm from '@/components/GamingForm/ConsoleForm';

interface EditConsolePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditConsolePage({
  params,
}: EditConsolePageProps) {
  const { id } = await params;
  const response = await getConsoles();
  const console = response.data?.find((c) => c.id === id);

  if (!console) {
    return notFound();
  }

  return (
    <div>
      <div className="bg-background sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/gaming/consoles">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Link>
              </Button>
              <div>
                <h1 className="text-lg font-semibold">Edit Console</h1>
                <p className="text-sm text-gray-500">{console.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConsoleForm method="PATCH" console={console} />
    </div>
  );
}
