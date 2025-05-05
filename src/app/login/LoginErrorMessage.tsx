'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { LOGIN_ERRORS, LoginErrorKey } from '@/lib/constants';
import { Callout } from '@/components/ui/Callout';

export default function LoginErrorMessage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const message = LOGIN_ERRORS[error as LoginErrorKey];

  if (!error) return null;

  return <Callout variant={'error'}>{message}</Callout>;
}
