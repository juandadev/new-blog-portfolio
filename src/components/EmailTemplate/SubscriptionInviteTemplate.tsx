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

interface SubscriptionInviteTemplateProps {
  token: string;
}

export default function SubscriptionInviteTemplate({
  token,
}: SubscriptionInviteTemplateProps) {
  return (
    <Html lang={'es'}>
      <Preview>Confirm your newsletter subscription</Preview>
      <Tailwind>
        <Container className="bg-[#FBF9F7] p-10 font-sans text-[#34302D]">
          <Section className="relative">
            <Img
              width={40}
              src="https://github.com/juandadev.png"
              alt="Juandadev logo"
              className="rounded-md"
            />
            <Heading className="text-center text-3xl font-extrabold">
              Confirm your newsletter subscription
            </Heading>
            <div className="absolute right-0 bottom-3 left-0 m-auto block h-2 w-80 bg-[#93CEFC]" />
          </Section>
          <Text className="text-center">
            Hi! Thanks for your interest in my newsletter. To complete your
            subscription, please verify your email address by clicking the
            button below.
          </Text>
          <Section className="mt-5">
            <Button
              className="w-[472px] cursor-pointer rounded-[10px] bg-[#93CEFC] px-6 py-3 text-center text-[18px]/[150%] font-medium tracking-[-0.5px] whitespace-nowrap text-[#1C1A19] outline-none"
              href={`https://juanda.dev/newsletter/confirm?token=${token}`}
            >
              Verify email and subscribe
            </Button>
          </Section>
          <Hr />
          <Text className="text-xs">
            © {new Date().getFullYear()} juanda.dev
          </Text>
        </Container>
      </Tailwind>
    </Html>
  );
}

SubscriptionInviteTemplate.PreviewProps = {
  token: '1234567890abcdef1234567890abcdef',
};
