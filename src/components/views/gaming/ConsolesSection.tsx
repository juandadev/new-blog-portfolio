import React from 'react';
import Image from 'next/image';
import type { Console } from '@/types/gaming';
import { Joystick } from 'lucide-react';

interface ConsolesSectionProps {
  consoles: Console[];
}

export function ConsolesSection({ consoles }: ConsolesSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Joystick className="text-accent h-5 w-5" />
        <h2 className="text-foreground text-xl font-bold">Consoles</h2>
      </div>
      <div className="grid gap-4">
        {consoles.map((console) => (
          <div
            key={console.name}
            className="border-border bg-card hover:border-accent/50 group flex flex-col gap-4 rounded-lg border p-4 transition-colors sm:flex-row"
          >
            <div className="bg-muted relative mx-auto h-24 w-24 shrink-0 overflow-hidden rounded-md sm:mx-0">
              <Image
                src={console.image || '/placeholder.svg'}
                alt={console.name}
                fill
                className="object-cover transition-transform duration-300 ease-out motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-105"
              />
            </div>
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="text-foreground font-semibold">{console.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {console.story}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
