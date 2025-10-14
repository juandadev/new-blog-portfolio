import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import ToolForm from '@/components/ToolForm/ToolForm';

export default function NewToolPage() {
  return (
    <div>
      <div className="bg-background sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/tools">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver
                </Link>
              </Button>
              <div>
                <h1 className="text-lg font-semibold">
                  Agregar Nueva Herramienta
                </h1>
                <p className="text-sm text-gray-500">
                  Completa la información de tu herramienta
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToolForm method="POST" />
    </div>
  );
}
