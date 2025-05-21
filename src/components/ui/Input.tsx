import * as React from 'react';

import { clsx } from 'clsx';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={clsx(
        'file:text-foreground placeholder:text-card-foreground selection:bg-primary selection:text-primary-foreground border-input bg-card file:bg-neutral-0 text-preset-7 hover:bg-accent rounded-10 flex w-full min-w-0 border px-200 py-150 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:text-sm file:font-medium hover:border-neutral-300 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:hover:border-neutral-700',
        'focus-visible:ring-ring focus-visible:ring-offset-background focus-visible:ring-[3px] focus-visible:ring-offset-2',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className
      )}
      {...props}
    />
  );
}

export { Input };
