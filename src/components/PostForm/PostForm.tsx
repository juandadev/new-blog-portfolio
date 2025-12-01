'use client';

import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm, useWatch } from 'react-hook-form';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import {
  CalendarIcon,
  CircleFadingArrowUpIcon,
  FileTextIcon,
  HashIcon,
  ImageIcon,
  LinkIcon,
  PencilLineIcon,
  SaveIcon,
  SendIcon,
} from 'lucide-react';
import { Calendar } from '@/components/ui/Calendar';
import { generateSlug, getFormattedDate } from '@/lib/utils';
import TagsInput from '@/components/ui/TagsInput';
import { Post, PostStatus } from '@/types/post';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { createPost, updatePost } from '@/services/post-client';
import { clsx } from 'clsx';
import MarkdownEditor from '@/components/PostForm/MarkdownEditor';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';

const postFormSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  slug: z.string().min(1, { message: 'Slug is required' }),
  publishedAt: z.date({ message: 'Publication date is required' }),
  coverImage: z.string().optional(),
  originalPostUrl: z.string().optional(),
  tags: z.array(z.string()).default([]).optional(),
  description: z.string().min(1, { message: 'Description is required' }),
  content: z.string().min(1, { message: 'Content is required' }),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
});

export type PostFormData = z.infer<typeof postFormSchema>;

interface PostFormProps {
  post?: Post;
  method?: 'POST' | 'PATCH';
}

export default function PostForm({ post, method = 'POST' }: PostFormProps) {
  const form = useForm<PostFormData>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      publishedAt: post?.publishedAt ? new Date(post.publishedAt) : new Date(),
      coverImage: post?.coverImage || '',
      originalPostUrl: post?.originalPostUrl || '',
      tags: post?.tags || [],
      description: post?.description || '',
      content: post?.content || '',
      status: 'PUBLISHED',
    },
  });

  const titleValue = useWatch({ control: form.control, name: 'title' });
  const [status, setStatus] = useState<PostStatus>('PUBLISHED');
  const router = useRouter();

  useEffect(() => {
    const autoSlug = generateSlug(titleValue || '');

    form.setValue('slug', autoSlug);
  }, [titleValue, form]);

  const onSubmit = async (data: PostFormData) => {
    const postData = {
      ...data,
      status,
    };

    const promiseRequest =
      method === 'POST' ? createPost(postData) : updatePost(post!.id, postData);
    const successMessage = (title: string) =>
      method === 'POST'
        ? `Post ${title} has been created!`
        : `Post ${title} has been updated!`;

    toast.promise(promiseRequest, {
      loading: 'Processing...',
      success: ({ data }) => ({
        message: successMessage(data?.post.title || ''),
        action: {
          label: 'View post',
          onClick: () => router.push(`/blog/${data?.post.slug}`),
        },
      }),
      error: (error) => `Error: ${error.message}`,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <Card>
          <CardHeader>
            <CardTitle>
              <FileTextIcon size={20} /> Basic Information
            </CardTitle>
            <CardDescription>
              Title, URL and publication date of your article
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Post Title *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={'Write an attractive title for your post...'}
                    />
                  </FormControl>
                  {!fieldState.invalid && (
                    <FormDescription>
                      A good title is clear, descriptive and attracts the
                      reader&apos;s attention
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Post URL (Slug) *</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <HashIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                      <Input
                        {...field}
                        placeholder="url-del-post"
                        className="font-fira pl-10"
                      />
                    </div>
                  </FormControl>
                  {!fieldState.invalid && (
                    <FormDescription>
                      Automatically generated from the title. Use only letters,
                      numbers and hyphens
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="publishedAt"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Publication Date *</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          size="sm"
                          className={clsx(
                            'text-preset-7 w-full justify-start text-left',
                            !field.value && 'text-muted-foreground'
                          )}
                          aria-describedby="date-help"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            getFormattedDate(
                              field.value.toISOString(),
                              'MM/dd/yyyy'
                            )
                          ) : (
                            <span>Select a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        defaultMonth={field.value}
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription id="date-help">
                    Default is today. You can select past dates if necessary
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <ImageIcon size={20} /> Media and SEO
            </CardTitle>
            <CardDescription>Cover image and SEO configuration</CardDescription>
          </CardHeader>
          <CardContent className={'flex flex-col gap-4'}>
            {/* TODO: Handle both URL and file upload. Or better yet, find a way to automatically push files to the assets repo instead of storing the blob in database */}
            {/* TODO: Add another field to add credits for taking a cover photo with policies like Unsplash.com */}
            <FormField
              control={form.control}
              name={'coverImage'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Image URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={'https://raw.githubusercontent.com/'}
                    />
                  </FormControl>
                  <FormDescription>
                    Full URL of the image that will appear as the post cover.
                    Currently only accepts images from raw.githubusercontent.com
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={'originalPostUrl'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Canonical URL</FormLabel>
                  <FormControl>
                    <div className={'relative'}>
                      <LinkIcon
                        className={
                          'absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400'
                        }
                      />
                      <Input
                        {...field}
                        placeholder={'https://dev.to/user/existing-post'}
                        className={'pl-10'}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Only if this post was originally published on another site
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <HashIcon size={20} /> Tags and Description
            </CardTitle>
            <CardDescription>
              Categorize your content and add a description
            </CardDescription>
          </CardHeader>
          <CardContent className={'flex flex-col gap-4'}>
            <FormField
              control={form.control}
              name="tags"
              render={() => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <TagsInput
                      control={form.control}
                      name="tags"
                      placeholder={'Write a tag...'}
                    />
                  </FormControl>
                  <FormDescription>
                    Press Enter or the + button to add. They help categorize
                    your content
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Short Description *</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-20"
                      placeholder="A brief description that will appear in preview cards..."
                      {...field}
                    />
                  </FormControl>
                  {/* TODO: Add character count */}
                  {!fieldState.invalid && (
                    <FormDescription>
                      Will appear in preview cards and search results
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <PencilLineIcon size={20} /> Post Content
            </CardTitle>
            <CardDescription>
              Write your article in Markdown and preview the result
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="content"
              render={() => (
                <FormItem>
                  <FormControl>
                    <MarkdownEditor
                      name={'content'}
                      control={form.control}
                      placeholder={
                        '# My First Post\n' +
                        '\n' +
                        'Write your post content here using **Markdown**.\n' +
                        '\n' +
                        '## Subtitle\n' +
                        '\n' +
                        '- List item\n' +
                        '- Another item\n' +
                        '\n' +
                        '[Example link](https://example.com)\n' +
                        '\n' +
                        '![Example image](https://example.com/image.jpg)'
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="border-border bg-background sticky bottom-0 flex w-full flex-col justify-center gap-3 border-t p-2 sm:flex-row">
          <Button
            size="sm"
            className="flex-1 bg-transparent sm:flex-none"
            onClick={() => setStatus('DRAFT')}
          >
            <SaveIcon className="mr-2 h-4 w-4" />
            Save as Draft
          </Button>
          <Button
            size="sm"
            className="flex-1 sm:flex-none"
            onClick={() => setStatus('PUBLISHED')}
          >
            {method === 'PATCH' ? (
              <>
                <CircleFadingArrowUpIcon className="mr-2 h-4 w-4" /> Update Post
              </>
            ) : (
              <>
                <SendIcon className="mr-2 h-4 w-4" /> Publish Post
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
