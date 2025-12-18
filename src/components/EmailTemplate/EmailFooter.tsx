import { Link, Text } from '@react-email/components';
import React from 'react';

export default function EmailFooter({ email }: { email: string }) {
  return (
    <>
      <Text className="text-xs">
        You’re receiving this email because you subscribed to my blog. If you no
        longer wish to receive updates, you can{' '}
        {/* TODO: Implement tokenization on unsubscribe link */}
        <Link href={`https://juanda.dev/newsletter/unsubscribe?email=${email}`}>
          unsubscribe here.
        </Link>
      </Text>
      <Text className="text-xs">© {new Date().getFullYear()} juanda.dev</Text>
    </>
  );
}
