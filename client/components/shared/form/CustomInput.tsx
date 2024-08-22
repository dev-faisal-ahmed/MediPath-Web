import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Control } from 'react-hook-form';

type TProps = {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  type?: 'text' | 'number';
  defaultValue?: string;
  required?: boolean;
  className?: string;
  inputClassName?: string;
};

export const CustomInput = ({
  label,
  name,
  placeholder,
  type,
  defaultValue,
  required,
  className,
  inputClassName,
  control,
}: TProps) => {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <Label className='text-base font-semibold' htmlFor={name}>
        {label}
      </Label>
      <Input
        className={inputClassName}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...control.register(name)}
        required={required}
      />
    </div>
  );
};
