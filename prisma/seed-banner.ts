import { PrismaClient } from './generated/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding promotional banner...');

  const v0EventBanner = await prisma.promoBanner.upsert({
    where: { id: 'seed-v0-event-gdl' },
    update: {},
    create: {
      id: 'seed-v0-event-gdl',
      title: 'v0 Prompt to Production Week - Guadalajara',
      text: 'Feb 5th, 6PM @ Globant GDL. Build apps, ship to showcase, win global recognition.',
      linkUrl: 'https://luma.com/oski7waq',
      linkText: 'Register Now',
      icon: 'PartyPopper',
      variant: 'PROMO',
      enabled: true,
    },
  });

  console.log('Created promo banner:', v0EventBanner);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
