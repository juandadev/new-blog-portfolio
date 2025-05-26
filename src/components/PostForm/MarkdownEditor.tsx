import React from 'react';
import { Textarea } from '@/components/ui/Textarea';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import MarkdownRenderer from '@/components/MarkdownRenderer/MarkdownRenderer';

interface MarkdownEditorProps<T> extends UseControllerProps<T & FieldValues> {
  placeholder?: string;
}

export default function MarkdownEditor<T>({
  placeholder,
  ...props
}: MarkdownEditorProps<T>) {
  const { field } = useController(props);

  return (
    <Tabs defaultValue={'markdown'} className={'w-full min-w-[258px]'}>
      <TabsList className={'grid w-full grid-cols-2'}>
        <TabsTrigger value={'markdown'}>Markdown</TabsTrigger>
        <TabsTrigger value={'preview'}>Vista Previa</TabsTrigger>
      </TabsList>
      <TabsContent value={'markdown'}>
        {/* TODO: Move the scroll view in both textarea and preview tabs */}
        <Textarea
          className={'text-preset-11 h-[600px] resize-none'}
          placeholder={placeholder}
          {...field}
        />
      </TabsContent>
      <TabsContent value={'preview'}>
        <div
          className={
            'mb-200 flex h-[600px] flex-col gap-150 overflow-x-auto px-1'
          }
        >
          <MarkdownRenderer content={field.value} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
