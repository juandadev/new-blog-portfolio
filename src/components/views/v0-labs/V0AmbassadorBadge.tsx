import React from 'react';

export default function V0AmbassadorBadge() {
  return (
    <div className="border-primary/50 bg-primary/10 inline-flex items-center gap-2 rounded-full border px-3 py-1.5">
      <span className="relative flex h-2 w-2">
        <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
        <span className="bg-primary relative inline-flex h-2 w-2 rounded-full" />
      </span>
      <span className="text-primary font-mono text-xs">v0 ambassador</span>
    </div>
  );
}
