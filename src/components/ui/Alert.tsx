import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const alertVariants = cva(
  'my-6 flex gap-4 overflow-x-auto rounded-lg border p-4',
  {
    variants: {
      variant: {
        default: 'bg-muted/50 border-muted-foreground/20',
        success: 'bg-status-success/10 border-status-success/30',
        error: 'bg-status-error/10 border-status-error/30',
        warning: 'bg-status-warning/10 border-status-warning/30',
        info: 'bg-status-info/10 border-status-info/30',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-title"
      className={cn('font-sans text-lg font-semibold', className)}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-description"
      className={cn('text-muted-foreground leading-relaxed', className)}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
