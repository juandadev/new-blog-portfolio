import React from 'react';
import SuccessLayout from '@/app/newsletter/confirm/SuccessLayout';
import FailureLayout from '@/app/newsletter/confirm/FailureLayout';
import { prisma } from '@/lib/prisma';

interface NewsletterConfirmPageProps {
  searchParams: Promise<{ token: string }>;
}

export default async function NewsletterConfirmPage({
  searchParams,
}: NewsletterConfirmPageProps) {
  const { token } = await searchParams;

  if (!token) return <FailureLayout />;

  const subscriber = await prisma.subscriber.findFirst({
    where: {
      token,
      tokenExpiresAt: {
        gte: new Date(),
      },
      verified: false,
    },
  });

  if (!subscriber) return <FailureLayout />;

  await prisma.subscriber.update({
    where: { id: subscriber.id },
    data: {
      verified: true,
      token: null,
      tokenExpiresAt: null,
    },
  });

  return <SuccessLayout />;
}
