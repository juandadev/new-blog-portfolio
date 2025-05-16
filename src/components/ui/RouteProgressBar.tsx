'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

export function RouteProgressBar() {
  const pathname = usePathname();
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (prevPath.current !== pathname && NProgress.isStarted()) {
      NProgress.done();
      prevPath.current = pathname;
    }
  }, [pathname]);

  return null;
}
