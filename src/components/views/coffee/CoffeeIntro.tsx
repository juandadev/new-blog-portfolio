import { Card, CardContent, CardHeader } from '../../ui/Card';
import { coffeeData } from '@/data/coffee-data';

export default function CoffeeIntro() {
  return (
    <Card className="md:col-span-2 xl:col-span-3">
      <CardHeader className="text-card-foreground text-5xl font-semibold tracking-tight">
        {coffeeData.story!.headline}
      </CardHeader>
      <CardContent className="space-y-4">
        <p>{coffeeData.story!.intro}</p>
        <p>{coffeeData.story!.body}</p>
      </CardContent>
    </Card>
  );
}
