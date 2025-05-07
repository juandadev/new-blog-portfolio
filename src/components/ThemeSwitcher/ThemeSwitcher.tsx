'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useMounted } from '@/hooks/useMounted';
import { Typography } from '@/components/Typography/Typography';
import { DropdownMenuItem } from '@/components/ui/DropdownMenu';

export default function ThemeSwitcher({ item = false }: { item?: boolean }) {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) return null;

  const isDarkMode =
    theme === 'dark' ||
    (theme === 'system' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  const handleThemeSwitch = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  if (item)
    return (
      <DropdownMenuItem onSelect={handleThemeSwitch}>
        <Typography as={'span'} preset={9}>
          {isDarkMode ? <SunIcon /> : <MoonIcon />}
          {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
        </Typography>
      </DropdownMenuItem>
    );

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
