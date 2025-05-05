'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/Button';
import GitHubIcon from '@/icons/GitHubIcon';
import { useSearchParams } from 'next/navigation';
import { LOGIN_ERRORS, LoginErrorKey } from '@/lib/constants';
import { StatusAlert } from '@/components/ui/StatusAlert';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const message = LOGIN_ERRORS[error as LoginErrorKey];

  return (
    <div className={'grid justify-items-center gap-300'}>
      <h1 className={'text-preset-2 text-center text-neutral-900'}>
        Iniciar Sesión
      </h1>
      <Button variant={'github'} onClick={() => signIn('github')}>
        Iniciar sesión con GitHub <GitHubIcon color={'#ffffff'} />
      </Button>
      {error && <StatusAlert variant={'error'}>{message}</StatusAlert>}
    </div>
  );
}
