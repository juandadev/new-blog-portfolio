import {
  VaultProject,
  VaultStory,
  VaultData,
  VaultProjectCategory,
} from '@/types/vault';

const vaultStory: VaultStory = {
  headline: 'The Story',
  intro:
    "This section is a mix of nostalgia and proof of my work as a designer-wannabe years ago.\n\nThis shaped my taste and the need to make the web a beautiful place. Sadly I stopped doing this to focus more on my engineering path, but now in this AI era and agents writing better code than me, I'm betting again on good quality designs, do you think I was going somewhere or was I another average Joe?\n\nEither way, while pursuing my Design Engineer path, I was revisiting my old projects. It's good to have it here as part of my portfolio, and to tell myself that I can do better than this. Feedback is always welcome :)",
};

const vaultProjects: VaultProject[] = [
  {
    title: 'INAD SC',
    description:
      'My first job as a former Web Developer was in this local company, which was offering neuroscience and psychology courses. They wanted me to improve their online presence by mocking, designing and bringing to life my creations. Was the first time I got though feedback around my work and learned to negotiate changes proposed by the client and my own experience. It was one of the largest projects I worked on profetionally from scratch.',
    thumbnail:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/inad-hero.webp',
    figmaUrl:
      'https://www.figma.com/design/yv97SAUy7mQNVdg1ydRpK2/INAD-SC?node-id=0-1&t=p7zTWNyblpG7pZZF-1',
    category: VaultProjectCategory.web_app,
    year: '2020',
    featured: true,
  },
  {
    title: 'Carla',
    description:
      'One of the main psychologists on INAD, I was set the task to create landing pages for each of them to boost their online presence. This page never came to life because I quit right after designing it.',
    thumbnail:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/carla-landing.webp',
    figmaUrl:
      'https://www.figma.com/design/w1CBDyRWl9jq64218rT5Fr/Carla?node-id=9-3&t=bdtcolWI7tfjSRDm-1',
    category: VaultProjectCategory.landing_page,
    year: '2020',
    featured: false,
  },
  {
    title: 'Ogma',
    description:
      "This was a capstone project from a bootcamp I was part of. Although is not one of my favorite designs visually, this is the most complete design I've made, you can tell that I put a lot of effort creating every page.",
    thumbnail:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/ogma-landing.webp',
    figmaUrl:
      'https://www.figma.com/design/gie1D4J60fy2eS6OWGbDlO/Ogma-App?node-id=224-2059&t=fkN0MWHlJUMlfIaI-1',
    category: VaultProjectCategory.web_app,
    year: '2021',
    featured: false,
  },
  {
    title: 'Sushi App',
    description:
      "This was a proposal for a local sushi store, but this never came to life. Also this was initially done in Adobe XD before jumping to Figma... and I don't remember why I just exported the screens and paste them as-is, but yet I re-did a couple of components.",
    thumbnail:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/sushi-landing.webp',
    figmaUrl:
      'https://www.figma.com/design/d4dAUaI3gVTl4ypdh5SBuq/Sushi-app?node-id=9-2&t=9RSHMFDtR1SRzPbv-1',
    category: VaultProjectCategory.mobile_app,
    year: '2019',
    featured: false,
  },
  {
    title: 'Portfolio',
    description:
      "One of the million iterations of my own portfolio site. I've lost the count of how many times I re-designed my portfolio since 2017 or so. I might actually re-create this on v0 and publish a template.",
    thumbnail:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/portfolio-v1-landing.webp',
    figmaUrl:
      'https://www.figma.com/design/QGUO8oFDM6KjjstvOHY2XN/Portfolio-v5482357?node-id=5-0&t=2yuEqVfSP0L89cTX-1',
    category: VaultProjectCategory.landing_page,
    year: '2020',
    featured: false,
  },
  {
    title: 'Parral Entertainment',
    description:
      'I had an idea along with some friends to create our own facebook page to share memes and funny stuff. We were doing good, some of the members (not me) already started a podcast as well, so we wanted to combine this all in our own platform, and this was only the concept I made for it. It never came to life.',
    thumbnail:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/parral-entertainment.webp',
    figmaUrl:
      'https://www.figma.com/design/DGAuUqzWSxKBrCWBfTVWuS/Parral-Entertainment?node-id=33-45&t=mmP3vpnojDDdPUi1-1',
    category: VaultProjectCategory.mobile_app,
    year: '2020',
    featured: false,
  },
  {
    title: 'Traveman App',
    description:
      "I don't remember the purpose of this design and why I just created the login page lol. What I do remember is that I took a picture from Unsplash and vectorize it by hand, so I can have a useful SVG for the guy there and the landscape so it could be fully responsible... I'm amazed of my old self by doing that.",
    thumbnail:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/traveman-login.webp',
    figmaUrl:
      'https://www.figma.com/design/yZtx1H0MewXyLP6gjYB9RS/Traveman-App?node-id=0-1&t=FpxzGWc9SxKqqpsS-1',
    category: VaultProjectCategory.web_app,
    year: '2019',
    featured: false,
  },
  {
    title: 'Juan Carlos Fierro',
    description:
      'One of the founders of INAD. I was set the task to design and create landing pages for each of the core psychologists in the company to improve their online presence',
    thumbnail:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/juan-carlos-landing.webp',
    figmaUrl:
      'https://www.figma.com/design/bH8IPYX7Xxih3TOEfAqbq7/Juan-Carlos-Fierro?node-id=10-2&t=IvAVuLQuDwn3jEjl-1',
    category: VaultProjectCategory.landing_page,
    year: '2020',
    featured: false,
  },
  {
    title: 'Melecio Mares',
    description:
      'One of the founders of INAD. I was set the task to design and create landing pages for each of the core psychologists in the company to improve their online presence',
    thumbnail:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/melecio-landing.webp',
    figmaUrl:
      'https://www.figma.com/design/XqOrUcbfg9qGo34k2Fc7C3/Melecio-Mares?node-id=7-0&t=Qw6BTj9cCuMEoYT5-1',
    category: VaultProjectCategory.landing_page,
    year: '2020',
    featured: false,
  },
];

export const vaultData: VaultData = {
  story: vaultStory,
  projects: vaultProjects,
};
