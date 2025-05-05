import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert';
import {
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  Info,
  Terminal,
} from 'lucide-react';

interface StatusAlertProps extends React.ComponentProps<'div'> {
  variant: 'default' | 'error' | 'warning' | 'info' | 'success';
}

export const StatusAlert = ({
  children,
  variant = 'default',
}: StatusAlertProps) => {
  const STATUS_ICON = {
    default: <Terminal className={'h-[26px]'} />,
    success: <CheckCircle2 className={'h-[26px]'} />,
    error: <AlertCircle className={'h-[26px]'} />,
    warning: <AlertTriangle className={'h-[26px]'} />,
    info: <Info className={'h-[26px]'} />,
  };
  const STATUS_TITLE = {
    default: 'Mensaje',
    success: 'Éxito',
    error: 'Error',
    warning: 'Advertencia',
    info: 'Información',
  };

  return (
    <Alert variant={variant}>
      {STATUS_ICON[variant]}
      <AlertTitle>{STATUS_TITLE[variant]}</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
};
