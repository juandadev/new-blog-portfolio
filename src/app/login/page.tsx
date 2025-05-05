'use client';

import React from 'react';
import { signIn, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/Button';
import { useSearchParams } from 'next/navigation';
import { LOGIN_ERRORS, LoginErrorKey } from '@/lib/constants';
import { Callout } from '@/components/ui/Callout';
import { Skeleton } from '@/components/ui/Skeleton';
import useLoginRedirection from '@/hooks/useLoginRedirection';
import { Heading } from '@/components/ui/Heading';
import GitHubIcon from '@/icons/GitHubIcon';

export default function LoginPage() {
  useLoginRedirection();
  const { status } = useSession();

  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const message = LOGIN_ERRORS[error as LoginErrorKey];

  if (status === 'loading')
    return (
      <div className="grid justify-items-center gap-300">
        <Skeleton className="h-[20] w-[250px]" />
        <Skeleton className="h-[50px] w-[250px] rounded-xl" />
      </div>
    );

  if (status === 'authenticated')
    return (
      <div className="grid justify-items-center gap-300">
        <h1 className={'text-preset-5 text-center text-neutral-900'}>
          Redirecting to Dashboard...
        </h1>
      </div>
    );

  return (
    <div className={'grid justify-items-center gap-300'}>
      <Heading level={1} preset={2}>
        Iniciar Sesión
      </Heading>
      <Button variant={'github'} onClick={() => signIn('github')}>
        Iniciar sesión con GitHub{' '}
        <GitHubIcon size={16} className={'text-background'} />
      </Button>
      {error && <Callout variant={'error'}>{message}</Callout>}
    </div>
  );
}
