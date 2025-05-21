import React from 'react';
import { Heading } from '@/components/ui/Heading';
import { Typography } from '@/components/Typography/Typography';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';

export default function NewsletterPage() {
  return (
    <div className={'flex flex-col gap-300'}>
      <div className={'flex flex-col gap-200'}>
        <Heading level={1} preset={2}>
          Newsletter
        </Heading>
        <Typography>
          ¿Quieres enterarte de mis últimos posts, tutoriales de código y una
          que otra aventura personal? Suscríbete a mi newsletter. Es la forma
          más fácil de no perderte nada nuevo y recibir de vez en cuando tips o
          ideas que valen la pena compartir.
        </Typography>
        <Typography preset={5}>
          Me encantaría que te unas a esta travesía y también conocer un poco de
          la tuya.
        </Typography>
      </div>
      <div className={'flex flex-col gap-100'}>
        <div className={'flex flex-col gap-200'}>
          <div>
            <Label htmlFor={'email'}>Correo</Label>
            <Input
              type={'email'}
              id={'email'}
              placeholder={'email@ejemplo.com'}
            />
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className={'inline-block w-fit'}>
                  <Button disabled>Mantenerme al tanto</Button>
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <Typography as={'span'} preset={8}>
                  Estoy trabajando en esto. Tenme paciencia 👀
                </Typography>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Typography as={'span'} preset={8}>
          Te puedes desuscribir cuando quieras. Sin spam, lo juro 🙂
        </Typography>
      </div>
    </div>
  );
}
