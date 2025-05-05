'use client';

import React, { Suspense } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import useLoginRedirection from '@/hooks/useLoginRedirection';
import { Heading } from '@/components/ui/Heading';
import GitHubIcon from '@/icons/GitHubIcon';
import LoginErrorMessage from '@/app/login/LoginErrorMessage';

export default function LoginPage() {
  useLoginRedirection();
  const { status } = useSession();

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
      <Suspense>
        <LoginErrorMessage />
      </Suspense>
    </div>
  );
}
