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
  name: z.string().min(1, { message: 'Name is required' }),
  slug: z.string().min(1, { message: 'Slug is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  category: z.string().min(1, { message: 'Category is required' }),
  icon: z.string().min(1).optional(),
  url: z.string().url({ message: 'URL is not valid' }),
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
        ? `Tool ${title} has been created!`
        : `Tool ${title} has been updated!`;

    toast.promise(promiseRequest, {
      loading: 'Processing...',
      success: ({ data }) => ({
        message: successMessage(data?.name || ''),
        action: {
          label: 'View',
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
              Basic Information
            </CardTitle>
            <CardDescription>Tool name and description</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Tool Name *</FormLabel>
                  <FormControl className="space-y-2">
                    <Input
                      {...field}
                      placeholder="JSON Formatter, Color Picker, etc."
                    />
                  </FormControl>
                  {!fieldState.invalid && (
                    <FormDescription>
                      A descriptive and memorable name
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
                      Automatically generated. Will be part of your tool&apos;s
                      URL
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
                  <FormLabel>Description *</FormLabel>
                  <FormControl className="space-y-2">
                    <Textarea
                      {...field}
                      placeholder="Describe what your tool does and how it can help users..."
                      className="resize-none text-base"
                    />
                  </FormControl>
                  {!fieldState.invalid && (
                    <FormDescription>
                      A clear description of the tool&apos;s functionality
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
              Category and Icon
            </CardTitle>
            <CardDescription>
              Classify your tool and add a visual icon
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field, fieldState }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Category *</FormLabel>
                  <FormControl className="space-y-2">
                    <Input {...field} placeholder="New category name" />
                  </FormControl>
                  {!fieldState.invalid && (
                    <FormDescription>
                      Helps organize and filter your tools
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
                  <FormLabel>Icon (Optional)</FormLabel>
                  <div className="relative">
                    <Smile className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                    <FormControl className="space-y-2">
                      <Input
                        {...field}
                        placeholder="Choose an emoji"
                        className="pl-10"
                      />
                    </FormControl>
                  </div>
                  {!fieldState.invalid && (
                    <FormDescription>
                      An emoji that visually represents your tool
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
              Tool Link
            </CardTitle>
            <CardDescription>URL where your tool is hosted</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="url"
              render={({ field, fieldState }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Full URL *</FormLabel>
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
                      The full address where users can access your tool
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
              {method === 'POST' ? 'Publish Tool' : 'Update Tool'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
