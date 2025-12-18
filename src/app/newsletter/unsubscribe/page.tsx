import React from 'react';
import { Heading } from '@/components/ui/Heading';
import { Typography } from '@/components/Typography/Typography';
import Link from '@/components/ui/Link';
import { Callout } from '@/components/ui/Callout';
import { prisma } from '@/lib/prisma';

interface UnsubscribePageProps {
  searchParams: Promise<{ email: string }>;
}

export default async function UnsubscribePage({
  searchParams,
}: UnsubscribePageProps) {
  const { email } = await searchParams;

  if (!email) {
    return (
      <div className="flex flex-col gap-4">
        <Heading level={1}>Error al desuscribirse</Heading>
        <Callout variant="error">
          No se proporcionó un correo electrónico válido para desuscribirse.
        </Callout>
        <Link href="/" className="hyperlink">
          Volver al inicio
        </Link>
      </div>
    );
  }

  const subscriber = await prisma.subscriber.findUnique({
    where: { email },
  });

  if (!subscriber) {
    return (
      <div className="flex flex-col gap-4">
        <Heading level={1}>Error al desuscribirse</Heading>
        <Callout variant="error">
          No se encontró un suscriptor con el correo electrónico proporcionado.
        </Callout>
        <Link href="/" className="hyperlink">
          Volver al inicio
        </Link>
      </div>
    );
  }

  if (subscriber.status === 'UNSUBSCRIBED') {
    return (
      <div className="flex flex-col gap-4">
        <Heading level={1}>Ya estás desuscrito</Heading>
        <Callout variant={'info'}>
          Tu correo electrónico ya está desuscrito de nuestra lista. No
          recibirás más correos de mi blog.
        </Callout>
        <Link href="/" className="hyperlink">
          Volver al inicio
        </Link>
      </div>
    );
  }

  await prisma.subscriber.update({
    where: { email },
    data: {
      status: 'UNSUBSCRIBED',
      unsubscribedAt: new Date(),
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <Heading level={1}>Te has desuscrito exitosamente</Heading>
      <Typography>
        Ya no recibirás más correos de mi blog. Gracias por haber estado
        suscrito ❤️
      </Typography>
      <Typography>
        Si en algún momento cambias de opinión, siempre puedes volver a unirte
        para seguir recibiendo artículos, ideas y aventuras en desarrollo y
        contenido creativo.
      </Typography>
      <Link href="/" className="hyperlink">
        Volver al inicio
      </Link>
    </div>
  );
}
