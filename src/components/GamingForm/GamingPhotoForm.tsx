'use client';

import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Image as ImageIcon, Send } from 'lucide-react';
import { GamingPhoto } from '@/types/gaming';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { createGamingPhoto, updateGamingPhoto } from '@/services/gaming-client';
import { ImageUpload } from './ImageUpload';

const gamingPhotoFormSchema = z.object({
  src: z.string().url({ message: 'Image must be a valid URL' }),
  alt: z.string().min(1, { message: 'Alt text is required' }),
  order: z.number().int(),
});

export type GamingPhotoFormData = z.infer<typeof gamingPhotoFormSchema>;

interface GamingPhotoFormProps {
  photo?: GamingPhoto;
  method?: 'POST' | 'PATCH';
}

export default function GamingPhotoForm({
  photo,
  method = 'POST',
}: GamingPhotoFormProps) {
  const form = useForm<GamingPhotoFormData>({
    resolver: zodResolver(gamingPhotoFormSchema),
    defaultValues: {
      src: photo?.src || '',
      alt: photo?.alt || '',
      order: photo?.order || 0,
    },
  });

  const router = useRouter();

  const onSubmit = async (data: GamingPhotoFormData) => {
    const promiseRequest =
      method === 'POST'
        ? createGamingPhoto(data)
        : updateGamingPhoto(photo!.id, data);

    const successMessage = (alt: string) =>
      method === 'POST'
        ? `Photo ${alt} has been created!`
        : `Photo ${alt} has been updated!`;

    toast.promise(promiseRequest, {
      loading: 'Processing...',
      success: ({ data }) => {
        const message = successMessage(data?.alt || '');
        return {
          message,
          action: {
            label: 'View',
            onClick: () => router.push('/dashboard/gaming/gallery'),
          },
        };
      },
      error: (error) => `Error: ${error.message}`,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-4xl space-y-6 p-4"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <ImageIcon className="mr-2 h-5 w-5" />
              Gallery Photo Information
            </CardTitle>
            <CardDescription>Enter gallery photo details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="src"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image *</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value}
                      onChange={field.onChange}
                      description="Enter image URL or upload from your computer"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="alt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alt Text *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Description of the image" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 0)
                      }
                      placeholder="0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="sticky bottom-0 -mx-4 p-4">
          <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row">
            <Button className="flex-1 sm:flex-none" type="submit">
              <Send className="mr-2 h-4 w-4" />
              {method === 'POST' ? 'Create Photo' : 'Update Photo'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
