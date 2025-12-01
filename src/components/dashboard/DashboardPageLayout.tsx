import React from 'react';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { ArrowLeftIcon } from 'lucide-react';
import Link from '@/components/ui/Link';
import { usePathname } from 'next/navigation';

interface DashboardPageLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function DashboardPageLayout({
  title,
  description,
  children,
}: DashboardPageLayoutProps) {
  const pathname = usePathname();
  const paths = pathname.split('/');
  const modulePath = `/${paths[1]}/${paths[2]}`;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-8">
        {pathname !== modulePath && (
          <Button variant="outline" asChild>
            <Link href={modulePath}>
              <ArrowLeftIcon />
              Back
            </Link>
          </Button>
        )}
        <div>
          <Heading level={4} className="m-0!">
            {title}
          </Heading>
          <p className="text-muted-foreground font-sans">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}
