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
}: StatusAlertProps) => {
  const STATUS_ICON = {
    default: <TerminalIcon className={'h-[26px]'} />,
    success: <CheckCircle2Icon className={'h-[26px]'} />,
    error: <AlertCircleIcon className={'h-[26px]'} />,
    warning: <AlertTriangleIcon className={'h-[26px]'} />,
    info: <InfoIcon className={'h-[26px]'} />,
    tip: <LightbulbIcon className={'h-[22px]'} />,
  };
  const castedVariant = variant === 'tip' ? 'success' : variant;

  return (
    <Alert variant={castedVariant}>
      {STATUS_ICON[variant]}
      {heading && <AlertTitle>{heading}</AlertTitle>}
      <AlertDescription className={className}>{children}</AlertDescription>
    </Alert>
  );
};
