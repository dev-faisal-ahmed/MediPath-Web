import { toast } from 'sonner';
import { FormEvent, useState } from 'react';
import { TReferrerType } from '@/app/_utils/types';
import { useAddReferrerMutation } from '@/app/_redux/services';

type TAddReferrerForm = HTMLFormElement & {
  name: { value: string };
  designation: { value: string };
  type: { value: string };
};

export const useAddReferrer = () => {
  const [addReferrer, { isLoading }] = useAddReferrerMutation();
  const [isOpen, setIsOpen] = useState(false);

  const onAddReferrer = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as TAddReferrerForm;
    const name = form.name.value.trim();
    const designation = form.designation.value;
    const type = form.type.value as TReferrerType;

    const id = toast.loading('Adding referrer....🔃');

    try {
      const response = await addReferrer({ name, designation, type }).unwrap();
      toast.success(response?.message, { id });
      setIsOpen(false);
    } catch (error: any) {
      toast.error(error.data?.message || 'Something went wrong', { id });
    }
  };

  return { isOpen, setIsOpen, onAddReferrer, isLoading };
};
