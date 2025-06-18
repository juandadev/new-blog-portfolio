import React from 'react';
import { Heading } from '@/components/ui/Heading';
import { Callout } from '@/components/ui/Callout';
import Link from '@/components/ui/Link';
import { Typography } from '@/components/Typography/Typography';

export default function SuccessLayout() {
  return (
    <div className={'flex flex-col gap-300'}>
      <Heading level={1}>¡Suscripción confirmada!</Heading>
      <Callout variant={'success'} className={'gap-100'}>
        <Typography>
          Gracias por confirmar tu correo electrónico. A partir de ahora
          recibirás mis artículos, experiencias y novedades directamente en tu
          bandeja de entrada.
        </Typography>
        <Typography>
          Te puedes desuscribir cuando quieras. Sin spam, lo juro 🙂
        </Typography>
      </Callout>
      <Link href={'/blog'} className={'hyperlink'}>
        Ver artículos recientes
      </Link>
    </div>
  );
}
