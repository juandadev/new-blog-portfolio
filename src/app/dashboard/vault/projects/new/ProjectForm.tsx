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
import { Checkbox } from '@/components/ui/Checkbox';
import { LayoutGrid, Send } from 'lucide-react';
import { VaultProject, VaultProjectCategory } from '@/types/vault';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {
  createVaultProject,
  updateVaultProject,
} from '@/services/vault-client';
import { ImageUpload } from '@/components/GamingForm/ImageUpload';

const CATEGORY_LABELS: Record<VaultProjectCategory, string> = {
  [VaultProjectCategory.web_app]: 'Web App',
  [VaultProjectCategory.mobile_app]: 'Mobile App',
  [VaultProjectCategory.landing_page]: 'Landing Page',
  [VaultProjectCategory.dashboard]: 'Dashboard',
  [VaultProjectCategory.ui_components]: 'UI Components',
  [VaultProjectCategory.branding]: 'Branding',
  [VaultProjectCategory.other]: 'Other',
};

const projectFormSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  thumbnail: z.string().url({ message: 'Thumbnail must be a valid URL' }),
  figmaUrl: z.string().url({ message: 'Figma URL must be a valid URL' }),
  category: z.nativeEnum(VaultProjectCategory),
  year: z
    .string()
    .min(4, { message: 'Year must be 4 digits' })
    .max(4, { message: 'Year must be 4 digits' }),
  featured: z.boolean(),
  order: z.number().int(),
});

export type ProjectFormData = z.infer<typeof projectFormSchema>;

interface ProjectFormProps {
  project?: VaultProject;
  method?: 'POST' | 'PATCH';
}

export default function ProjectForm({
  project,
  method = 'POST',
}: ProjectFormProps) {
  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: project?.title || '',
      description: project?.description || '',
      thumbnail: project?.thumbnail || '',
      figmaUrl: project?.figmaUrl || '',
      category: project?.category || VaultProjectCategory.web_app,
      year: project?.year || new Date().getFullYear().toString(),
      featured: project?.featured || false,
      order: project?.order || 0,
    },
  });

  const router = useRouter();

  const onSubmit = async (data: ProjectFormData) => {
    const promiseRequest =
      method === 'POST'
        ? createVaultProject(data)
        : updateVaultProject(project!.id, data);

    const successMessage = (title: string) =>
      method === 'POST'
        ? `Project "${title}" has been created!`
        : `Project "${title}" has been updated!`;

    toast.promise(promiseRequest, {
      loading: 'Processing...',
      success: ({ data: responseData }) => {
        const message = successMessage(responseData?.title || '');
        if (method === 'POST') {
          form.reset({
            title: '',
            description: '',
            thumbnail: '',
            figmaUrl: '',
            category: VaultProjectCategory.web_app,
            year: new Date().getFullYear().toString(),
            featured: false,
            order: 0,
          });
        }
        return {
          message,
          action: {
            label: 'View all',
            onClick: () => router.push('/dashboard/vault/projects'),
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
              <LayoutGrid className="mr-2 h-5 w-5" />
              Project Information
            </CardTitle>
            <CardDescription>Enter project details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Project name" />
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
                      placeholder="Brief description of the project"
                      className="resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail *</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value}
                      onChange={field.onChange}
                      description="Enter image URL or upload a preview screenshot"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="figmaUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Figma URL *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="https://www.figma.com/file/..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
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
                        {Object.values(VaultProjectCategory).map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {CATEGORY_LABELS[cat]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="2021" maxLength={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
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

              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-end">
                    <FormLabel>Featured</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2 pt-2">
                        <Checkbox
                          id="featured"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <label
                          htmlFor="featured"
                          className="text-muted-foreground cursor-pointer text-sm"
                        >
                          Feature this project (larger card)
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <div className="sticky bottom-0 -mx-4 p-4">
          <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row">
            <Button className="flex-1 sm:flex-none" type="submit">
              <Send className="mr-2 h-4 w-4" />
              {method === 'POST' ? 'Create Project' : 'Update Project'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
