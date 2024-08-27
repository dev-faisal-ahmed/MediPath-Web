'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type TProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  containerClass?: string;
};

export const CustomInput = forwardRef<HTMLInputElement, TProps>(
  ({ label, name, containerClass, ...props }, ref) => {
    return (
      <div className={cn('flex w-full flex-col gap-2', containerClass)}>
        <Label className='font-semibold' htmlFor={name}>
          {label}
        </Label>
        <Input ref={ref} name={name} {...props} />
      </div>
    );
  },
);

CustomInput.displayName = 'Input';
