import { useAddDoctorMutation } from '@/app/_redux/services';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

type TAddDoctorFormType = HTMLFormElement & {
  name: { value: string };
  phone: { value: string };
};

export const useAddDoctor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [addDoctor, { isLoading }] = useAddDoctorMutation();

  const onAddDoctor = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as TAddDoctorFormType;
    const name = form.name.value.trim();
    const phone = form.phone.value;

    const id = toast.loading('Adding Doctor...🔃');
    try {
      const response = await addDoctor({ name, phone }).unwrap();
      toast.success(response.message, { id });
      setIsOpen(false);
    } catch (error: any) {
      if (error instanceof Error) toast.error(error.message, { id });
      else toast.error(error.data?.message || 'Something went wrong', { id });
    }
  };

  return { isOpen, onAddDoctor, setIsOpen, isLoading };
};