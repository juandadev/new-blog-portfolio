export interface SetupItem {
  name: string;
  description: string;
  category:
    | 'desk'
    | 'computer'
    | 'peripherals'
    | 'audio'
    | 'lighting'
    | 'furniture'
    | 'misc';
  link?: string;
}

export const setupItems: SetupItem[] = [
  // Desk & Furniture
  {
    name: 'Fohfurniture Standing Desk Frame + IKEA MITTCIRKEL board',
    description:
      '140xm x 60cm countertop with programmable height presets. Game changer for long coding sessions.',
    category: 'furniture',
    link: 'https://fohfurniture.com/product/standing-desk-frame-zz550bmx/?srsltid=AfmBOooYIftQ3fGGODLr7CWOnwznuv9hBZMob8wZhZ6_wSH88Nbx7Q0D',
  },
  {
    name: 'ASUS Rog Chariot X Core Gaming Chair',
    description:
      "Sturdy, fully loaded. It has good premium features that I never experienced in a regular chair, but I have to admit that it isn't the most confortable chair that I've sit on. I haven't change it bc it was hella expensive and somehow it helps to remind me to use the standing desk lol",
    category: 'furniture',
    link: 'https://rog.asus.com/apparel-bags-gear/gear/rog-chariot-x-core/',
  },
  {
    name: 'IKEA ALEX Drawer Unit',
    description:
      'Classic black drawer unit for storing cables, notebooks, spare LEGO pieces, and random tech.',
    category: 'furniture',
    link: 'https://www.ikea.com/us/en/p/alex-drawer-unit-black-brown-60473548/',
  },
  {
    name: 'Mind Reader ergonomic footrest',
    description: 'Great for long coding sessions while you are sitting.',
    category: 'furniture',
    link: 'https://mindreaderproducts.com/collections/foot-rests/products/mind-reader-anchor-collection-adjustable-ergonomic-textured-foot-rest-black',
  },
  {
    name: 'IKEA SKÅDIS + Accessories',
    description:
      'Beautiful pegboard to display gear and accessories. It also helps extending storage for little pieces and frequently used gadgets.',
    category: 'furniture',
    link: 'https://www.ikea.com/us/en/p/skadis-pegboard-wood-10347171/',
  },
  {
    name: 'IKEA LACK wall shelves',
    description: 'Nice shelves tha I use to display some figures & lego sets.',
    category: 'furniture',
    link: 'https://www.ikea.com/us/en/p/lack-wall-shelf-black-brown-40430588/',
  },
  {
    name: 'Lamicall Headphone Stand',
    description: 'Nice and minimalistic headphone stand. It just looks good.',
    category: 'furniture',
    link: 'https://lamicallshop.com/products/desktop-headset-holder-earphone-stand',
  },
  // Computer
  {
    name: 'Mac Mini M4 2024',
    description: '24GB RAM, 512GB SSD. Desktop powerhouse for heavy workloads.',
    category: 'computer',
    link: 'https://apple.com',
  },
  {
    name: 'MacBook Pro 16" M1 Pro 2021',
    description:
      "16GB RAM, 512GB SSD. Secondary machine for dual PC streaming & development while I'm traveling or working outside. The battery life and speakers are unreal.",
    category: 'computer',
    link: 'https://apple.com',
  },
  {
    name: 'Custom PC Build',
    description: 'Intel Core i7 13700, RTX 4060 Ti, 32GB RAM DDR5. For gaming.',
    category: 'computer',
  },
  // Monitors & Display
  {
    name: 'LG 34GL750-B UltraGear 34" UltraWide',
    description:
      "Primary and only monitor. I really love it for gaming, no ghosting and fast response time. I don't care that much for little details so it's fine for the rest of my activities",
    category: 'desk',
    link: 'https://www.lg.com/us/monitors/lg-34gl750-b-ultrawide-monitor',
  },
  {
    name: 'Oakywood Desk Shelf',
    description:
      "Creates additional storage underneath & improve aesthetics. I really recommend this brand because it's made out of real wood",
    category: 'desk',
    link: 'https://oakywood.shop/products/desk-shelf-dual-monitor-stand',
  },
  {
    name: 'UGREEN 360° Rotating Laptop Stand Holder',
    description:
      'Adjustable rotating base. Perfect when I connect any laptop to my monitor, or doing dual PC streaming.',
    category: 'desk',
    link: 'https://us.ugreen.com/collections/laptop-stands/products/ugreen-360-rotating-tablet-stand-holder',
  },
  // Peripherals
  {
    name: 'NuPhy Air75',
    description:
      'Low-profile Blue switches. Wireless with macOS & Windows support.',
    category: 'peripherals',
    link: 'https://nuphy.com/products/air75',
  },
  {
    name: 'Logitech MX Master 3S',
    description:
      'Best mouse for ergonomics. The horizontal scroll wheel is essential.',
    category: 'peripherals',
    link: 'https://www.logitech.com/en-us/shop/p/mx-master-3s',
  },
  {
    name: 'Blue Yeti, Yeticaster Bundle',
    description:
      'Perfect bundle for your setup. Intended for streaming and video recording, and ended up to sound fancy on my standup meetings.',
    category: 'peripherals',
    link: 'https://www.logitechg.com/en-us/shop/p/yeticaster-pro-streaming-microphone-bundle',
  },
  {
    name: 'Blue Snowball iCE',
    description:
      'Bought this for dual PC streaming to have a direct input on game voice chats. Might get another use for content creation.',
    category: 'peripherals',
    link: 'https://www.logitechg.com/en-us/shop/p/snowball-ice-usb-microphone.988-000067',
  },
  // Audio
  {
    name: 'Sony WH-1000XM6',
    description:
      "Daily drivers for focus time. The noise cancellation is decent and sound quality is the best I've tried so far.",
    category: 'audio',
    link: 'https://store.sony.com.mx/wh-1000xm6/p',
  },
  {
    name: 'AirPods Pro (1st generation)',
    description:
      "For when I'm working outside or any other activity that doesn't involve coding on a desk. The best noise cancellation that I've tried so far. And works perfectly with your apple ecosystem.",
    category: 'audio',
    link: 'https://apple.com',
  },
  {
    name: 'Logitech Z150 Stereo Speakers',
    description:
      "Desktop speakers for when I don't want headphones. A cheap solution when you don't care much about audio quality with speakers, it just works.",
    category: 'audio',
    link: 'https://www.logitech.com/en-us/shop/p/z150-compact-stereo-speakers.980-000802',
  },
  // Lighting
  {
    name: 'Quntis LED ScreenLinear Basic Plus',
    description:
      'Monitor light bar. No screen glare, perfect lighting for my desk at night.',
    category: 'lighting',
    link: 'https://www.quntis.com/products/quntis-screenlinear-pro-max-computer-monitor-light-fit-for-22-29-monitor',
  },
  {
    name: 'Philips Hue Play Bars',
    description:
      'Behind the monitors for ambient lighting. Creates a smooth and cozy ambient at night.',
    category: 'lighting',
    link: 'https://www.philips-hue.com/en-us/p/hue-white-and-color-ambiance-play-light-bar-double-pack/7820231U7',
  },
  {
    name: 'Elgato Key Light',
    description:
      "Ultra-bright and dimmable light source for when I'm streaming or recording videos.",
    category: 'lighting',
    link: 'https://www.elgato.com/us/en/p/key-light',
  },
  // Misc
  {
    name: 'CalDigit TS4 Thunderbolt Hub',
    description:
      'Single cable docking for my Macbook before I bought the Mac mini. 18 ports, handles everything. Overkill, yes... I was just hyped for the tech enthusiast trends. It ended up as a nice addition for my dual PC streaming + video capture.',
    category: 'misc',
    link: 'https://www.caldigit.com/thunderbolt-station-4/',
  },
  {
    name: 'AC Infinity MULTIFAN S3',
    description:
      'Quiet 120mm USB Fan on top of my Thunderbolt Hub. It is a game changer to handle overheat on long coding sessions.',
    category: 'misc',
    link: 'https://a.co/d/1acqNKZ',
  },
  {
    name: 'UGREEN USB 3.0 KVM Switch',
    description:
      'Sharing peripherals between 2 computers. A single button click and I switch between my Macbook/Mac Mini (through the thunderbolt dock) and my Gaming PC.',
    category: 'misc',
    link: 'https://us.ugreen.com/products/ugreen-usb-c-switch-2-port-4-usb3',
  },
  {
    name: 'UGREEN HDMI Switch',
    description:
      "Before getting a TV this was my go to for having everything connected in the same monitor. PS5, Nintendo Switch, PC, Macbook. I't's still useful for my dual PC streaming though.",
    category: 'misc',
  },
  {
    name: 'CyberPower No-break 1500VA / 900W',
    description:
      'Living in Mexico means that you are never safe against a power outage. This heavy device powers up my entire setup and protects me with automatic voltage regulation, voltage spikes & a powerful battery that gives me enough time to safely power off my devices when electricity goes off.',
    category: 'misc',
    link: 'https://www.cyberpower.com/global/en/product/sku/cp1500pfclcda',
  },
];

export const categoryLabels: Record<SetupItem['category'], string> = {
  desk: 'Desk & Display',
  computer: 'Computers',
  peripherals: 'Peripherals',
  audio: 'Audio',
  lighting: 'Lighting',
  furniture: 'Furniture & Decoration',
  misc: 'Miscellaneous',
};

export const categoryOrder: SetupItem['category'][] = [
  'furniture',
  'computer',
  'desk',
  'peripherals',
  'audio',
  'lighting',
  'misc',
];
