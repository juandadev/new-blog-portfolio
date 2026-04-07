import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import {
  HeadphonesIcon,
  KeyboardIcon,
  LaptopIcon,
  MouseIcon,
} from 'lucide-react';
import FigmaIcon from '@/icons/FigmaIcon';
import v0Icon from '@/icons/V0Icon';
import PostgresqlIcon from '@/icons/PostgresqlIcon';
import ReactIcon from '@/icons/ReactIcon';
import WebstormIcon from '@/icons/WebstormIcon';
import GhosttyIcon from '@/icons/GhosttyIcon';
import BearNotesIcon from '@/icons/BearNotesIcon';
import NextjsIcon from '@/icons/NestjsIcon';
import MotionIcon from '@/icons/MotionIcon';
import GeminiIcon from '@/icons/GeminiIcon';
import CursorIcon from '@/icons/CursorIcon';
import Hook from '@/components/Pegboard/hook';

interface ToolsIUseProps {
  containerClassName?: string;
}

interface WorkTool {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const HARDWARE: WorkTool[] = [
  {
    icon: LaptopIcon,
    label: 'Macbook M5 Pro',
  },
  {
    icon: KeyboardIcon,
    label: 'NuPhy Node 100',
  },
  {
    icon: MouseIcon,
    label: 'MX Master 3S',
  },
  {
    icon: HeadphonesIcon,
    label: 'Sony XM6',
  },
];
const SOFTWARE: WorkTool[] = [
  {
    icon: WebstormIcon,
    label: 'Webstorm',
  },
  {
    icon: FigmaIcon,
    label: 'Figma',
  },
  {
    icon: GhosttyIcon,
    label: 'Ghostty',
  },
  {
    icon: BearNotesIcon,
    label: 'Bear Notes',
  },
];
const DEV: WorkTool[] = [
  {
    icon: ReactIcon,
    label: 'React',
  },
  {
    icon: NextjsIcon,
    label: 'Next.js',
  },
  {
    icon: PostgresqlIcon,
    label: 'PostgreSQL',
  },
  {
    icon: MotionIcon,
    label: 'Motion',
  },
];
const AI: WorkTool[] = [
  {
    icon: GeminiIcon,
    label: 'Gemini',
  },
  {
    icon: v0Icon,
    label: 'v0',
  },
  {
    icon: CursorIcon,
    label: 'Cursor',
  },
];

function renderList(title: string, items: WorkTool[]) {
  return (
    <div className="flex flex-col gap-4">
      <span className="font-semibold">{title}</span>
      <ul className="flex flex-col gap-2 text-sm">
        {items.map((item) => (
          <li
            key={`${title}-${item.label}`}
            className="flex items-center gap-2"
          >
            <item.icon className="size-4" /> {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ToolsIUse({ containerClassName }: ToolsIUseProps) {
  return (
    <Card className={cn('', containerClassName)}>
      <Hook />
      <CardHeader>Stuff I use daily</CardHeader>
      <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 xl:gap-4">
        {renderList('Hardware', HARDWARE)}
        {renderList('Software', SOFTWARE)}
        {renderList('Development', DEV)}
        {renderList('AI', AI)}
      </CardContent>
    </Card>
  );
}
