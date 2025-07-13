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
      <div className="sticky top-[70px] z-10 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
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
            <Typography className="text-sm text-gray-500">
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
