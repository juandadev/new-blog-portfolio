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
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Image as ImageIcon, Send } from 'lucide-react';
import { CoffeePhoto } from '@/types/coffee';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { createCoffeePhoto, updateCoffeePhoto } from '@/services/coffee-client';
import { ImageUpload } from '@/components/GamingForm/ImageUpload';

const galleryFormSchema = z.object({
  src: z.string().url({ message: 'Image must be a valid URL' }),
  alt: z.string().min(1, { message: 'Alt text is required' }),
  caption: z.string().optional(),
  order: z.number().int().default(0),
});

export type GalleryFormData = z.infer<typeof galleryFormSchema>;

interface GalleryFormProps {
  photo?: CoffeePhoto;
  method?: 'POST' | 'PATCH';
}

export default function GalleryForm({
  photo,
  method = 'POST',
}: GalleryFormProps) {
  const form = useForm<GalleryFormData>({
    resolver: zodResolver(galleryFormSchema),
    defaultValues: {
      src: photo?.src || '',
      alt: photo?.alt || '',
      caption: photo?.caption || '',
      order: photo?.order || 0,
    },
  });

  const router = useRouter();

  const onSubmit = async (data: GalleryFormData) => {
    const promiseRequest =
      method === 'POST'
        ? createCoffeePhoto(data)
        : updateCoffeePhoto(photo!.id, data);

    const successMessage = () =>
      method === 'POST' ? 'Photo has been created!' : 'Photo has been updated!';

    toast.promise(promiseRequest, {
      loading: 'Processing...',
      success: () => {
        const message = successMessage();
        return {
          message,
          action: {
            label: 'View',
            onClick: () => router.push('/dashboard/coffee/gallery'),
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
              Photo Information
            </CardTitle>
            <CardDescription>Enter photo details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="src"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL *</FormLabel>
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
                    <Input {...field} placeholder="Alt text for image" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="caption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Caption (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter caption"
                      className="resize-none"
                    />
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
                      {...field}
                      type="number"
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 0)
                      }
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
