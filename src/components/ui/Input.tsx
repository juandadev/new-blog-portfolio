import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-input bg-card file:bg-neutral-0 text-preset-7 flex w-full min-w-0 border shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:text-sm file:font-medium  disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50  focus-visible:ring-ring focus-visible:ring-offset-background focus-visible:ring-[3px] focus-visible:ring-offset-2 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
  {
    variants: {
      variant: {
        default: 'px-3 py-2 rounded-md text-preset-8',
        page: 'py-150 px-200 hover:bg-accent hover:border-neutral-300 dark:hover:border-neutral-700 rounded-10',
      },
      size: {
        default: '',
      },
      defaultVariants: {
        variant: 'default',
        size: 'default',
      },
    },
  }
);

function Input({
  className,
  type,
  variant = 'default',
  size,
  ...props
}: React.ComponentProps<'input'> & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        inputVariants({
          variant,
          size,
          className,
        })
      )}
      {...props}
    />
  );
}

export { Input, inputVariants };
