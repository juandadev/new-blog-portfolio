import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const alertVariants = cva(
  'relative w-full rounded-12 border p-150 grid has-[>svg]:grid-cols-[auto_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-100 gap-y-075 items-start  [&>svg]:translate-y-0.5 [&>svg]:text-current',
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground',
        success:
          'border-green-500 text-green-900 bg-green-200 [&>svg]:text-current *:data-[slot=alert-description]:text-current/90',
        error:
          'border-red-500 text-red-900 bg-red-200 [&>svg]:text-current *:data-[slot=alert-description]:text-current/90',
        warning:
          'border-yellow-500 text-yellow-900 bg-yellow-200 [&>svg]:text-current *:data-[slot=alert-description]:text-current/90',
        info: 'border-blue-500 text-blue-900 bg-blue-200 [&>svg]:text-current *:data-[slot=alert-description]:text-current/90',
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
        'font-dm col-start-2 text-[20px]/[130%] font-semibold tracking-[-0.5px]',
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
