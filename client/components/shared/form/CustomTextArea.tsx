'use client';

import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { forwardRef, TextareaHTMLAttributes } from 'react';

type TProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  containerClass?: string;
};

export const CustomTextarea = forwardRef<HTMLTextAreaElement, TProps>(
  ({ label, name, containerClass, ...props }, ref) => {
    return (
      <div className={cn('flex flex-col gap-2', containerClass)}>
        <Label className='font-semibold' htmlFor={name}>
          {label}
        </Label>
        <Textarea name={name} ref={ref} {...props} />
      </div>
    );
  },
);

CustomTextarea.displayName = 'Textarea';
