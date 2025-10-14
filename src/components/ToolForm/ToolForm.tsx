'use client';

import React, { useEffect } from 'react';
import { z } from 'zod';
import { Tool } from '@/types/tool';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateSlug } from '@/lib/utils';
import { toast } from 'sonner';
import { createTool, updateTool } from '@/services/tool-client';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { LinkIcon, Send, Smile, Tag, Wrench, HashIcon } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';

const toolFormSchema = z.object({
  name: z.string().min(1, { message: 'El título es requerido' }),
  slug: z.string().min(1, { message: 'El slug es requerido' }),
  description: z.string().min(1, { message: 'La descripción es requerida' }),
  category: z.string().min(1, { message: 'La categoría es requerida' }),
  icon: z.string().min(1).optional(),
  url: z.string().url({ message: 'La URL no es válida' }),
});

export type ToolFormData = z.infer<typeof toolFormSchema>;

interface ToolFormProps {
  tool?: Tool;
  method: 'POST' | 'PATCH';
}

export default function ToolForm({ tool, method }: ToolFormProps) {
  const form = useForm<ToolFormData>({
    resolver: zodResolver(toolFormSchema),
    defaultValues: {
      name: tool?.name || '',
      slug: tool?.slug || '',
      description: tool?.description || '',
      category: tool?.category || '',
      icon: tool?.icon || '',
      url: tool?.url || '',
    },
  });

  const titleValue = useWatch({ control: form.control, name: 'name' });
  const router = useRouter();

  useEffect(() => {
    const autoSlug = generateSlug(titleValue || '');

    form.setValue('slug', autoSlug);
  }, [titleValue, form]);

  const onSubmit = async (data: ToolFormData) => {
    const promiseRequest =
      method === 'POST' ? createTool(data) : updateTool(tool!.id, data);

    const successMessage = (title: string) =>
      method === 'POST'
        ? `La herramienta ${title} ha sido creada!`
        : `La herramienta ${title} ha sido modificada!`;

    toast.promise(promiseRequest, {
      loading: 'Procesando...',
      success: ({ data }) => ({
        message: successMessage(data?.name || ''),
        action: {
          label: 'Ver',
          onClick: () => router.push(`/tools`),
        },
      }),
      error: (error) => `Error: ${error.message}`,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-4xl space-y-6 p-4"
      >
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Wrench className="mr-2 h-5 w-5" />
              Información Básica
            </CardTitle>
            <CardDescription>
              Nombre y descripción de la herramienta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Nombre de la Herramienta *</FormLabel>
                  <FormControl className="space-y-2">
                    <Input
                      {...field}
                      placeholder="JSON Formatter, Color Picker, etc."
                    />
                  </FormControl>
                  {!fieldState.invalid && (
                    <FormDescription>
                      Un nombre descriptivo y fácil de recordar
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Slug */}
            <FormField
              control={form.control}
              name="slug"
              render={({ field, fieldState }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Slug (URL) *</FormLabel>
                  <div className="relative">
                    <HashIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                    <FormControl className="space-y-2">
                      <Input
                        {...field}
                        placeholder="json-formatter"
                        className="font-fira pl-10"
                      />
                    </FormControl>
                  </div>
                  {!fieldState.invalid && (
                    <FormDescription>
                      Se genera automáticamente. Será parte de la URL de tu
                      herramienta
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field, fieldState }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Descripción *</FormLabel>
                  <FormControl className="space-y-2">
                    <Textarea
                      {...field}
                      placeholder="Describe qué hace tu herramienta y cómo puede ayudar a los usuarios..."
                      className="resize-none text-base"
                    />
                  </FormControl>
                  {!fieldState.invalid && (
                    <FormDescription>
                      Una descripción clara de la funcionalidad de la
                      herramienta
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Category and Icon */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Tag className="mr-2 h-5 w-5" />
              Categoría e Icono
            </CardTitle>
            <CardDescription>
              Clasifica tu herramienta y añade un icono visual
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field, fieldState }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Categoría *</FormLabel>
                  <FormControl className="space-y-2">
                    <Input
                      {...field}
                      placeholder="Nombre de la nueva categoría"
                    />
                  </FormControl>
                  {!fieldState.invalid && (
                    <FormDescription>
                      Ayuda a organizar y filtrar tus herramientas
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Icon */}
            <FormField
              control={form.control}
              name="icon"
              render={({ field, fieldState }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Icono (Opcional)</FormLabel>
                  <div className="relative">
                    <Smile className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                    <FormControl className="space-y-2">
                      <Input
                        {...field}
                        placeholder="Elige un emoji"
                        className="pl-10"
                      />
                    </FormControl>
                  </div>
                  {!fieldState.invalid && (
                    <FormDescription>
                      Un emoji que represente visualmente tu herramienta
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* URL */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <LinkIcon className="mr-2 h-5 w-5" />
              Enlace de la Herramienta
            </CardTitle>
            <CardDescription>
              URL donde está alojada tu herramienta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="url"
              render={({ field, fieldState }) => (
                <FormItem className="space-y-2">
                  <FormLabel>URL Completa *</FormLabel>
                  <div className="relative">
                    <LinkIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                    <FormControl className="space-y-2">
                      <Input
                        {...field}
                        placeholder="https://tools.juanda.dev/mi-herramienta"
                        className="pl-10"
                      />
                    </FormControl>
                  </div>
                  {!fieldState.invalid && (
                    <FormDescription>
                      La dirección completa donde los usuarios pueden acceder a
                      tu herramienta
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Action Buttons - Fixed at bottom on mobile */}
        <div className="sticky bottom-0 -mx-4 p-4">
          <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row">
            <Button className="flex-1 sm:flex-none">
              <Send className="mr-2 h-4 w-4" />
              Publicar Herramienta
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
