'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import {
  PromoBanner,
  PromoBannerUpdateSchema,
  BannerVariant,
  AIModel,
} from '@/types/banner';
import { Button } from '@/components/ui/Button';
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
import { Checkbox } from '@/components/ui/Checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { z } from 'zod';
import { Sparkles, ChevronDown, Upload, X } from 'lucide-react';
import { uploadBannerImage, enhanceBannerText } from '@/services/banner-client';
import { toast } from 'sonner';

interface PromoBannerFormProps {
  banner: PromoBanner | null;
  onSubmit: (data: z.infer<typeof PromoBannerUpdateSchema>) => void;
}

export function PromoBannerForm({ banner, onSubmit }: PromoBannerFormProps) {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    banner?.imageUrl || null
  );

  const form = useForm<z.infer<typeof PromoBannerUpdateSchema>>({
    resolver: zodResolver(PromoBannerUpdateSchema),
    defaultValues: {
      title: banner?.title || '',
      text: banner?.text || '',
      imageUrl: banner?.imageUrl || '',
      linkUrl: banner?.linkUrl || '',
      linkText: banner?.linkText || '',
      icon: banner?.icon || '',
      variant: banner?.variant || BannerVariant.DEFAULT,
      enabled: banner?.enabled ?? true,
    },
  });

  const textValue = form.watch('text');
  const textLength = textValue?.length || 0;

  const handleEnhance = async (model: AIModel) => {
    const currentText = form.getValues('text');
    if (!currentText) {
      toast.error('Please enter some text first');
      return;
    }

    setIsEnhancing(true);
    try {
      const { data } = await enhanceBannerText(currentText, model);
      form.setValue('text', data!.enhancedText);
      toast.success('Text enhanced successfully');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to enhance text'
      );
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be smaller than 5MB');
      return;
    }

    setIsUploading(true);
    try {
      const { data } = await uploadBannerImage(file);
      form.setValue('imageUrl', data!.url);
      setImagePreview(data!.url);
      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to upload image'
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    form.setValue('imageUrl', '');
    setImagePreview(null);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title *</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Banner headline" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <div className="flex items-end gap-4">
                  <FormLabel>Text *</FormLabel>
                  <span
                    className={`text-xs ${textLength > 120 ? 'text-destructive' : 'text-muted-foreground'}`}
                  >
                    {textLength}/120
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={isEnhancing || !field.value}
                      >
                        <Sparkles className="mr-2 h-4 w-4" />
                        {isEnhancing ? 'Enhancing...' : 'Enhance with AI'}
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleEnhance(AIModel.CLAUDE_37_SONNET)}
                      >
                        Claude 3.7 Sonnet
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleEnhance(AIModel.GPT_41)}
                      >
                        GPT-4.1
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleEnhance(AIModel.GEMINI_25_PRO)}
                      >
                        Gemini 2.5 Pro
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Banner description text"
                  className="min-h-[100px] resize-none"
                  maxLength={120}
                />
              </FormControl>
              <FormDescription>
                Keep it concise and catchy (max 120 characters)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={() => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  {imagePreview ? (
                    <div className="relative inline-block">
                      <Image
                        src={imagePreview}
                        alt="Banner preview"
                        width={128}
                        height={128}
                        className="h-32 w-32 rounded-md object-cover"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90 absolute -top-2 -right-2 rounded-full p-1"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      {/* TODO: Change this later with a proper library */}
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={isUploading}
                        className="hidden"
                        id="banner-image-upload"
                      />
                      <label
                        htmlFor="banner-image-upload"
                        aria-label="Upload Image"
                      >
                        <Button
                          type="button"
                          variant="outline"
                          disabled={isUploading}
                          asChild
                        >
                          <span>
                            <Upload className="mr-2 h-4 w-4" />
                            {isUploading ? 'Uploading...' : 'Upload Image'}
                          </span>
                        </Button>
                      </label>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription>
                Optional promotional image (max 5MB)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linkUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link URL</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value || ''}
                  placeholder="https://example.com"
                  type="url"
                />
              </FormControl>
              <FormDescription>Optional external link</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linkText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link Text</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value || ''}
                  placeholder="Learn more"
                />
              </FormControl>
              <FormDescription>Text for the link button</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value || ''}
                  placeholder="Megaphone, Sparkles, PartyPopper"
                />
              </FormControl>
              <FormDescription>
                Lucide icon name (see{' '}
                <a
                  href="https://lucide.dev/icons"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  lucide.dev/icons
                </a>
                )
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="variant"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Style Variant</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select variant" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={BannerVariant.DEFAULT}>
                    Default (Gray)
                  </SelectItem>
                  <SelectItem value={BannerVariant.INFO}>
                    Info (Blue)
                  </SelectItem>
                  <SelectItem value={BannerVariant.SUCCESS}>
                    Success (Green)
                  </SelectItem>
                  <SelectItem value={BannerVariant.WARNING}>
                    Warning (Yellow)
                  </SelectItem>
                  <SelectItem value={BannerVariant.PROMO}>
                    Promo (Brand Gradient)
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="enabled"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-y-0 space-x-3">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Enable Banner</FormLabel>
                <FormDescription>
                  When enabled, the banner will appear on all pages
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit">Save Banner</Button>
      </form>
    </Form>
  );
}
