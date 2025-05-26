import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toZonedTime } from 'date-fns-tz';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { visit } from 'unist-util-visit';
import React, { isValidElement } from 'react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFormattedDate(date: string, formatStr: string) {
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

export function extractTextFromNode(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(extractTextFromNode).join('');
  }

  if (isValidElement(node)) {
    // @ts-expect-error children is not always defined
    return extractTextFromNode(node.props.children);
  }

  return '';
}

export function normalizeWhitespace(str: string): string {
  return str
    .replace(/\u00A0/g, ' ') // Non-breaking space → normal space
    .replace(/\u200B/g, '') // Zero-width space → nothing
    .replace(/\r\n|\r/g, '\n'); // Normalize line endings
}
