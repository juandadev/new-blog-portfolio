'use client';

import React from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { DashboardPageLayout } from '@/components/dashboard/DashboardPageLayout';
import { LayoutGrid, BookOpen, Plus } from 'lucide-react';

export default function VaultDashboardPage() {
  return (
    <DashboardPageLayout
      title="The Vault"
      description="Manage your legacy Figma design work and intro story"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LayoutGrid className="h-5 w-5" />
              Projects
            </CardTitle>
            <CardDescription>Manage your Figma design projects</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full" variant="outline">
              <Link href="/dashboard/vault/projects">
                <Plus className="mr-2 h-4 w-4" />
                Manage Projects
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Story
            </CardTitle>
            <CardDescription>
              Manage the intro story for The Vault
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full" variant="outline">
              <Link href="/dashboard/vault/story">
                <Plus className="mr-2 h-4 w-4" />
                Manage Story
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardPageLayout>
  );
}
