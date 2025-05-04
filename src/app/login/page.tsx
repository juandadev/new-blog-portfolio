'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/Button';
import GitHubIcon from '@/icons/GitHubIcon';

export default function LoginPage() {
  return (
    <div className={'grid justify-center gap-300'}>
      <h1 className={'text-preset-2 text-center text-neutral-900'}>
        Iniciar Sesión
      </h1>
      <Button variant={'github'} onClick={() => signIn('github')}>
        Iniciar sesión con GitHub <GitHubIcon color={'#ffffff'} />
      </Button>
    </div>
  );
}
