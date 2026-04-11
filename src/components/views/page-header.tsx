import React from 'react';

interface PostHeaderProps {
  title: string;
  text?: string;
}

export default function PageHeader({ title, text }: PostHeaderProps) {
  return (
    <header className="space-y-3">
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
