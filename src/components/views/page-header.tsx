import React from 'react';
import { ArrowLeftIcon } from 'lucide-react';
import Link from '@/components/ui/Link';
import { Card, CardContent, CardTitle } from '@/components/ui/Card';

interface PostHeaderProps {
  title: string;
  text?: string;
  isCard?: boolean;
}

export default function PageHeader({
  title,
  text,
  isCard = false,
}: PostHeaderProps) {
  return isCard ? (
    <Card className="md:col-span-3" withHook={false} withAnimation={false}>
      <CardTitle className="font-script text-5xl font-semibold tracking-tight">
        {title}
      </CardTitle>
      {text && (
        <CardContent className="text-muted-foreground mb-5 text-base leading-relaxed">
          {text}
        </CardContent>
      )}
    </Card>
  ) : (
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
