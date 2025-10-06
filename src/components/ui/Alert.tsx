import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const alertVariants = cva(
  'relative w-full rounded-md border p-3 grid has-[>svg]:grid-cols-[auto_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-8 gap-y-1.5 items-start  [&>svg]:translate-y-0.5 text-neutral-700 *:data-[slot=alert-description]:text-neutral-600 dark:text-neutral-0 dark:*:data-[slot=alert-description]:text-neutral-400',
  {
    variants: {
      variant: {
        default: 'bg-card',
        success:
          'border-green-500 bg-green-200 dark:border-green-700 dark:bg-green-900 [&>svg]:text-green-700 dark:[&>svg]:text-green-500',
        error:
          'border-red-500 bg-red-200 dark:border-red-700 dark:bg-red-900 [&>svg]:text-red-700 dark:[&>svg]:text-red-500',
        warning:
          'border-yellow-500 bg-yellow-200 dark:border-yellow-700 dark:bg-yellow-900 [&>svg]:text-yellow-700 dark:[&>svg]:text-yellow-500',
        info: 'border-blue-500 bg-blue-200 dark:border-blue-700 dark:bg-blue-900 [&>svg]:text-blue-700 dark:[&>svg]:text-blue-500',
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
      className={cn(
        'font-reddit col-start-2 text-[20px]/[130%] font-semibold tracking-[-0.5px]',
        className
      )}
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
      className={cn(
        'font-dm col-start-2 grid justify-items-start gap-1 text-[18px]/[150%] font-normal tracking-[-0.2px] [&_p]:leading-relaxed',
        className
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
