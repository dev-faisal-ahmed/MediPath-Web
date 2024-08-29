import { useAddServiceMutation } from '@/app/_redux/services';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

type TAddServiceForm = HTMLFormElement & {
  name: { value: string };
  price: { value: string };
  roomNo: { value: string };
};

export const useAddService = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [addService, { isLoading }] = useAddServiceMutation();

  const onAddServices = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as TAddServiceForm;
    const name = form.name.value.trim();
    const price = form.price.value;
    const roomNo = form.roomNo.value;

    const id = toast.loading('Adding Service...🔃');
    try {
      const response = await addService({
        name,
        price: Number(price),
        roomNo,
      }).unwrap();

      toast.success(response.message, { id });
      setIsOpen(false);
    } catch (error: any) {
      if (error instanceof Error) toast.error(error.message, { id });
      else toast.error(error.data?.message || 'Something went wrong', { id });
    }
  };

  return { onAddServices, isLoading, isOpen, setIsOpen };
};
