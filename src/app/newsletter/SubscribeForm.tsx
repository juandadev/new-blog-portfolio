// noinspection ExceptionCaughtLocallyJS

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { subscribeEmail } from '@/services/subscriber-client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/Form';
import { CheckCircle2Icon, Loader2Icon, XCircleIcon } from 'lucide-react';
import NProgress from 'nprogress';

const subscribeFormSchema = z.object({
  email: z
    .string({ message: 'Este campo es obligatorio' })
    .email({ message: 'Ingresa un correo válido.' }),
});

type SubscribeFormData = z.infer<typeof subscribeFormSchema>;
type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function SubscribeForm() {
  const form = useForm<SubscribeFormData>({
    resolver: zodResolver(subscribeFormSchema),
  });
  const [stateMessage, setStateMessage] = useState<string | null>(null);
  const [state, setState] = useState<FormState>('idle');

  const onSubmit = async (data: SubscribeFormData) => {
    setState('loading');
    setStateMessage(null);

    try {
      const response = await subscribeEmail(data.email);

      if (!response.data?.subscriber) {
        throw new Error(response.message);
      }

      setStateMessage(response.message);
      setState('success');
    } catch (error) {
      setStateMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please check your email address and try again.'
      );
      setState('error');
    } finally {
      NProgress.done();
    }
  };

  return (
    <div className="relative z-[1] space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex w-full flex-col gap-3 sm:flex-row">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="your.email@example.com"
                      className="bg-muted/50 border-border focus-visible:ring-primary"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              onClick={() => form.formState.isValid && NProgress.start()}
              disabled={state === 'loading'}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            >
              {state === 'loading' ? (
                <>
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  Subscribing...
                </>
              ) : (
                'Subscribe'
              )}
            </Button>
          </div>
        </form>
      </Form>
      {state === 'success' && (
        <div className="flex items-start gap-3 rounded-lg border border-green-500/20 bg-green-500/10 p-4">
          <CheckCircle2Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
          <div className="space-y-1">
            <p className="font-medium text-green-500">
              Successfully subscribed!
            </p>
            <p className="text-muted-foreground text-sm">{stateMessage}</p>
          </div>
        </div>
      )}
      {state === 'error' && (
        <div className="flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/10 p-4">
          <XCircleIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
          <div className="space-y-1">
            <p className="font-medium text-red-500">Subscription failed</p>
            <p className="text-muted-foreground text-sm">{stateMessage}</p>
          </div>
        </div>
      )}
      <div className="border-border border-t pt-4">
        <p className="text-muted-foreground text-sm">
          By subscribing, you agree to receive occasional emails about new
          content. You can unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}
