import { useAddDoctorMutation } from '@/app/_redux/services';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

type TAddDoctorFormType = HTMLFormElement & {
  name: { value: string };
  designation: { value: string };
};

export const useAddDoctor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [addDoctor, { isLoading }] = useAddDoctorMutation();

  const onAddDoctor = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as TAddDoctorFormType;
    const name = form.name.value.trim();
    const designation = form.designation.value;

    const id = toast.loading('Adding Doctor...🔃');
    try {
      const response = await addDoctor({ name, designation }).unwrap();
      console.log(response);
      toast.success(response.message, { id });
      setIsOpen(false);
    } catch (error: any) {
      console.log(error);
      if (error instanceof Error) toast.error(error.message, { id });
      else toast.error(error.data?.message || 'Something went wrong', { id });
    }
  };

  return { isOpen, onAddDoctor, setIsOpen, isLoading };
};
