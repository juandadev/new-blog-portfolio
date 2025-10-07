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
  const STATUS_ICON = {
    default: (
      <TerminalIcon className="text-muted-foreground mt-5 size-5 flex-shrink-0" />
    ),
    success: (
      <CheckCircle2Icon className="mt-5 size-5 flex-shrink-0 text-green-500" />
    ),
    error: (
      <AlertCircleIcon className="mt-5 size-5 flex-shrink-0 text-red-500" />
    ),
    warning: (
      <AlertTriangleIcon className="text- mt-5 size-5 flex-shrink-0 text-yellow-500" />
    ),
    info: <InfoIcon className="mt-5 size-5 flex-shrink-0 text-blue-500" />,
    tip: <LightbulbIcon className="mt-5 size-5 flex-shrink-0 text-green-500" />,
  };
  const castedVariant = variant === 'tip' ? 'success' : variant;

  return (
    <Alert variant={castedVariant} className={containerClassName}>
      {STATUS_ICON[variant]}
      {heading && <AlertTitle>{heading}</AlertTitle>}
      <AlertDescription className={className}>{children}</AlertDescription>
    </Alert>
  );
};
