import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toZonedTime } from 'date-fns-tz';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { visit } from 'unist-util-visit';

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

export function remarkCallouts() {
  // @ts-expect-error can't resolve this any type
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === 'containerDirective' &&
        ['default', 'error', 'warning', 'info', 'success', 'tip'].includes(
          node.name
        )
      ) {
        node.data = {
          hName: 'div',
          hProperties: {
            className: [`callout ${node.name}`],
          },
        };
      }
    });
  };
}

export const truncateText = (text: string, maxLength = 100) => {
  return text.length > maxLength ? text.slice(0, maxLength) + ' …' : text;
};

export const getInitials = (name: string) => name[0] + name[1];
