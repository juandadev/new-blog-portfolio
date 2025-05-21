import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import '../../app/globals.css';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-10 transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none outline-none focus-visible:ring-ring focus-visible:ring-[3px] focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer font-dm font-medium text-[18px]/[150%] tracking-[-0.5px]',
  {
    variants: {
      variant: {
        default: 'bg-blue-500 text-neutral-900 hover:bg-blue-700 ',
        secondary:
          'bg-card text-foreground border border-border hover:bg-current/10',
        outline:
          'bg-transparent border border-blue-500 text-foreground hover:bg-current/10',
        github:
          'bg-github dark:bg-github-dark text-github-dark dark:text-github hover:bg-github/90 dark:hover:bg-github-dark/90',
        transparent: 'bg-transparent justify-start text-foreground',
        icon: 'bg-transparent rounded-[10px]',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'px-300 py-150 w-fit',
        icon: 'h-[40px] w-[40px]',
        menu: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({
          variant,
          size,
          className,
        })
      )}
      {...props}
    />
  );
}

export { Button, buttonVariants };
