import React from 'react';
import { cn } from '@/lib/utils';
import Hook from '@/components/Pegboard/hook';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

interface LegoPiecesProps {
  containerClassName?: string;
}

// TODO: this is the Brickver link which displays my full LEGO collection https://brickver.com/@juandadev
export default function LegoPieces({ containerClassName }: LegoPiecesProps) {
  return (
    <Card className={cn(containerClassName)}>
      <Hook />
      <CardHeader>Lego Pieces</CardHeader>
      <CardContent className="space-y-2">
        <p>42,343</p>
      </CardContent>
    </Card>
  );
}
