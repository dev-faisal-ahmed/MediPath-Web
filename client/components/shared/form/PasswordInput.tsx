'use client';

import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { IoMdEye } from 'react-icons/io';
import { IoIosEyeOff } from 'react-icons/io';

type TProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  containerClass?: string;
};

export const PasswordInput = forwardRef<HTMLInputElement, TProps>(
  ({ label, name, containerClass, ...props }, ref) => {
    const [isShown, setIsShown] = useState(false);

    const toggle = () => {
      setIsShown((prev) => !prev);
    };

    return (
      <div className={cn('flex flex-col gap-2', containerClass)}>
        <Label className='font-semibold' htmlFor={name}>
          {label}
        </Label>
        <div className='relative'>
          <Input
            ref={ref}
            name={name}
            type={isShown ? 'text' : 'password'}
            {...props}
          />
          <div
            className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer'
            onClick={toggle}
          >
            {isShown ? <IoIosEyeOff /> : <IoMdEye />}
          </div>
        </div>
      </div>
    );
  },
);

PasswordInput.displayName = 'Input';
