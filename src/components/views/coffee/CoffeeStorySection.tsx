import React from 'react';
import { CoffeeJourneyMilestone } from '@/types/coffee';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

interface CoffeeStorySectionProps {
  journey: CoffeeJourneyMilestone[];
}

export function CoffeeStorySection({ journey }: CoffeeStorySectionProps) {
  return (
    <>
      {journey.map((milestone) => (
        <Card key={milestone.title}>
          <CardHeader className="text-card-foreground flex gap-3 text-2xl">
            <span className="text-primary">{milestone.year}</span>
            <span>{milestone.title}</span>
          </CardHeader>
          <CardContent className="text-sm">{milestone.description}</CardContent>
        </Card>
      ))}
    </>
  );
}
