import React from 'react';
import PostCard from '@/components/PostList/PostCard';
import { fetchPosts } from '@/services/post';

export default async function PostList() {
  const posts = await fetchPosts();

  return (
    <div className={'flex flex-col gap-300'}>
      {posts?.map((post) => <PostCard key={post.id} post={post} />)}
      {/*TODO: Uncomment this when the blog page is ready*/}
      {/*<Link*/}
      {/*  className={*/}
      {/*    'relative w-fit after:absolute after:bottom-0 after:left-0 after:block after:h-[3px] after:w-full after:bg-blue-500 hover:text-current/70'*/}
      {/*  }*/}
      {/*  href={'/blog'}*/}
      {/*>*/}
      {/*  Ver más posts*/}
      {/*</Link>*/}
    </div>
  );
}
