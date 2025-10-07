import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const alertVariants = cva('my-6 rounded-lg border p-4 flex gap-4 ', {
  variants: {
    variant: {
      default: 'bg-muted/50 border-muted-foreground/20',
      success: 'bg-green-500/10 border-green-500/30',
      error: 'bg-red-500/10 border-red-500/30',
      warning: 'bg-yellow-500/10 border-yellow-500/30',
      info: 'bg-blue-500/10 border-blue-500/30',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

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
      className={cn('font-reddit text-lg font-bold', className)}
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
