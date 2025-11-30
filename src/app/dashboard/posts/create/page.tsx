import React from 'react';
import PostForm from '@/components/PostForm/PostForm';
import { Button } from '@/components/ui/Button';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

export default function CreatePostPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-background fixed top-0 left-0 z-[1] h-20 w-full" />
      <div className="border-border bg-background sticky top-[70px] z-10 flex flex-col items-center justify-between gap-1 border-b py-3 md:flex-row md:gap-0">
        <div className="flex w-full items-center justify-between space-x-3">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-sm font-medium"
          >
            <Link href="/dashboard/posts">
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <div className="pr-3">
            <h1 className="text-xl font-semibold">Create New Post</h1>
            <p className="hidden text-sm text-gray-500 md:block">
              Complete your article information
            </p>
          </div>
        </div>
      </div>
      <PostForm />
    </div>
  );
}
