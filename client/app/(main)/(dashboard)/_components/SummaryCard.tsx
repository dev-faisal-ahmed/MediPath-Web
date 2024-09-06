import * as card from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type TProps = {
  title: string;
  value: number;
  icon?: ReactNode;
  colorClass?: string;
};

export const SummaryCard = ({ title, value, icon, colorClass }: TProps) => {
  return (
    <card.Card className='w-full'>
      <card.CardHeader>
        <card.CardTitle className='font-semibold'>{title}</card.CardTitle>
      </card.CardHeader>
      <card.CardContent
        className={cn('flex items-center justify-between', colorClass)}
      >
        <h3 className='text-2xl font-semibold'>৳ {value}</h3>
        <span className='text-xl'>{icon}</span>
      </card.CardContent>
    </card.Card>
  );
};
