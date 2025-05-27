'use server';

import React from 'react';
import { resend } from '@/lib/resend';
import NewPostTemplate from '@/components/EmailTemplate/NewPostTemplate';

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
    subject: `Nuevo post: ${title}`,
    react: <NewPostTemplate title={title} slug={slug} />,
  });

  if (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}
