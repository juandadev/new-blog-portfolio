import React from 'react';
import { getTool } from '@/services/tool-client';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ToolForm from '@/components/ToolForm/ToolForm';

interface EditToolPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditToolPage({ params }: EditToolPageProps) {
  const { id } = await params;
  const tool = await getTool(id);

  if (!tool) {
    return notFound();
  }

  return (
    <div>
      <div className="bg-background sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/tools">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Link>
              </Button>
              <div>
                <h1 className="text-lg font-semibold">Edit Tool</h1>
                <p className="text-sm text-gray-500">{tool.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToolForm method="PATCH" tool={tool} />
    </div>
  );
}
