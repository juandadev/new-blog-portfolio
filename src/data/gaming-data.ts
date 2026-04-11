import {
  Game,
  GameStatus,
  PCPart,
  PCBuildStory,
  Console,
  GamingPhoto,
  GamingData,
} from '@/types/gaming';

export const games: Game[] = [
  {
    id: '0ff84cc7-bd6a-4aae-873d-4b21b66db95f100426',
    title: 'Crimson Desert',
    cover:
      'https://image.api.playstation.com/vulcan/ap/rnd/202508/2905/e1904307aca2aa40bce189aae6399ec67bce47e50a25ff43.jpg',
    stickerImage: '/games/crimson_desert.webp',
    platform: 'PS5',
    status: GameStatus.PLAYING,
    isCurrent: true,
    notes:
      "I wishlisted this game as soon as I saw the first teaser. I looove medieval aesthetic and open world games, and this is the perfect combination I'm always looking for. Don't understand a thing about the main story, but I'm loving it. Might stick with it for a long time until either GTA 6 or Fable comes out",
    createdAt: '2025-12-01T22:51:21.266Z',
    updatedAt: '2026-02-17T21:43:14.809Z',
  },
  {
    id: '0ff84cc7-bd6a-4aae-873d-4b21b66db95f',
    title: "Ghost of Tsushima: Director's Cut",
    cover:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/tsushima.webp',
    platform: 'PS5',
    status: GameStatus.BACKLOG,
    isCurrent: false,
    notes:
      "The best samurai game I've played so far! I played a demo of AC Shadows but it's not even close to this work of art. Love everything! I stopped playing when Pokemon Legends ZA came out but now I'm decided to complete it!",
    createdAt: '2025-12-01T22:51:21.266Z',
    updatedAt: '2026-02-17T21:43:14.809Z',
  },
  {
    id: 'eba49f46-fedd-4efc-b862-0513f94c3554',
    title: 'Core Keeper',
    cover:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/core%20keeper.webp',
    platform: 'PS5',
    status: GameStatus.PLAYING,
    isCurrent: false,
    notes:
      "Was curious about this game and got it free with PS Plus subscription... boy I love these survival/sandbox games, it's like Terraria & Stardew Valley had a child, they've put so much love in this game and I'm actually enjoying it, let's see how many hours I spend on this one.",
    createdAt: '2026-01-21T04:38:33.864Z',
    updatedAt: '2026-02-17T21:43:14.485Z',
  },
  {
    id: '74c381a4-12c4-479f-abcf-192a5f964ca6',
    title: "Assassin's Creed Odyssey",
    cover: 'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/image.webp',
    platform: 'PS5',
    status: GameStatus.PLAYING,
    isCurrent: false,
    notes:
      "Assassin's Creed is one of my all-time favorite franchise. Even though it lost some of its original essence during the RPG era, this is easily my favorite of the more recent entries. Maybe it's because it was the first one I played after a long break, but the Greek world is absolutely beautiful and the story still hits hard imo.\nNow that a few years have passed and all the DLCs are at huge discount, I'm planning to sink a lot of hours into replaying the base game + DLC, and yeah, I might even go for the platinum this time.",
    createdAt: '2025-12-18T20:05:36.991Z',
    updatedAt: '2026-01-21T04:39:29.407Z',
  },
  {
    id: '9e1b1b9e-b78c-4aa3-8fd5-98c1c4616bd8',
    title: 'Pokémon Y',
    cover:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/pokemon-y.webp',
    platform: 'Nintendo 2DS',
    status: GameStatus.PLAYING,
    isCurrent: false,
    notes:
      "While playing Pokémon Legends ZA, it made me want to re-play this beauty again. Actually I never managed to finish this back in the day, so I'm trying again, now forcing me to use a gen-6-only team (yes, I always end with a Kanto team on almost every game)",
    createdAt: '2025-12-01T23:19:04.78Z',
    updatedAt: '2025-12-18T20:05:36.61Z',
  },
  {
    id: 'fd63afe2-6ec8-43a4-9506-22ee5374bdc6',
    title: 'Pokemon Legends ZA',
    cover: 'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/plza.webp',
    platform: 'Nintendo Switch',
    status: GameStatus.PLAYING,
    isCurrent: false,
    notes:
      'I took the risk buying it day one. Best decision ever! I finished the story already but really want to complete the post game and get the shiny charm.',
    createdAt: '2025-12-01T20:47:43.092Z',
    updatedAt: '2025-12-01T23:19:04.349Z',
  },
  {
    id: '798d9ea2-87e4-4f71-a443-cdd3ff71d6c4',
    title: 'The Legend of Zelda: Echoes of Wisdom',
    cover:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/image%20%2811%29.webp',
    platform: 'Nintendo Switch',
    status: GameStatus.BACKLOG,
    isCurrent: false,
    notes:
      'I bought this game at launch and even recorded an "aesthetic lo-fi" unboxing and first-impressions video (yeah, I briefly thought about becoming a gaming content creator). And then… I dropped it lol',
    createdAt: '2025-12-20T00:41:59.903Z',
    updatedAt: '2025-12-20T00:41:59.903Z',
  },
  {
    id: 'b7cd8692-16eb-419b-8f8b-eba9e65bd47b',
    title: 'Pokémon Sword',
    cover:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/image%20%2810%29.webp',
    platform: 'Nintendo Switch',
    status: GameStatus.BACKLOG,
    isCurrent: false,
    notes:
      "I also dropped this one before. I've started it twice already, but this time I'm committed to finishing it. Not sure I'll find people to run those raid battles with though.",
    createdAt: '2025-12-20T00:37:54.627Z',
    updatedAt: '2025-12-20T00:38:20.78Z',
  },
  {
    id: 'd4c081b5-0bb8-4fb8-a39c-2ae226312d90',
    title: 'Super Mario Galaxy 1 + 2',
    cover:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/image%20%289%29.webp',
    platform: 'Nintendo Switch',
    status: GameStatus.BACKLOG,
    isCurrent: false,
    notes:
      "Like many other games, I never really had the chance to play several mainline Mario games, the Mario Galaxy series being one of them. Now that Nintendo released this bundle, I'm ready to finally jump in and have a lot of fun.",
    createdAt: '2025-12-20T00:34:33.332Z',
    updatedAt: '2025-12-20T00:34:33.332Z',
  },
  {
    id: 'dc499973-6ab5-4c06-8201-1d02bbd3274b',
    title: 'Pokémon Scarlet',
    cover:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/image%20%288%29.webp',
    platform: 'Nintendo Switch',
    status: GameStatus.BACKLOG,
    isCurrent: false,
    notes:
      "I know, I brag a lot about being a Pokémon addict and building a Pokédex app, but I've never actually played every game in the series. Now's my chance to fix that. I just picked my starter and progressed far enough to redeem my shiny Miraidon code lol",
    createdAt: '2025-12-20T00:31:51.007Z',
    updatedAt: '2025-12-20T00:31:51.007Z',
  },
  {
    id: 'b55c73f4-f8b1-4c54-9ff6-7db2ccb090f8',
    title: 'Pokémon Ultra Sun',
    cover:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/image%20%287%29.webp',
    platform: 'Nintendo 2DS',
    status: GameStatus.BACKLOG,
    isCurrent: false,
    notes:
      "Back in the day, I played Pokémon Sun and loved the Alola region and its story. Now that I've got a 2DS again, it felt like the perfect time to pick up a physical copy of Ultra Sun and experience the enhanced version of that adventure.",
    createdAt: '2025-12-20T00:26:52.676Z',
    updatedAt: '2025-12-20T00:26:52.676Z',
  },
  {
    id: 'a7d64d42-c30c-4b9a-821f-aef371aaa592',
    title: 'LEGO Star Wars: The Skywalker Saga',
    cover:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/image%20%286%29.webp',
    platform: 'PS5',
    status: GameStatus.BACKLOG,
    isCurrent: false,
    notes:
      "I've always loved the LEGO video games, so I picked this one up in a physical deluxe edition, the trailers made the graphics look insane. I initially thought it was just a remastered take on the older games, but it turned out to be a completely new experience, and I enjoyed it a lot. It's very different from the traditional LEGO formula, and I still haven't finished it, so there's plenty more left to explore.",
    createdAt: '2025-12-20T00:23:40.35Z',
    updatedAt: '2025-12-20T00:23:40.35Z',
  },
  {
    id: 'c7446f66-d5ed-491b-938c-9f96ca2cd2b1',
    title: 'Gears Of War Reloaded',
    cover:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/image%20%285%29.webp',
    platform: 'PS5',
    status: GameStatus.BACKLOG,
    isCurrent: false,
    notes:
      "I had a brief experience with Gears 3 back in the Xbox 360 era, and it was awesome. I'm not really into shooters, but the third-person perspective instantly caught my attention. I never managed to finish it back then, so I picked this one up hoping to relive that experience, this time actually completing the campaign.",
    createdAt: '2025-12-20T00:18:52.271Z',
    updatedAt: '2025-12-20T00:18:52.271Z',
  },
  {
    id: '605c6ecc-d36f-44d0-8a7c-b5f372f8cf83',
    title: 'Hogwarts Legacy',
    cover:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/image%20%284%29.webp',
    platform: 'PS5',
    status: GameStatus.BACKLOG,
    isCurrent: false,
    notes:
      'I bought this game when it first came out, but for some reason I never finished it. I restarted it like three times because I kept forgetting the controls and everything else lol. Still, I really want to see it through, I love the Harry Potter saga.',
    createdAt: '2025-12-20T00:15:28.622Z',
    updatedAt: '2025-12-20T00:15:28.622Z',
  },
  {
    id: '63582615-f845-4714-8866-53df63a86de3',
    title: 'Dark Souls Remastered',
    cover:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/image%20%283%29.webp',
    platform: 'PS5',
    status: GameStatus.BACKLOG,
    isCurrent: false,
    notes: '',
    createdAt: '2025-12-20T00:12:10.535Z',
    updatedAt: '2025-12-20T00:12:10.535Z',
  },
  {
    id: '4d51ee77-bad3-49f7-8d29-e148d71f7961',
    title: 'Dark Souls III',
    cover:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/image%20%282%29.webp',
    platform: 'PS5',
    status: GameStatus.BACKLOG,
    isCurrent: false,
    notes:
      'I\'m eager to finish the Dark Souls series. I know this game introduced the ideas that later evolved into "Ashes of War" in Elden Ring, and given how much I loved Elden Ring, I\'m expecting this to be a great experience.',
    createdAt: '2025-12-20T00:06:49.79Z',
    updatedAt: '2025-12-20T00:06:49.79Z',
  },
  {
    id: '57e029c6-64e2-47e9-ac19-5eb64726879f',
    title: 'The Last Of Us Part II',
    cover:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/image%20%281%29.webp',
    platform: 'PS5',
    status: GameStatus.BACKLOG,
    isCurrent: false,
    notes:
      "I grabbed the physical copy at a huge discount. I loved the first game and how it ended, and I managed to survive most of the TV show spoilers. I'm ready to find out what's next in this story.",
    createdAt: '2025-12-20T00:02:04.694Z',
    updatedAt: '2025-12-20T00:02:04.694Z',
  },
  {
    id: 'ce2a15d7-57d2-40cd-9c20-68bcba31709d',
    title: 'Dark Souls II: Scholar Of The First Sin',
    cover:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/dark-souls-2.webp',
    platform: 'PS5',
    status: GameStatus.BACKLOG,
    isCurrent: false,
    notes:
      "I started this game several years ago on my old PC (it's a generous game that doesn't demand high specs), it was my first souls-like game I tried, and I loved it! but as you might know, the difficulty is overwhelming for me, so I stopped playing it like at the half of the story. Recently, I got a physical PS4 bundle of the Dark Souls trilogy at sale (long live physical format) and I decided to start with this one just for the nostalgia.",
    createdAt: '2025-12-01T23:13:59.964Z',
    updatedAt: '2025-12-01T23:13:59.964Z',
  },
  {
    id: 'e57e0cfd-ba80-45fa-9024-96201cf1031c',
    title: 'Dragon Age: The Veilguard',
    cover:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/dragon-age.webp',
    platform: 'PS5',
    status: GameStatus.BACKLOG,
    isCurrent: false,
    notes:
      "This is the first game in the series I've tried, and I have to say it... the history really sucks. When the trailer came out it really got me that I even bought this at launch, something I completely regret. But not everything is lost on this game, I really loved the RPG mechanics, and the graphics and visual style is truly beautiful! it's an entertaining game to play if you don't bother to pay attention to the history and dialogs lol so I also want to finish it.",
    createdAt: '2025-12-01T23:08:02.245Z',
    updatedAt: '2025-12-01T23:08:02.245Z',
  },
  {
    id: '653ec2c2-8fa0-49fe-b225-9b34ca472d5d',
    title: 'The Elder Scrolls IV: Oblivion Remastered',
    cover:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/oblivion.webp',
    platform: 'PS5',
    status: GameStatus.BACKLOG,
    isCurrent: false,
    notes:
      'I only tried Skyrim before, but when this remastered version was announced it looked so beautiful that I insta bought it! and I have no regrets. Entering an oblivion gate is stunning 🔥 I definitely want to finish this game.',
    createdAt: '2025-12-01T23:00:20.82Z',
    updatedAt: '2025-12-01T23:22:15.225Z',
  },
  {
    id: 'bb06a419-a4a3-49bf-a058-abf85fc75dbe',
    title: "Demon's Souls",
    cover:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/demons-souls.webp',
    platform: 'PS5',
    status: GameStatus.BACKLOG,
    isCurrent: false,
    notes:
      "Like many other games, I paused this one bc souls-like games are too difficult that I get overwhelmed quick. But this remaster of Demon's Souls is a true work of art! I never played the original one and I'm amazed of what they did with this new version.",
    createdAt: '2025-12-01T22:57:11.342Z',
    updatedAt: '2025-12-01T22:57:11.342Z',
  },
];

export const pcParts: PCPart[] = [
  {
    id: '6f911560-060e-42c8-b7b9-ad15e23d340c',
    component: 'CPU',
    name: 'Intel Core i7 13700',
    notes: '16 Core, 30MB Cache, 2.10GHz',
    order: 1,
    createdAt: '2025-12-01T21:42:48.254Z',
    updatedAt: '2025-12-01T21:42:48.254Z',
  },
  {
    id: '2f17d862-a8d4-41b0-a15b-59222ce8861b',
    component: 'GPU',
    name: 'NVIDIA RTX 4060 Ti | MSI Gaming X',
    notes: '8GB GDDR6. It works well in ultrawide resolution.',
    order: 2,
    createdAt: '2025-12-01T21:43:14.036Z',
    updatedAt: '2025-12-01T21:43:14.036Z',
  },
  {
    id: 'e29c9434-f65f-4f9a-b54d-e1218f0d284c',
    component: 'RAM',
    name: 'Corsair Vengance 32GB DDR5 6000MHz',
    notes: 'RGB off, performance on',
    order: 3,
    createdAt: '2025-12-01T21:43:26.949Z',
    updatedAt: '2025-12-01T21:43:26.949Z',
  },
  {
    id: '1cff0a76-122c-49ea-810f-4af5a9729212',
    component: 'Motherboard',
    name: 'MSI MAG B760 Tomahawk WiFi',
    notes: 'LGA 1700, DDR5, PCIe 5.0',
    order: 4,
    createdAt: '2025-12-01T21:43:54.866Z',
    updatedAt: '2025-12-01T21:43:54.866Z',
  },
  {
    id: '024f9d59-e0d0-4634-ac31-f0004a0d6da5',
    component: 'Main Storage',
    name: 'Samsung 970 EVO Plus 1TB NVMe',
    notes: 'OS + Last gen games',
    order: 5,
    createdAt: '2025-12-01T21:44:10.875Z',
    updatedAt: '2025-12-01T21:44:10.875Z',
  },
  {
    id: '36fadf2e-a20f-4236-acaf-8276cc5d065b',
    component: 'Secondary Storage',
    name: 'Kingston NV3 1TB NVMe',
    notes: 'Game library overflow',
    order: 6,
    createdAt: '2025-12-01T21:44:23.831Z',
    updatedAt: '2025-12-01T21:44:23.831Z',
  },
  {
    id: 'abff0ed2-37bc-434f-b0e9-349780544b93',
    component: 'PSU',
    name: 'Corsair RM850x Gold',
    notes: '850W 80+ Gold. A premium PSU for a premium PC',
    order: 7,
    createdAt: '2025-12-01T21:44:37.658Z',
    updatedAt: '2025-12-01T21:44:37.658Z',
  },
  {
    id: '643f7c1d-b4b8-47a7-aa68-477e9b4825d6',
    component: 'Case',
    name: 'NZXT H6 Flow Black',
    notes:
      "Honestly the best case I've had so far. Excellent air flow if you fill all fan spaces. This rig never gets hot since I bought it.",
    order: 8,
    createdAt: '2025-12-01T21:44:50.113Z',
    updatedAt: '2025-12-01T21:44:50.113Z',
  },
  {
    id: 'ad7379b6-66e3-4433-8371-2f4f4778a525',
    component: 'CPU Cooling',
    name: 'AIO Corsair H115i 280mm',
    notes: '',
    order: 9,
    createdAt: '2025-12-01T21:45:02.83Z',
    updatedAt: '2025-12-01T21:45:02.83Z',
  },
  {
    id: 'f02e29d5-aa11-44b5-b4af-8215241e8b99',
    component: 'Front Fans',
    name: '3 x NZXT F120mm RGB Core',
    notes: 'Those came within the case',
    order: 10,
    createdAt: '2025-12-01T21:45:20.329Z',
    updatedAt: '2025-12-01T21:45:20.329Z',
  },
  {
    id: '3d89ff67-7680-4b3f-ab2b-dbce8d063d0e',
    component: 'Up & Bottom Fans',
    name: '4 x Corsair LL140mm RGB',
    notes: '',
    order: 11,
    createdAt: '2025-12-01T21:45:30.547Z',
    updatedAt: '2025-12-01T21:45:30.547Z',
  },
  {
    id: 'f48b157a-774d-4f42-9b28-2c6292e2dbfb',
    component: 'Back Fan',
    name: '1 x Corsair LL120mm RGB',
    notes: '',
    order: 12,
    createdAt: '2025-12-01T21:45:44.785Z',
    updatedAt: '2025-12-01T21:45:44.785Z',
  },
];

export const pcBuildStory: PCBuildStory = {
  id: 'ddb8eef4-ae12-4df4-8343-448dac6ac416',
  story:
    "I built my first PC in late 2020 after landing my first full-time dev job. Since then, I've upgraded it twice and ended up with this absolute unit… which I barely use. I'm mostly a console-on-the-couch kind of gamer, so this rig has officially reached its final form. It runs anything at solid 1080p, and honestly, that's all I need for a chill gaming session.",
  updatedAt: '2025-12-01T21:42:19.051Z',
};

export const consoles: Console[] = [
  {
    id: '1cd3a709-fde9-45e8-962a-a54012d5c036',
    name: 'PlayStation 5',
    image: 'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/ps5.webp',
    story:
      "Although it's the first version, it is really powerful. I use it mostly for exclusives, but I do really love this console that I even bought the same games as in the PC just to play them in the couch lol.",
    order: 1,
    createdAt: '2025-12-01T22:24:50.388Z',
    updatedAt: '2025-12-01T22:24:50.388Z',
  },
  {
    id: 'c69e0241-5800-4aa6-9cca-28c1f1fe6970',
    name: 'Nintendo Switch OLED',
    image:
      'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/setup/switch.webp',
    story:
      "Originally I had the standard Switch, but then Tears of The Kingdom came out and I HAD to get the Zelda version, it's just beautiful. The OLED screen upgrade was absolutely worth it.",
    order: 2,
    createdAt: '2025-12-01T22:25:53.443Z',
    updatedAt: '2025-12-01T22:25:53.443Z',
  },
  {
    id: '7c16c47f-bed1-4dcb-b278-3972fa81f919',
    name: 'Nintendo 2DS',
    image:
      'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/setup/2ds-2.webp',
    story:
      "Long time ago I had a 2DS just like this one, but someone stole it from me. So nostalgia hit hard and I bought a refurbished one and came in excellent condition! it's the definitive console to play every old Pokémon games.",
    order: 3,
    createdAt: '2025-12-01T22:26:20.107Z',
    updatedAt: '2025-12-01T22:26:20.107Z',
  },
];

export const gamingPhotos: GamingPhoto[] = [
  {
    id: 'af68b711-37b4-4017-8f23-011f2db03245',
    src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/setup/pc.webp',
    alt: 'Custom PC Build',
    order: 1,
    createdAt: '2025-12-01T21:00:27.698Z',
    updatedAt: '2025-12-01T21:00:27.698Z',
  },
  {
    id: 'ef211a4a-83ce-407a-b4a2-20761eab9aa8',
    src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/setup/2ds.webp',
    alt: 'Nintendo 2DS Close Up',
    order: 2,
    createdAt: '2025-12-01T21:00:52.654Z',
    updatedAt: '2025-12-01T21:00:52.654Z',
  },
  {
    id: '80dc36fe-d869-4db2-a506-becbc93d92ff',
    src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/setup/ac-shadows.webp',
    alt: 'Gaming Setup View',
    order: 3,
    createdAt: '2025-12-01T21:01:13.738Z',
    updatedAt: '2025-12-01T21:01:13.738Z',
  },
  {
    id: '8fbdf260-41df-4de0-bdba-3299f906e780',
    src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/setup/controllers.webp',
    alt: 'Controllers',
    order: 4,
    createdAt: '2025-12-01T21:01:31.699Z',
    updatedAt: '2025-12-01T21:01:31.699Z',
  },
];

export const gamingData: GamingData = {
  currentGame: games.find((g) => g.isCurrent) ?? null,
  gameBacklog: games.filter(
    (g) => g.status === GameStatus.BACKLOG && !g.isCurrent
  ),
  pcBuild: pcParts,
  pcBuildStory,
  consoles,
  gamingPhotos,
};
