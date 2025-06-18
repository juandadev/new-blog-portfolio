import { Link, Text } from '@react-email/components';
import React from 'react';

export default function EmailFooter({ email }: { email: string }) {
  return (
    <>
      <Text className={'text-xs'}>
        Estás recibiendo este correo porque te suscribiste a mi blog. Si ya no
        deseas recibir más actualizaciones, puedes{' '}
        {/* TODO: Implement tokenization on unsubscribe link */}
        <Link href={`https://juanda.dev/newsletter/unsubscribe?email=${email}`}>
          darte de baja aquí
        </Link>
        .
      </Text>
      <Text className={'text-xs'}>
        © {new Date().getFullYear()} juanda.dev
      </Text>
    </>
  );
}
