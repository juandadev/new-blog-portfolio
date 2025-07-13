import React from 'react';
import { Heading } from '@/components/ui/Heading';
import PostForm from '@/components/PostForm/PostForm';
import { Button } from '@/components/ui/Button';
import { ArrowLeftIcon, SaveIcon, SendIcon } from 'lucide-react';
import Link from 'next/link';
import { Typography } from '@/components/Typography/Typography';

export default function CreatePostPage() {
  return (
    <div className={'flex flex-col gap-300'}>
      <div className="border-border bg-background sticky top-[70px] z-10 flex flex-col items-center justify-between gap-1 border-b py-3 md:flex-row md:gap-0">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className={'text-sm font-medium'}
          >
            <Link href="/dashboard/posts">
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Volver
            </Link>
          </Button>
          <div>
            <Heading className={'text-lg font-semibold'}>
              Crear Nuevo Post
            </Heading>
            <Typography className="hidden text-sm text-gray-500 md:block">
              Completa la información de tu artículo
            </Typography>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="dashboard-outline" size="sm">
            <SaveIcon className="mr-2 h-4 w-4" />
            Guardar Borrador
          </Button>
          <Button variant={'dashboard'} size="sm">
            <SendIcon className="mr-2 h-4 w-4" />
            Publicar
          </Button>
        </div>
      </div>
      <PostForm />
    </div>
  );
}
