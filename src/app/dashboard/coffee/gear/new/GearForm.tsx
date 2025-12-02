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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Coffee, Send } from 'lucide-react';
import { CoffeeGear, CoffeeGearCategory } from '@/types/coffee';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { createCoffeeGear, updateCoffeeGear } from '@/services/coffee-client';
import { ImageUpload } from '@/components/GamingForm/ImageUpload';

const gearFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  brand: z.string().min(1, { message: 'Brand is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  image: z.string().url({ message: 'Image must be a valid URL' }),
  category: z.nativeEnum(CoffeeGearCategory),
  order: z.number().int().default(0),
});

export type GearFormData = z.infer<typeof gearFormSchema>;

interface GearFormProps {
  gear?: CoffeeGear;
  method?: 'POST' | 'PATCH';
}

export default function GearForm({ gear, method = 'POST' }: GearFormProps) {
  const form = useForm<GearFormData>({
    resolver: zodResolver(gearFormSchema),
    defaultValues: {
      name: gear?.name || '',
      brand: gear?.brand || '',
      description: gear?.description || '',
      image: gear?.image || '',
      category: gear?.category || CoffeeGearCategory.machine,
      order: gear?.order || 0,
    },
  });

  const router = useRouter();

  const onSubmit = async (data: GearFormData) => {
    const promiseRequest =
      method === 'POST'
        ? createCoffeeGear(data)
        : updateCoffeeGear(gear!.id, data);

    const successMessage = (name: string) =>
      method === 'POST'
        ? `Gear ${name} has been created!`
        : `Gear ${name} has been updated!`;

    toast.promise(promiseRequest, {
      loading: 'Processing...',
      success: ({ data }) => {
        const message = successMessage(data?.name || '');
        return {
          message,
          action: {
            label: 'View',
            onClick: () => router.push('/dashboard/coffee/gear'),
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
              <Coffee className="mr-2 h-5 w-5" />
              Gear Information
            </CardTitle>
            <CardDescription>Enter gear details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Gear name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Brand name" />
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
              name="image"
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
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={CoffeeGearCategory.machine}>
                        Machine
                      </SelectItem>
                      <SelectItem value={CoffeeGearCategory.grinder}>
                        Grinder
                      </SelectItem>
                      <SelectItem value={CoffeeGearCategory.accessories}>
                        Accessories
                      </SelectItem>
                      <SelectItem value={CoffeeGearCategory.beans}>
                        Beans
                      </SelectItem>
                    </SelectContent>
                  </Select>
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
              {method === 'POST' ? 'Create Gear' : 'Update Gear'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
