import React from 'react';
import HeroSection from '@/components/views/homepage/HeroSection';
import { AboutSection } from '@/components/views/homepage/AboutSection';

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <HeroSection />
      <AboutSection />
    </div>
  );
}
