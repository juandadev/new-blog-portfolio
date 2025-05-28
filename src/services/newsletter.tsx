'use server';

import React from 'react';
import { resend } from '@/lib/resend';
import NewPostTemplate from '@/components/EmailTemplate/NewPostTemplate';
import SubscriptionInviteTemplate from '@/components/EmailTemplate/SubscriptionInviteTemplate';

export async function sendNewPostEmail({
  title,
  slug,
  recipients,
}: {
  title: string;
  slug: string;
  recipients: string[];
}) {
  const { error } = await resend.emails.send({
    from: `Juandadev <${process.env.EMAIL_FROM}>`,
    to: recipients,
    subject: `Juandadev - Nuevo post: ${title}`,
    react: <NewPostTemplate title={title} slug={slug} />,
  });

  if (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}

export async function sendSubscriberInvitation({
  email,
  token,
}: {
  email: string;
  token: string;
}) {
  const { error } = await resend.emails.send({
    from: `Juandadev <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: 'Juandadev - Confirma tu suscripción al newsletter',
    react: <SubscriptionInviteTemplate token={token} />,
  });

  if (error) {
    console.error('Error sending invitation:', error);

    throw new Error('Failed to send invitation');
  }
}
