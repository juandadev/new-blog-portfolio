'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

export default function useLoginRedirection(
  preventUnauthenticated: boolean = false
) {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace(pathname);
    } else if (!preventUnauthenticated) {
      router.replace('/');
    }
  }, [pathname, preventUnauthenticated, router, status]);
}
