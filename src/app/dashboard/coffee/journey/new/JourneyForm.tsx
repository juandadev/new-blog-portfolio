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
import { MapPin, Send } from 'lucide-react';
import { CoffeeJourneyMilestone } from '@/types/coffee';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {
  createCoffeeJourneyMilestone,
  updateCoffeeJourneyMilestone,
} from '@/services/coffee-client';

const journeyFormSchema = z.object({
  year: z.string().min(1, { message: 'Year is required' }),
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  order: z.number().int().default(0),
});

export type JourneyFormData = z.infer<typeof journeyFormSchema>;

interface JourneyFormProps {
  milestone?: CoffeeJourneyMilestone;
  method?: 'POST' | 'PATCH';
}

export default function JourneyForm({
  milestone,
  method = 'POST',
}: JourneyFormProps) {
  const form = useForm<JourneyFormData>({
    resolver: zodResolver(journeyFormSchema),
    defaultValues: {
      year: milestone?.year || '',
      title: milestone?.title || '',
      description: milestone?.description || '',
      order: milestone?.order || 0,
    },
  });

  const router = useRouter();

  const onSubmit = async (data: JourneyFormData) => {
    const promiseRequest =
      method === 'POST'
        ? createCoffeeJourneyMilestone(data)
        : updateCoffeeJourneyMilestone(milestone!.id, data);

    const successMessage = (title: string) =>
      method === 'POST'
        ? `Milestone ${title} has been created!`
        : `Milestone ${title} has been updated!`;

    toast.promise(promiseRequest, {
      loading: 'Processing...',
      success: ({ data }) => {
        const message = successMessage(data?.title || '');
        return {
          message,
          action: {
            label: 'View',
            onClick: () => router.push('/dashboard/coffee/journey'),
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
              <MapPin className="mr-2 h-5 w-5" />
              Milestone Information
            </CardTitle>
            <CardDescription>Enter milestone details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Year" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Milestone title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description *</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter description"
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
              {method === 'POST' ? 'Create Milestone' : 'Update Milestone'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
