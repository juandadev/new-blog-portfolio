import OGImage from './opengraph-image';
import { fetchSlugs } from '@/services/post-server';

export const alt = 'Blog Post';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export async function generateStaticParams() {
  const slugs = (await fetchSlugs()) || [];

  return slugs.map((slug) => ({
    slug,
  }));
}

export default OGImage;
