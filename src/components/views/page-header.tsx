import React from 'react';
import { ArrowLeftIcon } from 'lucide-react';
import Link from '@/components/ui/Link';

interface PostHeaderProps {
  title: string;
  text?: string;
}

export default function PageHeader({ title, text }: PostHeaderProps) {
  return (
    <header className="space-y-3">
      <Link
        href="/"
        className="hover:text-primary text-muted-foreground font-script flex w-fit items-center gap-2 p-2 text-2xl transition-colors md:hidden"
      >
        <ArrowLeftIcon />
        Back to Home
      </Link>
      <h1 className="text-foreground font-script text-5xl font-semibold tracking-tight">
        {title}
      </h1>
      {text && (
        <p className="text-muted-foreground mb-5 max-w-2xl text-base leading-relaxed">
          {text}
        </p>
      )}
    </header>
  );
}
