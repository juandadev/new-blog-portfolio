'use client';

import React, { Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import GitHubIcon from '@/icons/GitHubIcon';
import LoginErrorMessage from '@/app/login/LoginErrorMessage';

export default function LoginPage() {
  return (
    <div className={'grid justify-items-center gap-300'}>
      <Heading level={1} preset={2}>
        Iniciar Sesión
      </Heading>
      <Button
        variant={'github'}
        onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
      >
        Iniciar sesión con GitHub{' '}
        <GitHubIcon size={16} className={'text-background'} />
      </Button>
      <Suspense>
        <LoginErrorMessage />
      </Suspense>
    </div>
  );
}
