import React from 'react';
import {
  Container,
  Heading,
  Html,
  Text,
  Button,
  Tailwind,
  Preview,
  Hr,
  Link,
  Section,
  Img,
} from '@react-email/components';

interface NewPostTemplateProps {
  title: string;
  slug: string;
  email: string;
  coverImage?: string;
}

export default function NewPostTemplate({
  title,
  slug,
  email,
  coverImage,
}: NewPostTemplateProps) {
  return (
    <Html lang={'es'}>
      <Preview>Nuevo artículo en el blog: {title}</Preview>
      <Tailwind>
        <Container className={'bg-[#FBF9F7] p-3 font-sans text-[#34302D]'}>
          <Section className={'relative'}>
            <Heading className={'text-center text-3xl font-extrabold'}>
              ¡Nuevo post en mi blog!
            </Heading>
            <div
              className={
                'absolute right-0 bottom-3 left-0 m-auto block h-2 w-80 bg-[#93CEFC]'
              }
            />
          </Section>
          <Text className={'text-center'}>
            Acabo de publicar un nuevo artículo que podría interesarte:
          </Text>
          <Text className={'text-center text-2xl font-medium'}>{title}</Text>
          {coverImage && (
            <Section className={'flex justify-center'}>
              <Img
                width={400}
                src={coverImage}
                alt={`Imagen de portada para ${title}`}
                className={'rounded-lg'}
              />
            </Section>
          )}
          <Section className={'mt-5 flex justify-center'}>
            <Button
              className={
                'inline-flex w-fit cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-[#93CEFC] px-6 py-3 text-[18px]/[150%] font-medium tracking-[-0.5px] whitespace-nowrap text-[#1C1A19] outline-none'
              }
              href={`https://juanda.dev/blog/${slug}`}
            >
              Leer ahora
            </Button>
          </Section>
          <Hr />
          <Text className={'text-xs'}>
            Estás recibiendo este correo porque te suscribiste a mi blog. Si ya
            no deseas recibir más actualizaciones, puedes{' '}
            <Link href={`https://juanda.dev/newsletter/unsubscribe/${email}`}>
              darte de baja aquí
            </Link>
            .
          </Text>
          <Text className={'text-xs'}>
            © {new Date().getFullYear()} juanda.dev
          </Text>
        </Container>
      </Tailwind>
    </Html>
  );
}

NewPostTemplate.PreviewProps = {
  title: '😵‍💫 Server Components en Next.js 15: Lo que entendí mal (y bien)',
  slug: 'server-components-en-nextjs-15-lo-que-entendi-mal-y-bien',
  email: 'snoopdjffny@gmail.com',
  coverImage:
    'https://raw.githubusercontent.com/juandadev/assets-blog/refs/heads/main/server%20components%201/cover.webp',
};
