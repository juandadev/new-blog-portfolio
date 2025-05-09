import React from 'react';
import { Callout } from '@/components/ui/Callout';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import Link from '@/components/ui/Link';

export default function NotFound() {
  return (
    <div className={'grid justify-items-start gap-300'}>
      <Heading level={2} decoration={1}>
        Error 404
      </Heading>
      <Callout variant={'default'}>Esta página no está disponible.</Callout>
      <Button asChild>
        <Link href="/">Regresar al Inicio</Link>
      </Button>
    </div>
  );
}
