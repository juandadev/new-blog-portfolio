import React from 'react';
import Link from 'next/link';
import { StatusAlert } from '@/components/ui/StatusAlert';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className={'grid justify-items-center gap-300'}>
      <h1 className={'text-preset-2 text-center text-neutral-900'}>
        Error 404
      </h1>
      <StatusAlert variant={'default'}>
        Esta página no está disponible.
      </StatusAlert>
      <Button asChild>
        <Link href="/">Regresar al Inicio</Link>
      </Button>
    </div>
  );
}
