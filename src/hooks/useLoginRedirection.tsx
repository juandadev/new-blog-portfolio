'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function useLoginRedirection() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      // TODO: Redirect to dashboard when the view is ready
      router.replace('/');
    }
  }, [status, router]);
}
