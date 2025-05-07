'use client';

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/Drawer';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { Heading } from '@/components/ui/Heading';
import { Typography } from '@/components/Typography/Typography';
import { LogOutIcon } from 'lucide-react';

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

function AvatarMenu() {
  const { data } = useSession();
  const getInitials =
    data!.user.name!.split(' ')[0][0] + data!.user.name!.split(' ')[1][0];

  return (
    <Drawer direction={'left'}>
      <DrawerTrigger asChild>
        <Button variant={'icon'} size={'icon'}>
          <Avatar className={'rounded-10 h-[40px] w-[40px]'}>
            <AvatarImage src={data?.user?.profilePicture || ''} />
            <AvatarFallback>{getInitials}</AvatarFallback>
          </Avatar>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle asChild>
            <Heading level={2} preset={6}>
              Menú de {data?.user.name}
            </Heading>
          </DrawerTitle>
          <DrawerDescription asChild>
            <Typography preset={8}>
              {data?.user.role === 'ADMIN' ? 'Administrador' : 'Invitado'}
            </Typography>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button onClick={() => signOut({ callbackUrl: '/' })}>
              Cerrar Sesión
              <LogOutIcon size={16} />
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default function UserMenu() {
  const { status, ...session } = useSession();
  console.log(session);

  if (status === 'loading')
    return <Skeleton className={'rounded-10 h-[40px] w-[40px]'} />;

  if (status === 'unauthenticated') return <AvatarLink />;

  if (status === 'authenticated') return <AvatarMenu />;
}
