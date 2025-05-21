'use client';

import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/Calendar';
import { cn, getFormattedDate } from '@/lib/utils';
import TagsInput from '@/components/ui/TagsInput';
import { PostStatus } from '@/types/post';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { createPost } from '@/services/post-client';

const postFormSchema = z.object({
  title: z.string().min(1, { message: 'El título es requerido' }),
  slug: z.string().min(1, { message: 'El slug es requerido' }),
  publishedAt: z.date({ message: 'La fecha de creación es requerida' }),
  coverImage: z.string().optional(),
  originalPostUrl: z.string().optional(),
  tags: z.array(z.string()).default([]).optional(),
  description: z.string().min(1, { message: 'La descripción es requerida' }),
  content: z.string().min(1, { message: 'El contenido es requerido' }),
});

type PostFormData = z.infer<typeof postFormSchema>;

function generateSlug(input: string) {
  return input
    .normalize('NFD') // Decompose accents: á → a + ́
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '') // Remove emojis
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special chars (keep letters, numbers, _)
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/--+/g, '-'); // Collapse multiple dashes
}

export default function PostForm() {
  const form = useForm<PostFormData>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: '',
      slug: '',
      publishedAt: new Date(),
      coverImage: '',
      originalPostUrl: '',
      tags: [],
      description: '',
      content: '',
    },
  });

  const titleValue = useWatch({ control: form.control, name: 'title' });
  const [status, setStatus] = useState<PostStatus>('PUBLISHED');
  const router = useRouter();

  useEffect(() => {
    const autoSlug = generateSlug(titleValue || '');

    form.setValue('slug', autoSlug);
  }, [titleValue, form]);

  const onSubmit = async (data: PostFormData) => {
    const postData = {
      ...data,
      status,
    };

    toast.promise(createPost(postData), {
      loading: 'Procesando...',
      success: ({ data }) => ({
        message: `El post ${data?.post.title} ha sido creado!`,
        action: {
          label: 'Ver post',
          onClick: () => router.push(`/blog/${data?.post.slug}`),
        },
      }),
      error: (error) => `Error: ${error.message}`,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={'flex flex-col gap-200'}
      >
        <FormField
          control={form.control}
          name={'title'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input {...field} placeholder={'Nuevo post...'} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={'slug'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input {...field} placeholder={'nuevo-post'} />
              </FormControl>
              <FormDescription>
                La URL amigable del post. Se genera automáticamente a partir del
                título, pero puedes modificarlo (debe ser único).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="publishedAt"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha de publicación</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'secondary'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        getFormattedDate(field.value, 'PPP')
                      ) : (
                        <span>Selecciona una fecha</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* TODO: Handle both URL and file upload. Or better yet, find a way to automatically push files to the assets repo instead of storing the blob in database */}
        <FormField
          control={form.control}
          name={'coverImage'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imagen de portada</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={
                    'https://raw.githubusercontent.com/user/repo/refs/heads/main/image.webp'
                  }
                />
              </FormControl>
              <FormDescription>
                URL de la imagen de portada del post. De momento sólo acepta
                imagenes desde raw.githubusercontent.com
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={'originalPostUrl'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL del post original</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={'https://dev.to/user/existing-post'}
                />
              </FormControl>
              <FormDescription>
                URL del post original. Si el post es un repost, puedes agregarlo
                aquí.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={() => (
            <FormItem>
              <FormLabel>Etiquetas</FormLabel>
              <FormControl>
                <TagsInput control={form.control} name="tags" />
              </FormControl>
              <FormDescription>
                Presiona Enter para agregar cada etiqueta. No hay límite…
                todavía 😅
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resumen</FormLabel>
              <FormControl>
                <Textarea
                  className={'min-h-20'}
                  placeholder="Breve resumen del post..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Si la descripción excede los 100 caracteres, el texto va a
                mostrar una ellipsis (...) en la vista previa
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contenido</FormLabel>
              <FormControl>
                <Textarea
                  className={'min-h-96'}
                  placeholder="Contenido del post en markdown..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className={'flex gap-200'}>
          <Button type="submit" onClick={() => setStatus('PUBLISHED')}>
            Publicar post
          </Button>
          <Button
            type="submit"
            variant={'outline'}
            onClick={() => setStatus('DRAFT')}
          >
            Guardar para después
          </Button>
        </div>
      </form>
    </Form>
  );
}
