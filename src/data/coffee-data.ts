import {
  CoffeeGear,
  CoffeeGearCategory,
  CoffeeStory,
  CoffeeJourneyMilestone,
  CoffeeData,
} from '@/types/coffee';

export const coffeeGear: CoffeeGear[] = [
  {
    id: 'machine',
    name: 'Bambino',
    brand: 'Breville',
    description:
      'Compact espresso machine. The heart of my setup. Delivers incredibly consistent shots.',
    image:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/image%20%2815%29.webp',
    category: CoffeeGearCategory.machine,
    order: 0,
    createdAt: '2025-12-02T03:29:12.058Z',
    updatedAt: '2026-01-13T22:34:29.61Z',
  },
  {
    id: 'grinder',
    name: 'Encore ESP',
    brand: 'Baratza',
    description:
      'It delivers a decent grind resolution. Game changer for early morning shots.',
    image:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/grinder.webp',
    category: CoffeeGearCategory.grinder,
    order: 0,
    createdAt: '2025-12-02T03:29:12.71Z',
    updatedAt: '2026-01-13T22:40:42.414Z',
  },
  {
    id: 'cold-brew-maker',
    name: 'Cold Brew Maker',
    brand: 'Starbucks',
    description:
      'Makes smooth, rich cold brew coffee at home. Perfect for hot days or iced lattes.',
    image:
      'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/setup/cold-brew.webp',
    category: CoffeeGearCategory.accessories,
    order: 0,
    createdAt: '2025-12-02T03:29:13.354Z',
    updatedAt: '2025-12-02T03:29:13.354Z',
  },
  {
    id: 'portafilter',
    name: 'Botomless Portafilter',
    brand: 'Unknown',
    description:
      'Switched to a bottomless portafilter mostly for the aesthetics, and honestly, no regrets. It just looks way better while pulling shots.',
    image:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/portafilter.webp',
    category: CoffeeGearCategory.accessories,
    order: 1,
    createdAt: '2025-12-02T03:29:13.994Z',
    updatedAt: '2025-12-11T18:37:10.192Z',
  },
  {
    id: 'tamper',
    name: 'Tamper',
    brand: 'CAPFEI',
    description:
      'Calibrated to 25lbs of pressure. Consistent tamp every time without thinking about it and a nice pattern.',
    image:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/tamper.webp',
    category: CoffeeGearCategory.accessories,
    order: 2,
    createdAt: '2025-12-02T03:29:14.635Z',
    updatedAt: '2025-12-11T18:37:24.111Z',
  },
  {
    id: 'wdt',
    name: 'WDT Tool',
    brand: 'Boppon',
    description:
      '0.4mm needles for perfect distribution. Eliminates channeling and improves extraction consistency.',
    image: 'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/wdt.webp',
    category: CoffeeGearCategory.accessories,
    order: 3,
    createdAt: '2025-12-02T03:29:15.278Z',
    updatedAt: '2025-12-02T04:03:03.847Z',
  },
  {
    id: 'puckscreen',
    name: 'Puck Screen',
    brand: 'Unknown',
    description:
      'A simple stainless-steel puck screen that helps keep the group head cleaner and evens out the extraction.',
    image:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/puck-screen.webp',
    category: CoffeeGearCategory.accessories,
    order: 4,
    createdAt: '2025-12-02T03:29:15.922Z',
    updatedAt: '2025-12-02T04:04:23.106Z',
  },
  {
    id: '6cdb3a11-9930-45bb-8cd3-01a40395a0c5',
    name: 'Gravity Distributor',
    brand: 'Normcore',
    description:
      'Accurately enables uniform and even dispersion of coffee grounds for a perfect espresso extraction every time.',
    image:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/0e9656_d6f42d9452044bd0b3d1fb7dd3b25971_mv2%20%281%29.webp',
    category: CoffeeGearCategory.accessories,
    order: 5,
    createdAt: '2026-01-13T22:20:57.633Z',
    updatedAt: '2026-01-13T22:20:57.633Z',
  },
  {
    id: 'd650ea0a-c644-42a5-8fd3-ca0fa243163b',
    name: 'Pocket Coffee Scale V3',
    brand: 'Normcore',
    description:
      'Helps you weigh your beans and water for brewing, so you achieve a balanced and consistent cup of coffee.',
    image:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/image%20%2812%29.webp',
    category: CoffeeGearCategory.accessories,
    order: 6,
    createdAt: '2026-01-13T22:23:34.751Z',
    updatedAt: '2026-01-13T22:23:34.751Z',
  },
  {
    id: 'f38dc8d5-03f4-4573-a4a4-054f3f38487b',
    name: 'Tamping Mat With Corner Edge',
    brand: 'Normcore',
    description:
      'Safeguard your lovely countertops and protect your tamper from dents.',
    image:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/image%20%2813%29.webp',
    category: CoffeeGearCategory.accessories,
    order: 7,
    createdAt: '2026-01-13T22:25:30.259Z',
    updatedAt: '2026-01-13T22:25:30.259Z',
  },
  {
    id: 'c4304a1f-1a47-45c5-a6e6-e456bbc94628',
    name: 'Atmos Vacuum Canister',
    brand: 'Fellow',
    description:
      'Keeps coffee beans fresher for longer. It features a manual vacuum pump in the lid to remove air and reduce oxidation.',
    image:
      'https://o9odtcpgjcjy0yrm.public.blob.vercel-storage.com/canister.webp',
    category: CoffeeGearCategory.accessories,
    order: 8,
    createdAt: '2026-01-22T20:44:27.929Z',
    updatedAt: '2026-01-22T20:44:27.929Z',
  },
];

export const coffeeStory: CoffeeStory = {
  id: '0aacd720-65fe-4edb-84e6-270fc314a2ce',
  headline: 'From Barista to Home Enthusiast',
  intro:
    'Back in my uni years, I worked as a barista at a local coffee shop. It was the perfect gig, free espresso, chill vibes, and I got to geek out on extraction times (I never learned latte art though). Fast forward a few years into my software career, nostalgia hit hard.',
  body: "What started as a simple coffee machine that my girlfriend gifted me in 2022, quickly spiraled into a full-blown coffee corner project. Now I've got a semi-pro setup that rivals some cafes, and I'm still adding to it. It's one of my little analog escapes from the digital world.",
  updatedAt: '2025-12-02T03:29:16.924Z',
};

export const coffeeJourney: CoffeeJourneyMilestone[] = [
  {
    id: 'milestone-0',
    year: '2017',
    title: 'Barista Days',
    description:
      'Worked at a local coffee shop during university. Learned the fundamentals and fell in love with the craft.',
    order: 0,
    createdAt: '2025-12-02T03:29:17.282Z',
    updatedAt: '2025-12-02T03:29:17.282Z',
  },
  {
    id: 'milestone-1',
    year: '2022',
    title: 'Nostalgia Kicks In',
    description:
      'My beloved one bought me a basic espresso machine. Realized I missed making coffee. Started down the rabbit hole.',
    order: 1,
    createdAt: '2025-12-02T03:29:17.923Z',
    updatedAt: '2025-12-02T03:29:17.923Z',
  },
  {
    id: 'milestone-2',
    year: '2024',
    title: 'First Huge Upgrade',
    description:
      "My first machine just stopped working and we couldn't save it. So as a self-birthday gift, I invested in a Breville Bambino. The home café dream begins.",
    order: 2,
    createdAt: '2025-12-02T03:29:18.573Z',
    updatedAt: '2025-12-02T03:29:18.573Z',
  },
  {
    id: 'milestone-3',
    year: '2025',
    title: 'Second Huge Upgrade',
    description:
      "A year later, I decided to level up: a proper coffee grinder. I'd been getting by with a basic blade grinder, and while it worked, I wanted way more precision for my espresso shots. So I invested in a Baratza Encore ESP, a solid burr grinder that finally gave me the consistency I was chasing.",
    order: 3,
    createdAt: '2025-12-02T03:29:19.214Z',
    updatedAt: '2025-12-02T03:29:19.214Z',
  },
  {
    id: 'milestone-4',
    year: '2025',
    title: 'Accessories Era',
    description:
      "I fell down the rabbit hole and started upgrading all the small things: a proper coffee distributor, a WDT tool with those tiny needles to break up clumps, a precision tamper to replace the sad stock one, a stainless-steel puck screen (because apparently everyone uses one and I wasn't about to be left out), and even a tiny RDT spray bottle to tame static before grinding. At this point, it stopped being just coffee, it became a whole ritual.",
    order: 4,
    createdAt: '2025-12-02T03:29:19.856Z',
    updatedAt: '2025-12-02T03:29:19.856Z',
  },
];

export const coffeeData: CoffeeData = {
  gear: coffeeGear,
  story: coffeeStory,
  journey: coffeeJourney,
  photos: [],
};
