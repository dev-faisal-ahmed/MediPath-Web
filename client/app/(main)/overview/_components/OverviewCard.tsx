import * as card from '@/components/ui/card';

type TProps = {
  label: string;
  value: number;
};

export const OverviewCard = ({ label, value }: TProps) => {
  return (
    <card.Card>
      <card.CardHeader>
        <card.CardTitle>{label}</card.CardTitle>
      </card.CardHeader>
      <card.CardContent>
        <p className='text-xl font-semibold'>৳ {value || 0} </p>
      </card.CardContent>
    </card.Card>
  );
};
