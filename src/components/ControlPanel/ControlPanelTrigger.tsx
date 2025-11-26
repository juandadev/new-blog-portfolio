'use client';

import { useSidebar } from '@/components/ui/Sidebar';
import React from 'react';
import { PanelLeftIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ControlPanelTrigger() {
  const { toggleSidebar } = useSidebar();

  return (
    <Button variant="ghost" size="icon" onClick={toggleSidebar}>
      <PanelLeftIcon size={20} />
    </Button>
  );
}
