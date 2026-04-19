import React from 'react';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="max-w-app relative mx-auto h-full w-full">
      <div className="relative grid grid-cols-1 grid-rows-[repeat(2,auto)_minmax(365px,auto)] place-items-stretch gap-6 md:grid-cols-3 md:grid-rows-[minmax(0,320px)_minmax(365px,auto)] xl:grid-cols-5 xl:grid-rows-[minmax(0,320px)]">
        {children}
      </div>
    </main>
  );
}
