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
  Section,
  Img,
} from '@react-email/components';
import EmailFooter from '@/components/EmailTemplate/EmailFooter';

interface NewPostTemplateProps {
  title: string;
  slug: string;
  coverImage?: string;
  email: string;
}

export default function NewPostTemplate({
  title,
  slug,
  coverImage,
  email,
}: NewPostTemplateProps) {
  return (
    <Html lang={'es'}>
      <Preview>New post on my blog: {title}</Preview>
      <Tailwind>
        <Container className="bg-[#FBF9F7] p-10 font-sans text-[#34302D]">
          <Section className="relative">
            <Img
              width={40}
              src="https://github.com/juandadev.png"
              alt="Juandadev logo"
              className="rounded-md"
            />
            <Heading className="mt-0 text-center text-3xl font-extrabold">
              New post on my blog!
            </Heading>
            <div className="absolute right-0 bottom-3 left-0 m-auto block h-2 w-80 bg-[#93CEFC]" />
          </Section>
          <Text className="text-center">
            I’ve just published a new article that you might find interesting:
          </Text>
          <Text className="text-center text-2xl font-medium">{title}</Text>
          {coverImage && (
            <Section>
              <Img
                width={520}
                src={coverImage}
                alt={`Imagen de portada para ${title}`}
                className="rounded-lg"
              />
            </Section>
          )}
          <Section className="mt-5">
            <Button
              className="w-[472px] cursor-pointer rounded-[10px] bg-[#93CEFC] px-6 py-3 text-center text-[18px]/[150%] font-medium tracking-[-0.5px] whitespace-nowrap text-[#1C1A19] outline-none"
              href={`https://juanda.dev/blog/${slug}`}
            >
              Read now
            </Button>
          </Section>
          <Hr />
          <EmailFooter email={email} />
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
