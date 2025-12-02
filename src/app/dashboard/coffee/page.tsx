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
import {
  Coffee,
  BookOpen,
  MapPin,
  Image as ImageIcon,
  Plus,
} from 'lucide-react';

export default function CoffeeDashboardPage() {
  return (
    <DashboardPageLayout
      title="Coffee Dashboard"
      description="Manage your coffee setup, story, journey, and gallery"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coffee className="h-5 w-5" />
              Gear
            </CardTitle>
            <CardDescription>Manage your coffee gear</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full" variant="outline">
              <Link href="/dashboard/coffee/gear">
                <Plus className="mr-2 h-4 w-4" />
                Manage Gear
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
            <CardDescription>Manage your coffee story</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full" variant="outline">
              <Link href="/dashboard/coffee/story">
                <Plus className="mr-2 h-4 w-4" />
                Manage Story
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Journey
            </CardTitle>
            <CardDescription>
              Manage your coffee journey milestones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full" variant="outline">
              <Link href="/dashboard/coffee/journey">
                <Plus className="mr-2 h-4 w-4" />
                Manage Journey
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Gallery
            </CardTitle>
            <CardDescription>Manage gallery photos</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full" variant="outline">
              <Link href="/dashboard/coffee/gallery">
                <Plus className="mr-2 h-4 w-4" />
                Manage Gallery
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardPageLayout>
  );
}
