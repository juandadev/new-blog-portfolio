import React from 'react';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="max-w-app relative mx-auto h-full w-full">
      <div className="relative grid grid-cols-1 place-items-stretch gap-6 md:grid-cols-3 xl:grid-cols-5">
        {children}
      </div>
    </main>
  );
}
