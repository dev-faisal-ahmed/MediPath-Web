'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { forwardRef, InputHTMLAttributes } from 'react';

type TProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  containerClass?: string;
};

export const CustomInput = forwardRef<HTMLInputElement, TProps>(
  ({ label, name, placeholder, type, containerClass }, ...props) => {
    return (
      <div className={cn('flex flex-col gap-2', containerClass)}>
        <Label className='font-semibold' htmlFor={name}>
          {label}
        </Label>
        <Input name={name} placeholder={placeholder} type={type} {...props} />
      </div>
    );
  },
);

CustomInput.displayName = 'Input';
