import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { coffeeData } from '@/data/coffee-data';

export function CoffeeStorySection() {
  return (
    <>
      {coffeeData.journey.map((milestone) => (
        <Card key={milestone.title} className="h-full">
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
