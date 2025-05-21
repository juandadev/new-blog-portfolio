import React from 'react';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { XIcon } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface TagsInputProps<T> extends UseControllerProps<T & FieldValues> {
  placeholder?: string;
}

export default function TagsInput<T>({
  placeholder,
  ...props
}: TagsInputProps<T>) {
  const { field } = useController(props);
  const [inputValue, setInputValue] = React.useState('');

  const addTag = (tag: string) => {
    const clean = tag.toLowerCase().trim();

    if (clean && !field.value?.includes(clean)) {
      field.onChange([...(field.value || []), clean]);
    }

    setInputValue('');
  };

  const removeTag = (tag: string) => {
    const newTags = field.value.filter((t: string) => t !== tag);

    field.onChange(newTags);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      addTag(inputValue);
    }
  };

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement>,
    tag: string
  ) => {
    event.preventDefault();

    removeTag(tag);
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {field.value?.map((tag: string, index: number) => (
          <Badge key={index} className="flex items-center gap-1">
            {tag}
            <Button
              variant={'icon'}
              className={'p-0'}
              onClick={(event) => handleDelete(event, tag)}
            >
              <XIcon className="h-3 w-3 cursor-pointer hover:opacity-70" />
            </Button>
          </Badge>
        ))}
      </div>
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
