'use client';

import React, { useEffect } from 'react';
import { setRealViewportHeight } from '@/lib/utils';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    setRealViewportHeight();
  }, []);

  return <>{children}</>;
}
