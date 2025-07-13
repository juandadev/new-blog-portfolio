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
import {
  CalendarIcon,
  FileTextIcon,
  HashIcon,
  ImageIcon,
  LinkIcon,
} from 'lucide-react';
import { Calendar } from '@/components/ui/Calendar';
import { getFormattedDate } from '@/lib/utils';
import TagsInput from '@/components/ui/TagsInput';
import { Post, PostStatus } from '@/types/post';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { createPost, updatePost } from '@/services/post-client';
import { clsx } from 'clsx';
import MarkdownEditor from '@/components/PostForm/MarkdownEditor';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';

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

export type PostFormData = z.infer<typeof postFormSchema>;

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

interface PostFormProps {
  post?: Post;
  method?: 'POST' | 'PATCH';
}

export default function PostForm({ post, method = 'POST' }: PostFormProps) {
  const form = useForm<PostFormData>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      publishedAt: post?.publishedAt ? new Date(post.publishedAt) : new Date(),
      coverImage: post?.coverImage || '',
      originalPostUrl: post?.originalPostUrl || '',
      tags: post?.tags || [],
      description: post?.description || '',
      content: post?.content || '',
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
    const promiseRequest =
      method === 'POST' ? createPost(postData) : updatePost(post!.id, postData);
    const successMessage = (title: string) =>
      method === 'POST'
        ? `El post ${title} ha sido creado!`
        : `El post ${title} ha sido modificado!`;

    toast.promise(promiseRequest, {
      loading: 'Procesando...',
      success: ({ data }) => ({
        message: successMessage(data?.post.title || ''),
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
        <Card>
          <CardHeader>
            <CardTitle>
              <FileTextIcon size={20} /> Información Básica
            </CardTitle>
            <CardDescription>
              Título, URL y fecha de publicación de tu artículo
            </CardDescription>
          </CardHeader>
          <CardContent className={'flex flex-col gap-4'}>
            <FormField
              control={form.control}
              name={'title'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título del Post *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={
                        'Escribe un título atractivo para tu post...'
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Un buen título es claro, descriptivo y atrae la atención del
                    lector
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={'slug'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL del Post (Slug) *</FormLabel>
                  <FormControl>
                    <div className={'relative'}>
                      <HashIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                      <Input
                        {...field}
                        placeholder={'url-del-post'}
                        className={'font-fira pl-10'}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Se genera automáticamente desde el título. Usa solo letras,
                    números y guiones
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
                  <FormLabel>Fecha de Publicación *</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'dashboard-outline'}
                          size={'sm'}
                          className={clsx(
                            'text-preset-7 w-full justify-start text-left',
                            !field.value && 'text-muted-foreground'
                          )}
                          aria-describedby="date-help"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            getFormattedDate(
                              field.value.toISOString(),
                              'MM/dd/yyyy'
                            )
                          ) : (
                            <span>Selecciona una fecha</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        defaultMonth={field.value}
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription id="date-help">
                    Por defecto es hoy. Puedes seleccionar fechas pasadas si es
                    necesario
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <ImageIcon size={20} /> Medios y SEO
            </CardTitle>
            <CardDescription>
              Imagen de portada y configuración SEO
            </CardDescription>
          </CardHeader>
          <CardContent className={'flex flex-col gap-4'}>
            {/* TODO: Handle both URL and file upload. Or better yet, find a way to automatically push files to the assets repo instead of storing the blob in database */}
            {/* TODO: Add another field to add credits for taking a cover photo with policies like Unsplash.com */}
            <FormField
              control={form.control}
              name={'coverImage'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL de Imagen de Portada</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={'https://raw.githubusercontent.com/'}
                    />
                  </FormControl>
                  <FormDescription>
                    URL completa de la imagen que aparecerá como portada del
                    post. De momento sólo acepta imagenes desde
                    raw.githubusercontent.com
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
                  <FormLabel>URL Canónica</FormLabel>
                  <FormControl>
                    <div className={'relative'}>
                      <LinkIcon
                        className={
                          'absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400'
                        }
                      />
                      <Input
                        {...field}
                        placeholder={'https://dev.to/user/existing-post'}
                        className={'pl-10'}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Solo si este post fue publicado originalmente en otro sitio
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

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
                Si la descripción excede los 125 caracteres, el texto va a
                mostrar una ellipsis (...) en la vista previa
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={() => (
            <FormItem>
              <FormLabel>Contenido</FormLabel>
              <FormControl>
                <MarkdownEditor
                  name={'content'}
                  control={form.control}
                  placeholder={'Contenido del post en markdown...'}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className={'flex flex-col gap-200 md:flex-row'}>
          <Button type="submit" onClick={() => setStatus('PUBLISHED')}>
            {method === 'PATCH' ? 'Actualizar Post' : 'Publicar Post'}
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
