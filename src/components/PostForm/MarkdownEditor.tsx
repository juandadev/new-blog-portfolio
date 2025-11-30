import React from 'react';
import { Textarea } from '@/components/ui/Textarea';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import MarkdownRenderer from '@/components/MarkdownRenderer/MarkdownRenderer';
import { FormDescription, FormLabel } from '@/components/ui/Form';
import { EyeIcon, PencilLineIcon } from 'lucide-react';

interface MarkdownEditorProps<T> extends UseControllerProps<T & FieldValues> {
  placeholder?: string;
}

export default function MarkdownEditor<T>({
  placeholder,
  ...props
}: MarkdownEditorProps<T>) {
  const { field } = useController(props);

  return (
    <Tabs defaultValue="markdown" className="w-full min-w-[258px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="markdown">
          <PencilLineIcon /> Editor
        </TabsTrigger>
        <TabsTrigger value="preview">
          <EyeIcon /> Preview
        </TabsTrigger>
      </TabsList>
      <TabsContent value="markdown">
        <FormLabel>Markdown content *</FormLabel>
        {/* TODO: Move the scroll view in both textarea and preview tabs */}
        <Textarea
          className="text-preset-11 mt-2 h-[600px] resize-none"
          placeholder={placeholder}
          {...field}
        />
        <FormDescription className="mt-2">
          Use Markdown to format your content. Switch to preview to see the
          result
        </FormDescription>
      </TabsContent>
      <TabsContent value="preview">
        <div className="mb-4 flex h-[600px] flex-col gap-3 overflow-x-auto rounded-md border px-3 py-2">
          <MarkdownRenderer content={field.value} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
