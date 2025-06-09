'use client';

import { useEffect } from 'react';

export function TrackPostView({ slug }: { slug: string }) {
  useEffect(() => {
    // if (process.env.NODE_ENV !== 'production') return;

    const key = `viewed-${slug}`;

    if (!sessionStorage.getItem(key)) {
      fetch(`/api/posts/${slug}/views`, { method: 'POST' });

      sessionStorage.setItem(key, 'true');
    }
  }, [slug]);

  return null;
}
