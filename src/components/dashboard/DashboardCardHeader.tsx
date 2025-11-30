import React from 'react';
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from '@/components/ui/Link';
import { LucideIcon } from 'lucide-react';

interface DashboardCardHeaderProps {
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
  actionIcon: LucideIcon;
}

export function DashboardCardHeader({
  title,
  description,
  actionLabel,
  actionHref,
  actionIcon: ActionIcon,
}: DashboardCardHeaderProps) {
  return (
    <CardHeader className="auto-rows-min grid-rows-[auto_auto_auto] has-data-[slot=card-action]:grid-cols-1 sm:grid-rows-[auto_auto] sm:has-data-[slot=card-action]:grid-cols-[1fr_auto]">
      <CardTitle className="text-2xl leading-none font-semibold tracking-tight">
        {title}
      </CardTitle>
      <CardDescription className="text-muted-foreground text-sm">
        {description}
      </CardDescription>
      <CardAction className="col-start-1 row-span-1 row-start-3 justify-self-start sm:col-start-2 sm:row-span-2 sm:row-start-1 sm:justify-self-end">
        <Button asChild>
          <Link href={actionHref}>
            <ActionIcon size={16} /> {actionLabel}
          </Link>
        </Button>
      </CardAction>
    </CardHeader>
  );
}
