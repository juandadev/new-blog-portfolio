import React from 'react';
import Link from 'next/link';
import { StatusAlert } from '@/components/ui/StatusAlert';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';

export default function NotFound() {
  return (
    <div className={'grid justify-items-start gap-300'}>
      <Heading level={2} decoration={1}>
        Error 404
      </Heading>
      <StatusAlert variant={'default'}>
        Esta página no está disponible.
      </StatusAlert>
      <Button asChild>
        <Link href="/">Regresar al Inicio</Link>
      </Button>
    </div>
  );
}
