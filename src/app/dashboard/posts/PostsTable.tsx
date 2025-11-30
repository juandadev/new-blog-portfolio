import React from 'react';
import { GetPostsResponse } from '@/types/post';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import PostRowSuspense from '@/app/dashboard/posts/PostRowSuspense';
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

interface PostsTableProps {
  posts: GetPostsResponse;
  isLoading?: boolean;
}

export default function PostsTable({
  posts,
  isLoading = true,
}: PostsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-muted-foreground h-12 px-4 text-left align-middle text-sm font-medium">
            Title
          </TableHead>
          <TableHead className="text-muted-foreground h-12 px-4 text-left align-middle text-sm font-medium">
            Status
          </TableHead>
          <TableHead className="text-muted-foreground h-12 px-4 text-left align-middle text-sm font-medium">
            Views
          </TableHead>
          <TableHead className="text-muted-foreground h-12 px-4 text-left align-middle text-sm font-medium">
            Date
          </TableHead>
          <TableHead className="text-muted-foreground h-12 px-4 text-left align-middle text-sm font-medium" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <PostRowSuspense />
        ) : (
          posts.items.map((post) => {
            const postStatus = POST_STATUS[post.status];

            return (
              <TableRow key={`post-${post.id}`}>
                <TableCell className="p-4 align-middle">
                  <div className="flex w-[480px] flex-col gap-1">
                    <p className="text-sm font-medium text-wrap">
                      {post.title}
                    </p>
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
                </TableCell>
                <TableCell className="p-4 align-middle">
                  <Badge variant={postStatus.variant}>
                    {postStatus.icon} {postStatus.label}
                  </Badge>
                </TableCell>
                <TableCell className="p-4 align-middle">
                  <div className="flex items-center gap-1 text-sm">
                    <EyeIcon size={16} className="text-gray-400" />
                    {formatViewCount(post.views)}
                  </div>
                </TableCell>
                <TableCell className="p-4 align-middle">
                  <div className="flex w-[82px] flex-col gap-1 text-sm text-wrap">
                    {post.status === 'PUBLISHED' && (
                      <p>
                        Published:{' '}
                        {format(new Date(post.publishedAt), 'dd/MM/yyyy')}
                      </p>
                    )}
                    <p className="text-gray-500">
                      Updated: {format(new Date(post.updatedAt), 'dd/MM/yyyy')}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="p-4 align-middle">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <EllipsisIcon size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          disabled={post.status !== 'PUBLISHED'}
                          asChild
                        >
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
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}
