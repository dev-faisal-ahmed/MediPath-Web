import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type TProps = {
  age: string | undefined;
  ageTitle: string | undefined;
};

export const PatientAgeInput = ({ age, ageTitle }: TProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <Label className='font-semibold'>Patient&apos;s Age</Label>
      <div className='flex items-center rounded-md border border-input pr-2'>
        <Input
          defaultValue={age}
          className='border-0 focus-visible:ring-0'
          name='age'
          placeholder='Input Age'
          type='number'
        />
        <select
          defaultValue={ageTitle}
          name='ageTitle'
          className='border-l border-input bg-transparent outline-none'
        >
          <option value='year'>Years</option>
          <option value='month'>Months</option>
          <option value='day'>Days</option>
          <option value='hour'>Hours</option>
        </select>
      </div>
    </div>
  );
};
