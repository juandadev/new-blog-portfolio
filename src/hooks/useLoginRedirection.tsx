'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function useLoginRedirection(preventUnauthenticated = false) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/dashboard');
    } else if (!preventUnauthenticated) {
      router.replace('/');
    }
  }, [status, router, preventUnauthenticated]);
}
