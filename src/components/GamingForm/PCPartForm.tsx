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
import { Monitor, Send } from 'lucide-react';
import { PCPart } from '@/types/gaming';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { createPCPart, updatePCPart } from '@/services/gaming-client';

const pcPartFormSchema = z.object({
  component: z.string().min(1, { message: 'Component is required' }),
  name: z.string().min(1, { message: 'Name is required' }),
  notes: z.string().optional(),
  order: z.number().int().default(0),
});

export type PCPartFormData = z.infer<typeof pcPartFormSchema>;

interface PCPartFormProps {
  part?: PCPart;
  method?: 'POST' | 'PATCH';
}

export default function PCPartForm({ part, method = 'POST' }: PCPartFormProps) {
  const form = useForm<PCPartFormData>({
    resolver: zodResolver(pcPartFormSchema),
    defaultValues: {
      component: part?.component || '',
      name: part?.name || '',
      notes: part?.notes || '',
      order: part?.order || 0,
    },
  });

  const router = useRouter();

  const onSubmit = async (data: PCPartFormData) => {
    const promiseRequest =
      method === 'POST' ? createPCPart(data) : updatePCPart(part!.id, data);

    const successMessage = (name: string) =>
      method === 'POST'
        ? `PC part ${name} has been created!`
        : `PC part ${name} has been updated!`;

    toast.promise(promiseRequest, {
      loading: 'Processing...',
      success: ({ data }) => {
        const message = successMessage(data?.name || '');
        return {
          message,
          action: {
            label: 'View',
            onClick: () => router.push('/dashboard/gaming/pc-build'),
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
              <Monitor className="mr-2 h-5 w-5" />
              PC Part Information
            </CardTitle>
            <CardDescription>Enter PC part details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="component"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Component *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="CPU, GPU, RAM, etc." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Full component name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Add any notes about this component..."
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
              {method === 'POST' ? 'Create PC Part' : 'Update PC Part'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
