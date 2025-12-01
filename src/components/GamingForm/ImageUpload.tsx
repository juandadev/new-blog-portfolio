'use client';

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { uploadImage } from '@/services/gaming-client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  description?: string;
  className?: string;
}

export function ImageUpload({
  value,
  onChange,
  label = 'Image',
  description,
  className,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    setIsUploading(true);

    try {
      const response = await uploadImage(file);
      const url = response.data?.url;

      if (url) {
        onChange(url);
        setPreviewUrl(url);
        toast.success('Image uploaded successfully');
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to upload image'
      );
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleUrlChange = (url: string) => {
    onChange(url);
    setPreviewUrl(url || null);
  };

  const handleRemove = () => {
    onChange('');
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  React.useEffect(() => {
    setPreviewUrl(value || null);
  }, [value]);

  return (
    <div className={cn('space-y-4', className)}>
      <div className="space-y-2">
        <Label>{label}</Label>
        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="url"
            placeholder="Enter image URL"
            value={value || ''}
            onChange={(e) => handleUrlChange(e.target.value)}
            className="flex-1"
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            id="image-upload-input"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            {isUploading ? (
              <>Uploading...</>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </>
            )}
          </Button>
          {previewUrl && (
            <Button
              type="button"
              variant="outline"
              onClick={handleRemove}
              disabled={isUploading}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {previewUrl && (
          <div className="relative aspect-video w-full overflow-hidden rounded-md border">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-cover"
              onError={() => {
                toast.error('Failed to load image preview');
                setPreviewUrl(null);
              }}
            />
          </div>
        )}

        {!previewUrl && (
          <div className="border-muted flex h-32 items-center justify-center rounded-md border border-dashed">
            <div className="text-muted-foreground flex flex-col items-center gap-2">
              <ImageIcon className="h-8 w-8" />
              <p className="text-sm">No image selected</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
