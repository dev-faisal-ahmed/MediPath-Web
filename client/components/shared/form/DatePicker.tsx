'use client';

import * as React from 'react';
import * as popover from '@/components/ui/popover';

import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { IoCalendar } from 'react-icons/io5';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';

type TProps = {
  label: string;
  date: Date;
  onDateSelect: (date: Date | undefined) => void;
};

export function DatePicker({ label, date, onDateSelect }: TProps) {
  return (
    <div className='flex flex-col gap-2'>
      <Label className='font-semibold'>{label}</Label>
      <popover.Popover>
        <popover.PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <IoCalendar className='mr-2 h-4 w-4' />
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
          </Button>
        </popover.PopoverTrigger>
        <popover.PopoverContent className='w-auto p-0'>
          <Calendar
            mode='single'
            selected={date}
            onSelect={onDateSelect}
            initialFocus
          />
        </popover.PopoverContent>
      </popover.Popover>
    </div>
  );
}
