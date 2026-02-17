'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { VaultStory, VaultStoryUpdateSchema } from '@/types/vault';
import { Button } from '@/components/ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { z } from 'zod';
import { toast } from 'sonner';
import { updateVaultStory } from '@/services/vault-client';
import MarkdownEditor from '@/components/PostForm/MarkdownEditor';

interface VaultStoryFormProps {
  story: VaultStory | null;
}

const formSchema = VaultStoryUpdateSchema;

export function VaultStoryForm({ story }: VaultStoryFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      headline: story?.headline || '',
      intro: story?.intro || '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    toast.promise(updateVaultStory(data), {
      loading: 'Saving...',
      success: () => ({ message: 'Vault story updated!' }),
      error: (error) => `Error: ${error.message}`,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="headline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Headline</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter headline" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <MarkdownEditor
          name="intro"
          control={form.control}
          placeholder="Write the intro shown on The Vault page (supports markdown)"
        />
        <Button type="submit">Save Story</Button>
      </form>
    </Form>
  );
}
