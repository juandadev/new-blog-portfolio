'use client';

import { useSession } from 'next-auth/react';
import { useSidebar } from '@/components/ui/Sidebar';
import React from 'react';
import { PanelLeftIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ControlPanelTrigger() {
  const { status } = useSession();
  const { toggleSidebar } = useSidebar();

  if (status === 'unauthenticated' || status === 'loading') return null;

  return (
    <Button variant="ghost" size="icon" onClick={toggleSidebar}>
      <PanelLeftIcon size={20} />
    </Button>
  );
}
