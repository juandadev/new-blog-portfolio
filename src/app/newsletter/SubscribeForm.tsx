// noinspection ExceptionCaughtLocallyJS

'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Typography } from '@/components/Typography/Typography';
import { subscribeEmail } from '@/services/subscriber-client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/Form';
import { AlertCircleIcon, CircleCheckIcon } from 'lucide-react';
import NProgress from 'nprogress';
import { clsx } from 'clsx';

const subscribeFormSchema = z.object({
  email: z
    .string({ message: 'Este campo es obligatorio' })
    .email({ message: 'Ingresa un correo válido.' }),
});

type SubscribeFormData = z.infer<typeof subscribeFormSchema>;

export default function SubscribeForm() {
  const form = useForm<SubscribeFormData>({
    resolver: zodResolver(subscribeFormSchema),
  });
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null
  );

  const onSubmit = async (data: SubscribeFormData) => {
    setSuccessMessage(null);

    try {
      const response = await subscribeEmail(data.email);

      if (!response.data?.subscriber) {
        throw new Error(response.message);
      }

      setSuccessMessage(response.message);
    } catch (error) {
      form.setError('email', {
        type: 'manual',
        message:
          error instanceof Error
            ? error.message
            : 'Ocurrió un error al procesar tu suscripción.',
      });
    } finally {
      NProgress.done();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={'flex flex-col gap-100'}
      >
        <div className={'flex flex-col gap-200'}>
          <FormField
            control={form.control}
            name={'email'}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className={'text-lg font-normal'}>Correo</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    variant={'page'}
                    placeholder={'email@ejemplo.com'}
                    className={clsx(
                      successMessage &&
                        !fieldState.error &&
                        'border-green-700 dark:border-green-500'
                    )}
                  />
                </FormControl>
                {fieldState.error && (
                  <div className={'flex items-center gap-100'}>
                    <AlertCircleIcon size={14} className={'text-destructive'} />
                    <Typography preset={8} className={'text-destructive'}>
                      {fieldState.error.message}
                    </Typography>
                  </div>
                )}
                {successMessage && !fieldState.error && (
                  <div className={'flex items-center gap-100'}>
                    <CircleCheckIcon
                      size={14}
                      className={'text-green-700 dark:text-green-500'}
                    />
                    <Typography
                      preset={8}
                      className={'text-green-700 dark:text-green-500'}
                    >
                      {successMessage}
                    </Typography>
                  </div>
                )}
              </FormItem>
            )}
          />
          <span className={'inline-block w-fit'}>
            <Button
              type={'submit'}
              onClick={() => form.formState.isValid && NProgress.start()}
            >
              Mantenerme al tanto
            </Button>
          </span>
        </div>
        <Typography as={'span'} preset={8}>
          Te puedes desuscribir cuando quieras. Sin spam, lo juro 🙂
        </Typography>
      </form>
    </Form>
  );
}
