import React from 'react';
import { GetPostsResponse } from '@/types/post';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import PostRowSuspense from '@/app/dashboard/posts/PostRowSuspense';

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
          <TableHead
            className={
              'text-muted-foreground h-12 px-4 text-left align-middle text-sm font-medium'
            }
          >
            Título
          </TableHead>
          <TableHead
            className={
              'text-muted-foreground h-12 px-4 text-left align-middle text-sm font-medium'
            }
          >
            Estado
          </TableHead>
          <TableHead
            className={
              'text-muted-foreground h-12 px-4 text-left align-middle text-sm font-medium'
            }
          >
            Vistas
          </TableHead>
          <TableHead
            className={
              'text-muted-foreground h-12 px-4 text-left align-middle text-sm font-medium'
            }
          >
            Fecha
          </TableHead>
          <TableHead
            className={
              'text-muted-foreground h-12 px-4 text-left align-middle text-sm font-medium'
            }
          />
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <PostRowSuspense />
        ) : (
          posts.posts.map((post) => (
            <TableRow key={`post-${post.id}`}>
              <TableHead>{post.title}</TableHead>
              <TableHead>{post.status}</TableHead>
              <TableHead>{post.views}</TableHead>
              <TableHead>
                {new Date(post.publishedAt).toLocaleDateString()}
              </TableHead>
              <TableHead>
                {/* Aquí puedes agregar acciones como editar o eliminar */}
              </TableHead>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
