import type { ComponentType } from 'react';

import BuildingPaginationPost, {
  metadata as buildingPaginationMetadata,
} from '@/content/posts/building-pagination-with-prisma-felt-unnecessarily-complex.mdx';
import DeployLaravelPost, {
  metadata as deployLaravelMetadata,
} from '@/content/posts/deploy-de-proyectos-laravel-en-host-compartido-principiantes.mdx';
import DreamJobPost, {
  metadata as dreamJobMetadata,
} from '@/content/posts/how-i-got-fired-from-my-dream-job.mdx';
import NintendoSwitchPost, {
  metadata as nintendoSwitchMetadata,
} from '@/content/posts/level-up-your-object-oriented-programming-knowledge-with-nintendo-switch.mdx';
import WaitlistPost, {
  metadata as waitlistMetadata,
} from '@/content/posts/my-first-waitlist-lessons-from-a-side-project-experiment.mdx';
import ServerComponentsPost, {
  metadata as serverComponentsMetadata,
} from '@/content/posts/server-components-in-nextjs-15-what-i-got-wrong-and-right.mdx';
import ReactContextPost, {
  metadata as reactContextMetadata,
} from '@/content/posts/when-react-context-api-turns-against-you-a-late-night-debugging-story.mdx';
import type { PostMetadata } from '@/types/post';

interface PostModule {
  Component: ComponentType;
  filename: string;
  metadata: PostMetadata;
}

function postMetadata(metadata: Record<string, unknown>): PostMetadata {
  return metadata as unknown as PostMetadata;
}

export const postModules = [
  {
    Component: BuildingPaginationPost,
    filename: 'building-pagination-with-prisma-felt-unnecessarily-complex.mdx',
    metadata: postMetadata(buildingPaginationMetadata),
  },
  {
    Component: DeployLaravelPost,
    filename:
      'deploy-de-proyectos-laravel-en-host-compartido-principiantes.mdx',
    metadata: postMetadata(deployLaravelMetadata),
  },
  {
    Component: DreamJobPost,
    filename: 'how-i-got-fired-from-my-dream-job.mdx',
    metadata: postMetadata(dreamJobMetadata),
  },
  {
    Component: NintendoSwitchPost,
    filename:
      'level-up-your-object-oriented-programming-knowledge-with-nintendo-switch.mdx',
    metadata: postMetadata(nintendoSwitchMetadata),
  },
  {
    Component: WaitlistPost,
    filename: 'my-first-waitlist-lessons-from-a-side-project-experiment.mdx',
    metadata: postMetadata(waitlistMetadata),
  },
  {
    Component: ServerComponentsPost,
    filename: 'server-components-in-nextjs-15-what-i-got-wrong-and-right.mdx',
    metadata: postMetadata(serverComponentsMetadata),
  },
  {
    Component: ReactContextPost,
    filename:
      'when-react-context-api-turns-against-you-a-late-night-debugging-story.mdx',
    metadata: postMetadata(reactContextMetadata),
  },
] satisfies PostModule[];
