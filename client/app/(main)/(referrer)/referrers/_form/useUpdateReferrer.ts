import { FormEvent, useState } from 'react';
import { useUpdateReferrerMutation } from '@/app/_redux/services';
import { TReferrerType } from '@/app/_utils/types';
import { toast } from 'sonner';

type TUpdateReferrerForm = HTMLFormElement & {
  name: { value: string };
  designation: { value: string };
  type: { value: string };
};

export const useUpdateReferrer = (referrerId: string) => {
  const [updateReferrer, { isLoading }] = useUpdateReferrerMutation();
  const [isOpen, setIsOpen] = useState(false);

  const onUpdateReferrer = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as TUpdateReferrerForm;
    const name = form.name.value.trim();
    const designation = form.designation.value;
    const type = form.type.value as TReferrerType;

    const id = toast.loading('Adding referrer....🔃');

    try {
      const response = await updateReferrer({
        referrerId,
        payload: { name, designation, type },
      }).unwrap();
      toast.success(response?.message, { id });
      setIsOpen(false);
    } catch (error: any) {
      toast.error(error.data?.message || 'Something went wrong', { id });
    }
  };

  return { isOpen, setIsOpen, onUpdateReferrer, isLoading };
};
