import { Card, CardContent, CardHeader } from '@/components/ui/Card';

export default function SetupIntro() {
  return (
    <Card className="md:col-span-2">
      <CardHeader className="text-card-foreground text-5xl font-semibold tracking-tight">
        My WFH Setup
      </CardHeader>
      <CardContent className="space-y-4">
        <p>
          Been building my dream setup piece by piece since 2020. This is years
          of effort, re-design, and many iterations to achieve the result I have
          today, suited for a high-performance experience.
        </p>
        <p>
          Since many folks often ask for stuff I show on pictures, here&apos;s
          the most relevant stuff I own.
        </p>
        <p>Last update: May 21st 2026</p>
      </CardContent>
    </Card>
  );
}
