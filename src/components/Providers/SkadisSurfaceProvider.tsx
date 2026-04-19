'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';

export type SkadisSurfaceVariant = 'wood' | 'black' | 'white';

export const SKADIS_SURFACE_STORAGE_KEY = 'skadis-surface';
const SKADIS_SHARED_SHADES_URL = "url('/textures/wood_skadis_shades.png')";

const SURFACE_CSS_BY_VARIANT: Record<SkadisSurfaceVariant, CSSProperties> = {
  wood: {
    '--skadis-surface-color': 'var(--skadis-wood)',
    '--skadis-surface-texture-url':
      "url('/textures/fiberboard_pattern_black.png')",
    '--skadis-surface-texture-opacity': 0.2,
    '--skadis-surface-shades-url': SKADIS_SHARED_SHADES_URL,
  } as CSSProperties,
  black: {
    '--skadis-surface-color': 'var(--skadis-black)',
    '--skadis-surface-texture-url':
      "url('/textures/fiberboard_pattern_white.png')",
    '--skadis-surface-texture-opacity': 0.18,
    '--skadis-surface-shades-url': SKADIS_SHARED_SHADES_URL,
  } as CSSProperties,
  white: {
    '--skadis-surface-color': 'var(--skadis-white)',
    '--skadis-surface-texture-url':
      "url('/textures/fiberboard_pattern_black.png')",
    '--skadis-surface-texture-opacity': 0.2,
    '--skadis-surface-shades-url': SKADIS_SHARED_SHADES_URL,
  } as CSSProperties,
};

export type PegboardAccessoryTone = 'orange' | 'white' | 'black';

/** Pegboard hooks and clips: black surface uses orange IKEA accents; wood uses black metal; white uses default white. */
export function getPegboardAccessoryTone(
  variant: SkadisSurfaceVariant
): PegboardAccessoryTone {
  if (variant === 'black') return 'orange';
  if (variant === 'wood') return 'black';
  return 'white';
}

const PEGBOARD_SCREW_SRC: Record<SkadisSurfaceVariant, string> = {
  wood: '/pegboard/screw.png',
  black: '/pegboard/screw_white.png',
  white: '/pegboard/screw_white.png',
};

/** Corner screw image: wood keeps the default screw; black/white surfaces use the light screw asset. */
export function getPegboardScrewSrc(variant: SkadisSurfaceVariant): string {
  return PEGBOARD_SCREW_SRC[variant];
}

type SkadisSurfaceContextValue = {
  variant: SkadisSurfaceVariant;
  setVariant: (v: SkadisSurfaceVariant) => void;
};

const SkadisSurfaceContext = createContext<SkadisSurfaceContextValue | null>(
  null
);

export function useSkadisSurface(): SkadisSurfaceContextValue {
  const ctx = useContext(SkadisSurfaceContext);
  if (!ctx) {
    throw new Error(
      'useSkadisSurface must be used within SkadisSurfaceProvider'
    );
  }
  return ctx;
}

export function SkadisSurfaceProvider({ children }: { children: ReactNode }) {
  const [variant, setVariantState] = useState<SkadisSurfaceVariant>('wood');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SKADIS_SURFACE_STORAGE_KEY);
      if (stored === 'wood' || stored === 'black' || stored === 'white') {
        // After mount only: avoids SSR/localStorage hydration mismatch.
        // eslint-disable-next-line react-hooks/set-state-in-effect -- sync from localStorage post-hydration
        setVariantState(stored);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const setVariant = useCallback((v: SkadisSurfaceVariant) => {
    setVariantState(v);
    try {
      localStorage.setItem(SKADIS_SURFACE_STORAGE_KEY, v);
    } catch {
      /* ignore */
    }
  }, []);

  const surfaceStyle = useMemo(
    () => SURFACE_CSS_BY_VARIANT[variant],
    [variant]
  );

  const value = useMemo(() => ({ variant, setVariant }), [variant, setVariant]);

  return (
    <SkadisSurfaceContext.Provider value={value}>
      <div className="contents" style={surfaceStyle}>
        {children}
      </div>
    </SkadisSurfaceContext.Provider>
  );
}
