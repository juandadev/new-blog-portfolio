'use client';

import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
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
import { Checkbox } from '@/components/ui/Checkbox';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Gamepad2, Send } from 'lucide-react';
import { Game, GameStatus } from '@/types/gaming';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { createGame, updateGame } from '@/services/gaming-client';
import { ImageUpload } from './ImageUpload';

const gameFormSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  cover: z.string().url({ message: 'Cover must be a valid URL' }),
  platform: z.string().min(1, { message: 'Platform is required' }),
  status: z.nativeEnum(GameStatus),
  isCurrent: z.boolean().default(false),
  notes: z.string().optional(),
});

export type GameFormData = z.infer<typeof gameFormSchema>;

interface GameFormProps {
  game?: Game;
  method?: 'POST' | 'PATCH';
}

export default function GameForm({ game, method = 'POST' }: GameFormProps) {
  const form = useForm<GameFormData>({
    resolver: zodResolver(gameFormSchema),
    defaultValues: {
      title: game?.title || '',
      cover: game?.cover || '',
      platform: game?.platform || '',
      status: game?.status || GameStatus.PLAYING,
      isCurrent: game?.isCurrent || false,
      notes: game?.notes || '',
    },
  });

  const router = useRouter();

  const onSubmit = async (data: GameFormData) => {
    const promiseRequest =
      method === 'POST' ? createGame(data) : updateGame(game!.id, data);

    const successMessage = (title: string) =>
      method === 'POST'
        ? `Game ${title} has been created!`
        : `Game ${title} has been updated!`;

    toast.promise(promiseRequest, {
      loading: 'Processing...',
      success: ({ data }) => {
        const message = successMessage(data?.title || '');
        return {
          message,
          action: {
            label: 'View',
            onClick: () => router.push('/dashboard/gaming/games'),
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
              <Gamepad2 className="mr-2 h-5 w-5" />
              Game Information
            </CardTitle>
            <CardDescription>Enter game details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Game title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cover"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Image *</FormLabel>
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
              name="platform"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Platform *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Nintendo Switch, PS5, PC, etc."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={GameStatus.PLAYING}>
                        Playing
                      </SelectItem>
                      <SelectItem value={GameStatus.BACKLOG}>
                        Backlog
                      </SelectItem>
                      <SelectItem value={GameStatus.COMPLETED}>
                        Completed
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isCurrent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-y-0 space-x-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Mark as current game</FormLabel>
                    <FormDescription>
                      Only one game can be marked as current at a time
                    </FormDescription>
                  </div>
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
                      placeholder="Add any notes about this game..."
                      className="resize-none"
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
              {method === 'POST' ? 'Create Game' : 'Update Game'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
