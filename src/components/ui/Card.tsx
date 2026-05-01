import * as React from 'react';
import { cn } from '@/lib/utils';
import Hook from '@/components/Pegboard/hook';

interface CardProps extends React.ComponentProps<'div'> {
  withHook?: boolean;
  hookVariant?: '1' | '2';
  hookClassName?: string;
  withAnimation?: boolean;
}

function Card({
  className,
  withHook = true,
  hookVariant,
  hookClassName,
  withAnimation = true,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        withAnimation && 'card-container group',
        !withAnimation && withHook && 'relative isolate',
        className
      )}
    >
      {withHook && <Hook variant={hookVariant} className={hookClassName} />}
      <div
        data-slot="card"
        className={cn(
          'pegboard-panel',
          withAnimation && 'card-animate',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        'font-script text-muted-foreground @container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start text-3xl has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        'text-foreground group-hover:text-primary line-clamp-2 flex items-center gap-2 font-sans text-2xl leading-none font-bold text-balance transition-colors',
        className
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        'text-muted-foreground line-clamp-3 leading-relaxed text-pretty',
        className
      )}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        'text-muted-foreground text-base leading-relaxed',
        className
      )}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center [.border-t]:pt-6', className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
