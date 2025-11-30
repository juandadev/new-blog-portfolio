export interface CoffeeGear {
  id: string;
  name: string;
  brand: string;
  description: string;
  image: string;
  category: 'machine' | 'grinder' | 'accessories' | 'beans';
}

export interface CoffeeJourneyMilestone {
  year: string;
  title: string;
  description: string;
}

export const coffeeStory = {
  headline: 'From Barista to Home Enthusiast',
  intro:
    'Back in my uni years, I worked as a barista at a local coffee shop. It was the perfect gig, free espresso, chill vibes, and I got to geek out on extraction times (I never learned latte art though). Fast forward a few years into my software career, nostalgia hit hard.',
  body: "What started as a simple coffee machine that my girlfriend gifted me in 2022, quickly spiraled into a full-blown coffee corner project. Now I've got a semi-pro setup that rivals some cafes, and I'm still adding to it. It's one of my little analog escapes from the digital world.",
};

export const coffeeGear: CoffeeGear[] = [
  {
    id: 'machine',
    name: 'Bambino',
    brand: 'Breville',
    description:
      'Compact espresso machine. The heart of my setup. Delivers incredibly consistent shots.',
    image:
      'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/setup/coffee-machine.webp',
    category: 'machine',
  },
  {
    id: 'grinder',
    name: 'Baratza',
    brand: 'Encore ESP',
    description:
      'It delivers a decent grind resolution. Game changer for early morning shots.',
    image:
      'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/setup/cofee-grinder.webp',
    category: 'grinder',
  },
  {
    id: 'cold-brew-maker',
    name: 'Cold Brew Maker',
    brand: 'Starbucks',
    description:
      'Makes smooth, rich cold brew coffee at home. Perfect for hot days or iced lattes.',
    image:
      'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/setup/cold-brew.webp',
    category: 'accessories',
  },
  {
    id: 'portafilter',
    name: 'Botomless Portafilter 54mm',
    brand: 'Unknown',
    description:
      'Switched to a bottomless portafilter mostly for the aesthetics, and honestly, no regrets. It just looks way better while pulling shots.',
    image:
      'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/setup/portafilter.webp',
    category: 'accessories',
  },
  {
    id: 'tamper',
    name: 'Tamper 54mm',
    brand: 'CAPFEI',
    description:
      'Calibrated to 25lbs of pressure. Consistent tamp every time without thinking about it and a nice pattern.',
    image:
      'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/setup/tamper.webp',
    category: 'accessories',
  },
  {
    id: 'wdt',
    name: 'WDT Tool',
    brand: 'Boppon',
    description:
      '0.4mm needles for perfect distribution. Eliminates channeling and improves extraction consistency.',
    image:
      'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/setup/wdt.webp',
    category: 'accessories',
  },
  {
    id: 'puckscreen',
    name: 'Puck Screen',
    brand: 'Unknown',
    description:
      'A simple stainless-steel puck screen that helps keep the group head cleaner and evens out the extraction.',
    image:
      'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/setup/puckscreen.webp',
    category: 'accessories',
  },
];

export const coffeeJourney: CoffeeJourneyMilestone[] = [
  {
    year: '2017',
    title: 'Barista Days',
    description:
      'Worked at a local coffee shop during university. Learned the fundamentals and fell in love with the craft.',
  },
  {
    year: '2022',
    title: 'Nostalgia Kicks In',
    description:
      'My beloved one bought me a basic espresso machine. Realized I missed making coffee. Started down the rabbit hole.',
  },
  {
    year: '2024',
    title: 'First Huge Upgrade',
    description:
      "My first machine just stopped working and we couldn't save it. So as a self-birthday gift, I invested in a Breville Bambino. The home café dream begins.",
  },
  {
    year: '2025',
    title: 'Second Huge Upgrade',
    description:
      'A year later, I decided to level up: a proper coffee grinder. I’d been getting by with a basic blade grinder, and while it worked, I wanted way more precision for my espresso shots. So I invested in a Baratza Encore ESP, a solid burr grinder that finally gave me the consistency I was chasing.',
  },
  {
    year: '2025',
    title: 'Accessories Era',
    description:
      'I fell down the rabbit hole and started upgrading all the small things: a proper coffee distributor, a WDT tool with those tiny needles to break up clumps, a precision tamper to replace the sad stock one, a stainless-steel puck screen (because apparently everyone uses one and I wasn’t about to be left out), and even a tiny RDT spray bottle to tame static before grinding. At this point, it stopped being just coffee, it became a whole ritual.',
  },
];

export const coffeeGallery = [
  {
    id: 'setup-1',
    image: '/home-espresso-station-with-rancilio-machine-warm-l.jpg',
    caption: 'The current setup',
  },
  {
    id: 'setup-2',
    image: '/espresso-shot-pulling-from-bottomless-portafilter-.jpg',
    caption: 'Morning ritual',
  },
  {
    id: 'setup-3',
    image: '/latte-art-rosetta-in-ceramic-cup-top-view.jpg',
    caption: 'Getting better at rosettas',
  },
];
