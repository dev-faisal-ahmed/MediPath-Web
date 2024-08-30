import * as card from '@/components/ui/card';
import { ReactNode } from 'react';

type TProps = {
  title: string;
  value: number;
  icon?: ReactNode;
};

export const SummaryCard = ({ title, value, icon }: TProps) => {
  return (
    <card.Card>
      <card.CardHeader>
        <card.CardTitle className='text-lg font-semibold'>
          {title}
        </card.CardTitle>
      </card.CardHeader>
      <card.CardContent className='flex items-center justify-between'>
        <h3 className='text-3xl font-semibold'>৳ {value}</h3>
        {icon}
      </card.CardContent>
    </card.Card>
  );
};
