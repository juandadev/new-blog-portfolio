import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toZonedTime } from 'date-fns-tz';
import { format } from 'date-fns';
import { visit } from 'unist-util-visit';
import React, { isValidElement } from 'react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFormattedDate(date: string, formatStr: string) {
  const zonedDate = toZonedTime(date, 'America/Mexico_City');
  const formattedDate = format(zonedDate, formatStr);

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
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
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

export function formatViewCount(count: number): string {
  if (count < 1000) {
    return count.toLocaleString();
  }

  if (count < 1_000_000) {
    return (
      (count / 1000).toFixed(count < 10_000 ? 1 : 0).replace(/\.0$/, '') + 'k'
    );
  }

  if (count < 1_000_000_000) {
    return (
      (count / 1_000_000)
        .toFixed(count < 10_000_000 ? 1 : 0)
        .replace(/\.0$/, '') + 'M'
    );
  }

  return (count / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B'; // e.g. 1.1B
}

export function getReadTime(text: string): number {
  const wordsPerMinute = 200;

  const words = text.trim().split(/\s+/).length;

  return Math.ceil(words / wordsPerMinute);
}

export function generateSlug(input: string) {
  return input
    .normalize('NFD') // Decompose accents: á → a + ́
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '') // Remove emojis
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special chars (keep letters, numbers, _)
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/--+/g, '-'); // Collapse multiple dashes
}

/** Individual post route (/blog/slug), not the blog index (/blog). */
export function isBlogPostPath(pathname: string | null): boolean {
  if (!pathname) return false;
  const segments = pathname.split('/').filter(Boolean);
  return segments.length === 2 && segments[0] === 'blog';
}
