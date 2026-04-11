import React from 'react';
import Image from 'next/image';
import { CoffeeGear } from '@/types/coffee';
import { cn } from '@/lib/utils';

function GearCard({
  gear,
  featured = false,
}: {
  gear: CoffeeGear;
  featured?: boolean;
}) {
  return (
    <div
      className={cn(
        'group border-border bg-card relative overflow-hidden rounded-lg border transition-all duration-300',
        'hover:border-primary/50 hover:shadow-primary/5 hover:shadow-lg',
        featured && 'md:col-span-2 md:row-span-2'
      )}
    >
      <div
        className={cn('relative aspect-square', featured && 'md:aspect-[4/3]')}
      >
        <Image
          src={gear.image || '/placeholder.svg'}
          alt={`${gear.brand} ${gear.name}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="from-background via-background/20 absolute inset-0 bg-gradient-to-t to-transparent" />
      </div>
      <div className="absolute right-0 bottom-0 left-0 space-y-1 p-4">
        <span className="text-primary font-mono text-xs tracking-wider uppercase">
          {gear.brand}
        </span>
        <h3 className="text-foreground font-semibold">{gear.name}</h3>
      </div>
    </div>
  );
}

interface CoffeeGearGridProps {
  gear: CoffeeGear[];
}

export function CoffeeGearGrid({ gear }: CoffeeGearGridProps) {
  const mainGear = gear.filter(
    (g) => g.category === 'machine' || g.category === 'grinder'
  );
  const accessories = gear.filter(
    (g) => g.category === 'accessories' || g.category === 'beans'
  );

  if (gear.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">The Gear</h2>
        <p className="text-muted-foreground text-sm">
          Current setup and accessories. Still growing.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {mainGear.map((item) => (
          <GearCard key={item.name} gear={item} featured />
        ))}
        {accessories.map((item) => (
          <GearCard key={item.name} gear={item} />
        ))}
      </div>
    </section>
  );
}
