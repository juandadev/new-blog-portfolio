'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDarkMode = theme === 'dark';

  const handleThemeSwitch = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <Button
      variant={'icon'}
      size={'icon'}
      className={
        'border border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900'
      }
      onClick={handleThemeSwitch}
    >
      {isDarkMode ? <SunIcon size={16} /> : <MoonIcon size={16} />}
    </Button>
  );
}
