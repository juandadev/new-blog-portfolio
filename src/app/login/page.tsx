'use client';

import React, { Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import GitHubIcon from '@/icons/GitHubIcon';
import LoginErrorMessage from '@/app/login/LoginErrorMessage';

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100svh-554px)] flex-col items-center">
      <Heading level={1}>Iniciar Sesión</Heading>
      <Button
        className="mx-auto"
        onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
      >
        Iniciar sesión con GitHub{' '}
        <GitHubIcon size={16} className="text-foreground" />
      </Button>
      <Suspense>
        <LoginErrorMessage />
      </Suspense>
    </div>
  );
}
