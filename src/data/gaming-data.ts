import {
  Game,
  GameStatus,
  PCPart,
  Console,
  GamingPhoto,
  GamingData,
} from '@/types/gaming';

export const games: Game[] = [
  {
    title: 'Crimson Desert',
    cover:
      'https://image.api.playstation.com/vulcan/ap/rnd/202508/2905/e1904307aca2aa40bce189aae6399ec67bce47e50a25ff43.jpg',
    stickerImage: '/games/crimson_desert.webp',
    platform: 'PS5',
    status: GameStatus.PLAYING,
    isCurrent: true,
    notes:
      "I wishlisted this game as soon as I saw the first teaser. I looove medieval aesthetic and open world games, and this is the perfect combination I'm always looking for. Don't understand a thing about the main story, but I'm loving it. Might stick with it for a long time until either GTA 6 or Fable comes out",
  },
  {
    title: "Ghost of Tsushima: Director's Cut",
    cover:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/tsushima.webp',
    platform: 'PS5',
    status: GameStatus.BACKLOG,
    isCurrent: false,
    notes:
      "The best samurai game I've played so far! I played a demo of AC Shadows but it's not even close to this work of art. Love everything! I stopped playing when Pokemon Legends ZA came out but now I'm decided to complete it!",
  },
  {
    title: 'Core Keeper',
    cover:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/core%20keeper.webp',
    platform: 'PS5',
    status: GameStatus.PLAYING,
    isCurrent: false,
    notes:
      "Was curious about this game and got it free with PS Plus subscription... boy I love these survival/sandbox games, it's like Terraria & Stardew Valley had a child, they've put so much love in this game and I'm actually enjoying it, let's see how many hours I spend on this one.",
  },
  {
    title: "Assassin's Creed Odyssey",
    cover: 'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/image.webp',
    platform: 'PS5',
    status: GameStatus.PLAYING,
    isCurrent: false,
    notes:
      "Assassin's Creed is one of my all-time favorite franchise. Even though it lost some of its original essence during the RPG era, this is easily my favorite of the more recent entries. Maybe it's because it was the first one I played after a long break, but the Greek world is absolutely beautiful and the story still hits hard imo.\nNow that a few years have passed and all the DLCs are at huge discount, I'm planning to sink a lot of hours into replaying the base game + DLC, and yeah, I might even go for the platinum this time.",
  },
  {
    title: 'Pokémon Y',
    cover:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/pokemon-y.webp',
    platform: 'Nintendo 2DS',
    status: GameStatus.PLAYING,
    isCurrent: false,
    notes:
      "While playing Pokémon Legends ZA, it made me want to re-play this beauty again. Actually I never managed to finish this back in the day, so I'm trying again, now forcing me to use a gen-6-only team (yes, I always end with a Kanto team on almost every game)",
  },
  {
    title: 'Pokemon Legends ZA',
    cover: 'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/plza.webp',
    platform: 'Nintendo Switch',
    status: GameStatus.PLAYING,
    isCurrent: false,
    notes:
      'I took the risk buying it day one. Best decision ever! I finished the story already but really want to complete the post game and get the shiny charm.',
  },
  {
    title: 'The Legend of Zelda: Echoes of Wisdom',
    cover:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/image%20%2811%29.webp',
    platform: 'Nintendo Switch',
    status: GameStatus.BACKLOG,
    isCurrent: false,
    notes:
      'I bought this game at launch and even recorded an "aesthetic lo-fi" unboxing and first-impressions video (yeah, I briefly thought about becoming a gaming content creator). And then… I dropped it lol',
  },
  {
    title: 'Pokémon Sword',
    cover:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/image%20%2810%29.webp',
    platform: 'Nintendo Switch',
    status: GameStatus.BACKLOG,
    isCurrent: false,
    notes:
      "I also dropped this one before. I've started it twice already, but this time I'm committed to finishing it. Not sure I'll find people to run those raid battles with though.",
  },
  {
    title: 'Super Mario Galaxy 1 + 2',
    cover:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/image%20%289%29.webp',
    platform: 'Nintendo Switch',
    status: GameStatus.BACKLOG,
    isCurrent: false,
    notes:
      "Like many other games, I never really had the chance to play several mainline Mario games, the Mario Galaxy series being one of them. Now that Nintendo released this bundle, I'm ready to finally jump in and have a lot of fun.",
  },
  {
    title: 'Pokémon Scarlet',
    cover:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/image%20%288%29.webp',
    platform: 'Nintendo Switch',
    status: GameStatus.BACKLOG,
    isCurrent: false,
    notes:
      "I know, I brag a lot about being a Pokémon addict and building a Pokédex app, but I've never actually played every game in the series. Now's my chance to fix that. I just picked my starter and progressed far enough to redeem my shiny Miraidon code lol",
  },
  {
    title: 'Pokémon Ultra Sun',
    cover:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/image%20%287%29.webp',
    platform: 'Nintendo 2DS',
    status: GameStatus.BACKLOG,
    isCurrent: false,
    notes:
      "Back in the day, I played Pokémon Sun and loved the Alola region and its story. Now that I've got a 2DS again, it felt like the perfect time to pick up a physical copy of Ultra Sun and experience the enhanced version of that adventure.",
  },
  {
    title: 'LEGO Star Wars: The Skywalker Saga',
    cover:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/image%20%286%29.webp',
    platform: 'PS5',
    status: GameStatus.BACKLOG,
    isCurrent: false,
    notes:
      "I've always loved the LEGO video games, so I picked this one up in a physical deluxe edition, the trailers made the graphics look insane. I initially thought it was just a remastered take on the older games, but it turned out to be a completely new experience, and I enjoyed it a lot. It's very different from the traditional LEGO formula, and I still haven't finished it, so there's plenty more left to explore.",
  },
  {
    title: 'Gears Of War Reloaded',
    cover:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/image%20%285%29.webp',
    platform: 'PS5',
    status: GameStatus.BACKLOG,
    isCurrent: false,
    notes:
      "I had a brief experience with Gears 3 back in the Xbox 360 era, and it was awesome. I'm not really into shooters, but the third-person perspective instantly caught my attention. I never managed to finish it back then, so I picked this one up hoping to relive that experience, this time actually completing the campaign.",
  },
  {
    title: 'Hogwarts Legacy',
    cover:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/image%20%284%29.webp',
    platform: 'PS5',
    status: GameStatus.BACKLOG,
    isCurrent: false,
    notes:
      'I bought this game when it first came out, but for some reason I never finished it. I restarted it like three times because I kept forgetting the controls and everything else lol. Still, I really want to see it through, I love the Harry Potter saga.',
  },
  {
    title: 'Dark Souls Remastered',
    cover:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/image%20%283%29.webp',
    platform: 'PS5',
    status: GameStatus.BACKLOG,
    isCurrent: false,
  },
  {
    title: 'Dark Souls III',
    cover:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/image%20%282%29.webp',
    platform: 'PS5',
    status: GameStatus.BACKLOG,
    isCurrent: false,
    notes:
      'I\'m eager to finish the Dark Souls series. I know this game introduced the ideas that later evolved into "Ashes of War" in Elden Ring, and given how much I loved Elden Ring, I\'m expecting this to be a great experience.',
  },
  {
    title: 'The Last Of Us Part II',
    cover:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/image%20%281%29.webp',
    platform: 'PS5',
    status: GameStatus.BACKLOG,
    isCurrent: false,
    notes:
      "I grabbed the physical copy at a huge discount. I loved the first game and how it ended, and I managed to survive most of the TV show spoilers. I'm ready to find out what's next in this story.",
  },
  {
    title: 'Dark Souls II: Scholar Of The First Sin',
    cover:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/dark-souls-2.webp',
    platform: 'PS5',
    status: GameStatus.BACKLOG,
    isCurrent: false,
    notes:
      "I started this game several years ago on my old PC (it's a generous game that doesn't demand high specs), it was my first souls-like game I tried, and I loved it! but as you might know, the difficulty is overwhelming for me, so I stopped playing it like at the half of the story. Recently, I got a physical PS4 bundle of the Dark Souls trilogy at sale (long live physical format) and I decided to start with this one just for the nostalgia.",
  },
  {
    title: 'Dragon Age: The Veilguard',
    cover:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/dragon-age.webp',
    platform: 'PS5',
    status: GameStatus.BACKLOG,
    isCurrent: false,
    notes:
      "This is the first game in the series I've tried, and I have to say it... the history really sucks. When the trailer came out it really got me that I even bought this at launch, something I completely regret. But not everything is lost on this game, I really loved the RPG mechanics, and the graphics and visual style is truly beautiful! it's an entertaining game to play if you don't bother to pay attention to the history and dialogs lol so I also want to finish it.",
  },
  {
    title: 'The Elder Scrolls IV: Oblivion Remastered',
    cover:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/oblivion.webp',
    platform: 'PS5',
    status: GameStatus.BACKLOG,
    isCurrent: false,
    notes:
      'I only tried Skyrim before, but when this remastered version was announced it looked so beautiful that I insta bought it! and I have no regrets. Entering an oblivion gate is stunning 🔥 I definitely want to finish this game.',
  },
  {
    title: "Demon's Souls",
    cover:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/demons-souls.webp',
    platform: 'PS5',
    status: GameStatus.BACKLOG,
    isCurrent: false,
    notes:
      "Like many other games, I paused this one bc souls-like games are too difficult that I get overwhelmed quick. But this remaster of Demon's Souls is a true work of art! I never played the original one and I'm amazed of what they did with this new version.",
  },
];

export const pcParts: PCPart[] = [
  {
    component: 'CPU',
    name: 'Intel Core i7 13700',
    notes: '16 Core, 30MB Cache, 2.10GHz',
  },
  {
    component: 'GPU',
    name: 'NVIDIA RTX 4060 Ti | MSI Gaming X',
    notes: '8GB GDDR6. It works well in ultrawide resolution.',
  },
  {
    component: 'RAM',
    name: 'Corsair Vengance 32GB DDR5 6000MHz',
    notes: 'RGB off, performance on',
  },
  {
    component: 'Motherboard',
    name: 'MSI MAG B760 Tomahawk WiFi',
    notes: 'LGA 1700, DDR5, PCIe 5.0',
  },
  {
    component: 'Main Storage',
    name: 'Samsung 970 EVO Plus 1TB NVMe',
    notes: 'OS + Last gen games',
  },
  {
    component: 'Secondary Storage',
    name: 'Kingston NV3 1TB NVMe',
    notes: 'Game library overflow',
  },
  {
    component: 'PSU',
    name: 'Corsair RM850x Gold',
    notes: '850W 80+ Gold. A premium PSU for a premium PC',
  },
  {
    component: 'Case',
    name: 'NZXT H6 Flow Black',
    notes:
      "Honestly the best case I've had so far. Excellent air flow if you fill all fan spaces. This rig never gets hot since I bought it.",
  },
  {
    component: 'CPU Cooling',
    name: 'AIO Corsair H115i 280mm',
  },
  {
    component: 'Front Fans',
    name: '3 x NZXT F120mm RGB Core',
    notes: 'Those came within the case',
  },
  {
    component: 'Up & Bottom Fans',
    name: '4 x Corsair LL140mm RGB',
  },
  {
    component: 'Back Fan',
    name: '1 x Corsair LL120mm RGB',
  },
];

export const pcBuildStory =
  "I built my first PC in late 2020 after landing my first full-time dev job. Since then, I've upgraded it twice and ended up with this absolute unit… which I barely use. I'm mostly a console-on-the-couch kind of gamer, so this rig has officially reached its final form. It runs anything at solid 1080p, and honestly, that's all I need for a chill gaming session.";

export const consoles: Console[] = [
  {
    name: 'PlayStation 5',
    image: 'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/ps5.webp',
    story:
      "Although it's the first version, it is really powerful. I use it mostly for exclusives, but I do really love this console that I even bought the same games as in the PC just to play them in the couch lol.",
  },
  {
    name: 'Nintendo Switch OLED',
    image:
      'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/setup/switch.webp',
    story:
      "Originally I had the standard Switch, but then Tears of The Kingdom came out and I HAD to get the Zelda version, it's just beautiful. The OLED screen upgrade was absolutely worth it.",
  },
  {
    name: 'Nintendo 2DS',
    image:
      'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/setup/2ds-2.webp',
    story:
      "Long time ago I had a 2DS just like this one, but someone stole it from me. So nostalgia hit hard and I bought a refurbished one and came in excellent condition! it's the definitive console to play every old Pokémon games.",
  },
];

export const gamingPhotos: GamingPhoto[] = [
  {
    src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/setup/pc.webp',
    alt: 'Custom PC Build',
  },
  {
    src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/setup/2ds.webp',
    alt: 'Nintendo 2DS Close Up',
  },
  {
    src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/setup/ac-shadows.webp',
    alt: 'Gaming Setup View',
  },
  {
    src: 'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/setup/controllers.webp',
    alt: 'Controllers',
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
