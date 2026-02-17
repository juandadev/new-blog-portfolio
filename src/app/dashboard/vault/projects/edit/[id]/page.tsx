import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import { getVaultProjectItem } from '@/services/vault-client';
import ProjectForm from '../../new/ProjectForm';
import { notFound } from 'next/navigation';

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  const { id } = await params;

  const response = await getVaultProjectItem(id);
  const project = response.data;

  if (!project) {
    return notFound();
  }

  return (
    <div>
      <div className="bg-background sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/vault/projects">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Link>
              </Button>
              <div>
                <h1 className="text-lg font-semibold">Edit Project</h1>
                <p className="text-sm text-gray-500">
                  Update project information
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProjectForm project={project} method="PATCH" />
    </div>
  );
}
