import React from 'react';
import { Heading } from '@/components/ui/Heading';
import { Typography } from '@/components/Typography/Typography';
import { Callout } from '@/components/ui/Callout';
import Link from '@/components/ui/Link';
import { Button } from '@/components/ui/Button';

export default function FailureLayout() {
  return (
    <div className={'flex flex-col gap-300'}>
      <Heading level={1}>Token inválido o expirado</Heading>
      <Callout variant={'error'} className={'gap-100'}>
        <Typography>
          Parece que el enlace que usaste ya no es válido o ha expirado. Intenta
          suscribirte nuevamente o verifica si ya confirmaste tu correo
          anteriormente.
        </Typography>
        <Button asChild>
          <Link href={'/newsletter'}>Reintentar suscripción</Link>
        </Button>
      </Callout>
      <Link href={'/'} className={'hyperlink'}>
        Volver al inicio
      </Link>
    </div>
  );
}
