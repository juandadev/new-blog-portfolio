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
import { Joystick, Send } from 'lucide-react';
import { Console } from '@/types/gaming';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { createConsole, updateConsole } from '@/services/gaming-client';
import { ImageUpload } from './ImageUpload';

const consoleFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  image: z.string().url({ message: 'Image must be a valid URL' }),
  story: z.string().min(1, { message: 'Story is required' }),
  order: z.number().int(),
});

export type ConsoleFormData = z.infer<typeof consoleFormSchema>;

interface ConsoleFormProps {
  console?: Console;
  method?: 'POST' | 'PATCH';
}

export default function ConsoleForm({
  console: consoleData,
  method = 'POST',
}: ConsoleFormProps) {
  const form = useForm<ConsoleFormData>({
    resolver: zodResolver(consoleFormSchema),
    defaultValues: {
      name: consoleData?.name || '',
      image: consoleData?.image || '',
      story: consoleData?.story || '',
      order: consoleData?.order || 0,
    },
  });

  const router = useRouter();

  const onSubmit = async (data: ConsoleFormData) => {
    const promiseRequest =
      method === 'POST'
        ? createConsole(data)
        : updateConsole(consoleData!.id, data);

    const successMessage = (name: string) =>
      method === 'POST'
        ? `Console ${name} has been created!`
        : `Console ${name} has been updated!`;

    toast.promise(promiseRequest, {
      loading: 'Processing...',
      success: ({ data }) => {
        const message = successMessage(data?.name || '');
        return {
          message,
          action: {
            label: 'View',
            onClick: () => router.push('/dashboard/gaming/consoles'),
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
              <Joystick className="mr-2 h-5 w-5" />
              Console Information
            </CardTitle>
            <CardDescription>Enter console details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Console name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
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
              name="story"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Story *</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Tell the story of this console..."
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
              {method === 'POST' ? 'Create Console' : 'Update Console'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
