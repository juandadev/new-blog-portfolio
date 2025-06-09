import TwitterIcon from '@/icons/TwitterIcon';
import GitHubIcon from '@/icons/GitHubIcon';
import LinkedinIcon from '@/icons/LinkedinIcon';
import FrontendMentorIcon from '@/icons/FrontendMentorIcon';
import React from 'react';
import { ArchiveIcon, BadgeCheckIcon, FileClockIcon } from 'lucide-react';
import { badgeVariants } from '@/components/ui/Badge';
import { PostStatus } from '@/types/post';
import type { VariantProps } from 'class-variance-authority';

export const LOGIN_ERRORS = {
  NO_INVITATION: 'No se ha encontrado una invitación para esta cuenta',
  INACTIVE: 'Tu cuenta está inactiva, por favor contacta al administrador',
  DEFAULT: 'Error desconocido, por favor intenta más tarde',
};

export type LoginErrorKey = keyof typeof LOGIN_ERRORS;

export const SOCIAL_MEDIA_LINKS = [
  {
    href: 'https://x.com/juandadotdev',
    label: 'Twitter',
    icon: () => <TwitterIcon size={16} className={'text-foreground'} />,
  },
  {
    href: 'https://github.com/juandadev',
    label: 'Github',
    icon: () => <GitHubIcon size={16} className={'text-foreground'} />,
  },
  {
    href: 'https://www.linkedin.com/in/juandadev/',
    label: 'Linkedin',
    icon: () => <LinkedinIcon size={16} className={'text-foreground'} />,
  },
  {
    href: 'https://www.frontendmentor.io/profile/juandadev',
    label: 'Frontend Mentor',
    icon: () => <FrontendMentorIcon size={16} className={'text-foreground'} />,
  },
];

export const POST_STATUS: Record<
  PostStatus,
  {
    label: string;
    icon: React.ReactNode;
    variant: VariantProps<typeof badgeVariants>['variant'];
  }
> = {
  DRAFT: { label: 'Borrador', icon: <FileClockIcon />, variant: 'secondary' },
  PUBLISHED: {
    label: 'Publicado',
    icon: <BadgeCheckIcon />,
    variant: 'success',
  },
  ARCHIVED: { label: 'Archivado', icon: <ArchiveIcon />, variant: 'warning' },
};
