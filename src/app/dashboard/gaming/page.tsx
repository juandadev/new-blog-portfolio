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
  Gamepad2,
  Monitor,
  Joystick,
  Image as ImageIcon,
  Plus,
} from 'lucide-react';

export default function GamingDashboardPage() {
  return (
    <DashboardPageLayout
      title="Gaming Dashboard"
      description="Manage your gaming data, PC build, consoles, and gallery"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gamepad2 className="h-5 w-5" />
              Games
            </CardTitle>
            <CardDescription>Manage your games</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full" variant="outline">
              <Link href="/dashboard/gaming/games">
                <Plus className="mr-2 h-4 w-4" />
                Manage Games
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5" />
              PC Build
            </CardTitle>
            <CardDescription>Manage your PC parts and story</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full" variant="outline">
              <Link href="/dashboard/gaming/pc-build">
                <Plus className="mr-2 h-4 w-4" />
                Manage PC Build
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Joystick className="h-5 w-5" />
              Consoles
            </CardTitle>
            <CardDescription>Manage your consoles</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full" variant="outline">
              <Link href="/dashboard/gaming/consoles">
                <Plus className="mr-2 h-4 w-4" />
                Manage Consoles
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
              <Link href="/dashboard/gaming/gallery">
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
