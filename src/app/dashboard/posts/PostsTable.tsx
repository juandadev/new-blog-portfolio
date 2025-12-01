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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Link from 'next/link';
import {
  DashboardTable,
  DashboardTableColumn,
} from '@/components/dashboard/DashboardTable';
import { archivePost, publishPost, deletePost } from '@/services/post-client';
import { toast } from 'sonner';

interface PostsTableProps {
  posts: GetPostsResponse;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onRefresh?: () => void;
}

export default function PostsTable({
  posts,
  isLoading = true,
  onPageChange,
  onPageSizeChange,
  onRefresh,
}: PostsTableProps) {
  const [archivingPostId, setArchivingPostId] = React.useState<number | null>(
    null
  );
  const [publishingPostId, setPublishingPostId] = React.useState<number | null>(
    null
  );
  const [deletingPostId, setDeletingPostId] = React.useState<number | null>(
    null
  );

  const handleArchive = async (post: Post) => {
    setArchivingPostId(post.id);
    try {
      const response = await archivePost(post.id);
      if (response.data) {
        toast.success(`Post "${post.title}" has been archived`);
        onRefresh?.();
      } else {
        toast.error(response.message || 'Failed to archive post');
      }
    } catch (error) {
      toast.error('Failed to archive post');
      console.error(error);
    } finally {
      setArchivingPostId(null);
    }
  };

  const handlePublish = async (post: Post) => {
    setPublishingPostId(post.id);
    try {
      const response = await publishPost(post.id);
      if (response.data) {
        toast.success(`Post "${post.title}" has been published`);
        onRefresh?.();
      } else {
        toast.error(response.message || 'Failed to publish post');
      }
    } catch (error) {
      toast.error('Failed to publish post');
      console.error(error);
    } finally {
      setPublishingPostId(null);
    }
  };

  const handleDelete = async (post: Post) => {
    setDeletingPostId(post.id);
    try {
      const response = await deletePost(post.id);
      if (response.data) {
        toast.success(`Post "${post.title}" has been deleted`);
        onRefresh?.();
      } else {
        toast.error(response.message || 'Failed to delete post');
      }
    } catch (error) {
      toast.error('Failed to delete post');
      console.error(error);
    } finally {
      setDeletingPostId(null);
    }
  };
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
          <DropdownMenuItem asChild>
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
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  disabled={archivingPostId === post.id}
                >
                  <FileArchiveIcon /> Archive
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Archive post?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will archive <strong>&quot;{post.title}&quot;</strong>.
                    Archived posts will not be visible to the public, but you
                    can still access them when logged in.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleArchive(post)}
                    disabled={archivingPostId === post.id}
                  >
                    {archivingPostId === post.id ? 'Archiving...' : 'Archive'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : post.status === 'ARCHIVED' ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  disabled={publishingPostId === post.id}
                >
                  <FileSymlinkIcon /> Publish
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Publish post?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will publish <strong>&quot;{post.title}&quot;</strong>.
                    The post will become visible to the public again.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handlePublish(post)}
                    disabled={publishingPostId === post.id}
                  >
                    {publishingPostId === post.id ? 'Publishing...' : 'Publish'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <DropdownMenuItem disabled>
              <FileSymlinkIcon /> Publish
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              className="text-destructive"
              onSelect={(e) => e.preventDefault()}
              disabled={deletingPostId === post.id}
            >
              <FileX2Icon className="text-destructive" /> Delete
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete post?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete{' '}
                <strong>&quot;{post.title}&quot;</strong>. This action cannot be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDelete(post)}
                disabled={deletingPostId === post.id}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {deletingPostId === post.id ? 'Deleting...' : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
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
      pagination={posts.pagination}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
    />
  );
}
