import React from 'react';
import { GetPostsResponse, Post } from '@/types/post';
import { Badge } from '@/components/ui/Badge';
import { POST_STATUS } from '@/constants/ui';
import {
  EllipsisIcon,
  EyeIcon,
  FileArchiveIcon,
  FilePenIcon,
  FileSearchIcon,
  FileSymlinkIcon,
  FileX2Icon,
} from 'lucide-react';
import { formatViewCount } from '@/lib/utils';
import { format } from 'date-fns';
import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import Link from 'next/link';
import {
  DashboardTable,
  DashboardTableColumn,
} from '@/components/dashboard/DashboardTable';

interface PostsTableProps {
  posts: GetPostsResponse;
  isLoading?: boolean;
}

export default function PostsTable({
  posts,
  isLoading = true,
}: PostsTableProps) {
  const columns: DashboardTableColumn<Post>[] = [
    {
      key: 'title',
      label: 'Title',
      render: (post) => (
        <div className="flex w-[480px] flex-col gap-1">
          <p className="text-sm font-medium text-wrap">{post.title}</p>
          <p className="max-w-md truncate text-sm text-gray-500">
            {post.description}
          </p>
          <div className="flex gap-1">
            {post.tags.map((tag) => (
              <Badge
                key={`badge-${tag}`}
                className="capitalize"
                variant="outline"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (post) => {
        const postStatus = POST_STATUS[post.status];
        return (
          <Badge variant={postStatus.variant}>
            {postStatus.icon} {postStatus.label}
          </Badge>
        );
      },
    },
    {
      key: 'views',
      label: 'Views',
      render: (post) => (
        <div className="flex items-center gap-1 text-sm">
          <EyeIcon size={16} className="text-gray-400" />
          {formatViewCount(post.views)}
        </div>
      ),
    },
    {
      key: 'publishedAt',
      label: 'Published',
      render: (post) => (
        <div className="flex w-[82px] flex-col gap-1 text-sm text-wrap">
          {post.status === 'PUBLISHED' ? (
            <p>{format(new Date(post.publishedAt), 'dd/MM/yyyy')}</p>
          ) : (
            '-'
          )}
        </div>
      ),
    },
    {
      key: 'updatedAt',
      label: 'Updated',
      render: (post) => (
        <div className="flex w-[82px] flex-col gap-1 text-sm text-wrap">
          <p className="text-gray-500">
            {format(new Date(post.updatedAt), 'dd/MM/yyyy')}
          </p>
        </div>
      ),
    },
  ];

  const renderActions = (post: Post) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <EllipsisIcon size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem disabled={post.status !== 'PUBLISHED'} asChild>
            <Link href={`/blog/${post.slug}`}>
              <FileSearchIcon /> View
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/posts/edit/${post.slug}`}>
              <FilePenIcon /> Edit
            </Link>
          </DropdownMenuItem>
          {post.status === 'PUBLISHED' ? (
            <DropdownMenuItem disabled>
              <FileArchiveIcon /> Archive
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem disabled>
              <FileSymlinkIcon /> Publish
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive" disabled>
          <FileX2Icon className="text-destructive" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <DashboardTable
      data={posts.items}
      columns={columns}
      isLoading={isLoading}
      getRowKey={(post) => `post-${post.id}`}
      actions={renderActions}
    />
  );
}
