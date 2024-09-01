import { useUpdateDoctorMutation } from '@/app/_redux/services';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

type TUpdateDoctorFormType = HTMLFormElement & {
  name: { value: string };
  designation: { value: string };
};

export const useUpdateDoctor = (doctorId: string) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updateDoctor, { isLoading }] = useUpdateDoctorMutation();

  const onUpdateDoctor = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as TUpdateDoctorFormType;
    const name = form.name.value.trim();
    const designation = form.designation.value.trim();

    const id = toast.loading('Updating Doctor...🔃');
    try {
      const response = await updateDoctor({
        doctorId,
        data: { name, designation },
      }).unwrap();

      console.log(response);

      toast.success(response.message, { id });
      setIsOpen(false);
    } catch (error: any) {
      console.log(error);
      if (error instanceof Error) toast.error(error.message, { id });
      else toast.error(error.data?.message || 'Something went wrong', { id });
    }
  };

  return { isOpen, onUpdateDoctor, setIsOpen, isLoading };
};
