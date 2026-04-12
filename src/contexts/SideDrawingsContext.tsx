'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const STORAGE_KEY = 'juanda-side-drawings-visible';

type SideDrawingsContextValue = {
  sideDrawingsVisible: boolean;
  setSideDrawingsVisible: (visible: boolean) => void;
  toggleSideDrawings: () => void;
};

const SideDrawingsContext = createContext<SideDrawingsContextValue | null>(
  null
);

export function SideDrawingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sideDrawingsVisible, setSideDrawingsVisibleState] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'false') {
        // After mount only: avoids SSR/localStorage hydration mismatch.
        // eslint-disable-next-line react-hooks/set-state-in-effect -- sync from localStorage post-hydration
        setSideDrawingsVisibleState(false);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const persist = useCallback((visible: boolean) => {
    try {
      localStorage.setItem(STORAGE_KEY, String(visible));
    } catch {
      /* ignore */
    }
  }, []);

  const setSideDrawingsVisible = useCallback(
    (visible: boolean) => {
      setSideDrawingsVisibleState(visible);
      persist(visible);
    },
    [persist]
  );

  const toggleSideDrawings = useCallback(() => {
    setSideDrawingsVisibleState((prev) => {
      const next = !prev;
      persist(next);
      return next;
    });
  }, [persist]);

  const value = useMemo(
    () => ({
      sideDrawingsVisible,
      setSideDrawingsVisible,
      toggleSideDrawings,
    }),
    [sideDrawingsVisible, setSideDrawingsVisible, toggleSideDrawings]
  );

  return (
    <SideDrawingsContext.Provider value={value}>
      {children}
    </SideDrawingsContext.Provider>
  );
}

export function useSideDrawings() {
  const ctx = useContext(SideDrawingsContext);
  if (!ctx) {
    return {
      sideDrawingsVisible: true,
      setSideDrawingsVisible: () => {},
      toggleSideDrawings: () => {},
    };
  }
  return ctx;
}
