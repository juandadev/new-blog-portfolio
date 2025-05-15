import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toZonedTime } from 'date-fns-tz';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setRealViewportHeight() {
  const vh = window.innerHeight * 0.01;

  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

export function getFormattedDate(date: Date, formatStr: string) {
  const zonedDate = toZonedTime(date, 'America/Mexico_City');
  const formattedDate = format(zonedDate, formatStr, { locale: es });

  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
}
