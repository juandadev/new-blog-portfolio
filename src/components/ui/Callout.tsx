import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert';
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  AlertTriangleIcon,
  InfoIcon,
  TerminalIcon,
  LightbulbIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatusAlertProps extends React.ComponentProps<'div'> {
  variant?: CalloutVariant;
  heading?: string | null;
  containerClassName?: string;
}

export type CalloutVariant =
  | 'default'
  | 'error'
  | 'warning'
  | 'info'
  | 'success'
  | 'tip';

export const Callout = ({
  children,
  variant = 'default',
  heading,
  className,
  containerClassName,
}: StatusAlertProps) => {
  const iconClassName = {
    default: 'text-muted-foreground',
    success: 'text-status-success',
    error: 'text-status-error',
    warning: 'text-status-warning',
    info: 'text-status-info',
    tip: 'text-status-success',
  };

  const STATUS_ICON = {
    default: (
      <TerminalIcon
        className={cn('mt-1.5 size-5 shrink-0', iconClassName.default)}
      />
    ),
    success: (
      <CheckCircle2Icon
        className={cn('mt-1.5 size-5 shrink-0', iconClassName.success)}
      />
    ),
    error: (
      <AlertCircleIcon
        className={cn('mt-1.5 size-5 shrink-0', iconClassName.error)}
      />
    ),
    warning: (
      <AlertTriangleIcon
        className={cn('mt-1.5 size-5 shrink-0', iconClassName.warning)}
      />
    ),
    info: (
      <InfoIcon className={cn('mt-1.5 size-5 shrink-0', iconClassName.info)} />
    ),
    tip: (
      <LightbulbIcon
        className={cn('mt-1.5 size-5 shrink-0', iconClassName.tip)}
      />
    ),
  };
  const castedVariant = variant === 'tip' ? 'success' : variant;

  return (
    <Alert variant={castedVariant} className={containerClassName}>
      {STATUS_ICON[variant]}
      {heading && <AlertTitle>{heading}</AlertTitle>}
      <AlertDescription className={cn(className, '[&>h5]:mt-0')}>
        {children}
      </AlertDescription>
    </Alert>
  );
};
