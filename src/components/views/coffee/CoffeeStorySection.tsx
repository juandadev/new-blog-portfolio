import React from 'react';
import { coffeeStory, coffeeJourney } from '@/data/coffee-data';

export function CoffeeStorySection() {
  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          {coffeeStory.headline}
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {coffeeStory.intro}
        </p>
        <p className="text-muted-foreground leading-relaxed">
          {coffeeStory.body}
        </p>
      </div>
      <div className="border-border relative mt-8 space-y-6 pl-6">
        {coffeeJourney.map((milestone) => (
          <div key={milestone.year} className="relative">
            <div className="bg-primary border-background absolute top-1 -left-[25px] h-3 w-3 rounded-full border-2" />
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-primary font-mono text-xs">
                  {milestone.year}
                </span>
                <span className="text-sm font-medium">{milestone.title}</span>
              </div>
              <p className="text-muted-foreground text-sm">
                {milestone.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
