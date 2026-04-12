import { buildLlmsIndex } from '@/lib/llms';

export function GET() {
  return new Response(buildLlmsIndex(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
