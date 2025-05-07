'use client';

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import { Skeleton } from '@/components/ui/Skeleton';

function AvatarLink() {
  return (
    <Avatar className={'rounded-10 h-[40px] w-[40px]'} asChild>
      <Link href={'/'}>
        <AvatarImage src="https://github.com/juandadev.png" />
        <AvatarFallback>JM</AvatarFallback>
      </Link>
    </Avatar>
  );
}

const MENU_LINKS = [
  {
    title: 'Panel',
    href: '/dashboard',
    description: 'Página principal',
  },
  {
    title: 'Administrador de Posts',
    href: '/dashboard/posts',
    description: 'Crear, editar y eliminar posts',
  },
  {
    title: 'Administrador de Usuarios',
    href: '/dashboard/users',
    description: 'Crear, editar y eliminar usuarios',
  },
];

function AvatarMenu() {
  const { data } = useSession();
  const getInitials =
    data!.user.name!.split(' ')[0][0] + data!.user.name!.split(' ')[1][0];

  return <div>foo</div>;
}

export default function UserMenu() {
  const { status } = useSession();

  if (status === 'loading')
    return <Skeleton className={'rounded-10 h-[40px] w-[40px]'} />;

  if (status === 'unauthenticated') return <AvatarLink />;

  if (status === 'authenticated') return <AvatarMenu />;
}
