# Plan: Convert Blog to Full SSG with On-Demand Revalidation

## Problem Summary
The `fetchPost` function in `src/services/post-server.ts` uses `cookies()` from `next/headers`, which is a dynamic function that prevents static generation at build time. This causes the build to fail when trying to generate static blog pages.

## Current State
- **Blog page** (`src/app/blog/[slug]/page.tsx`): Uses time-based revalidation (`revalidate = 43200`) and `dynamicParams = true`
- **`fetchPost`**: Calls `cookies()` to forward auth cookies to the API endpoint
- **API endpoint** (`/api/posts/[slug]`): Already returns PUBLISHED posts without authentication
- **On-demand revalidation**: Already implemented via `revalidatePath('/blog')` in API routes when posts are created/updated/deleted

## Solution

### 1. Modify `fetchPost` in `src/services/post-server.ts`
Remove the `cookies()` dependency by fetching directly from Prisma instead of calling the API endpoint.

**Rationale**: The public blog only needs PUBLISHED posts, which don't require authentication. Direct database access eliminates the need for cookies and is more efficient for static generation.

```typescript
export async function fetchPost(slug: string): Promise<Post | null> {
  try {
    const post = await prisma.post.findFirst({
      where: {
        slug,
        status: 'PUBLISHED'  // Only fetch published posts for public pages
      },
      include: {
        author: {
          select: {
            name: true,
            profilePicture: true,
          },
        },
      },
    });

    if (!post) return null;

    return post as unknown as Post;
  } catch (error) {
    console.error(error);
    return null;
  }
}
```

### 2. Update `generateStaticParams` in `src/app/blog/[slug]/page.tsx`
Modify `fetchSlugs` to only return slugs for PUBLISHED posts.

**File**: `src/services/post-server.ts`
```typescript
export async function fetchSlugs(): Promise<string[] | null> {
  try {
    const posts = await prisma.post.findMany({
      where: { status: 'PUBLISHED' },  // Add filter
      select: { slug: true },
    });

    return posts.map((post) => post.slug);
  } catch (error) {
    console.error(error);
    return null;
  }
}
```

### 3. Remove dynamic exports in `src/app/blog/[slug]/page.tsx`
Remove these lines to make the page fully static:
- `export const revalidate = 43200;` (line 89)
- `export const dynamicParams = true;` (line 90)

Add `dynamicParams = false` to return 404 for non-existent slugs (optional security improvement).

### 4. No changes needed for Dashboard
The dashboard already uses `post-client.ts` for client-side fetching via browser `fetch()` which automatically includes cookies. This will continue to work for all post statuses (DRAFT, PUBLISHED, ARCHIVED).

## Files to Modify

| File | Changes |
|------|---------|
| `src/services/post-server.ts` | Replace `fetchPost` with direct Prisma query; Add `status: 'PUBLISHED'` filter to `fetchSlugs` |
| `src/app/blog/[slug]/page.tsx` | Remove `revalidate` and `dynamicParams` exports |

## Existing On-Demand Revalidation (No Changes Needed)
The API routes already call `revalidatePath` appropriately:
- `POST /api/posts` - Revalidates `/blog` on new post creation
- `PATCH /api/posts/[slug]` - Revalidates `/blog` and `/blog/${slug}`
- `DELETE /api/posts/[slug]` - Revalidates `/blog` and `/blog/${slug}`

## Verification Steps
1. Run `bun run build` - should complete without the cookies() error
2. Check that the blog pages are listed under "Static" in the build output
3. Create/update/delete a post via dashboard and verify the changes appear on the public blog (revalidation working)
4. Verify non-existent slugs return 404
5. Verify dashboard can still view/edit DRAFT and ARCHIVED posts
