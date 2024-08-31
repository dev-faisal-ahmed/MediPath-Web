import { toast } from 'sonner';
import { FormEvent, useState } from 'react';
import { removeEmptyProperty } from '@/app/_helpers';
import { useUpdateServiceMutation } from '@/app/_redux/services';

type TUpdateForm = HTMLFormElement & {
  name: { value: string };
  price: { value: string };
  roomNo: { value: string };
};

export const useUpdateService = (serviceId: string) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updateService, { isLoading }] = useUpdateServiceMutation();

  const onUpdateService = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as TUpdateForm;
    const name = form.name.value.trim();
    const price = Number(form.price.value);
    const roomNo = form.roomNo.value;

    const id = toast.loading('Updating Service...🔃');
    try {
      const payload = removeEmptyProperty({ name, price, roomNo });
      const response = await updateService({
        serviceId,
        serviceInfo: payload,
      }).unwrap();

      if (!response?.ok) throw new Error(response?.message);
      toast.success(response.message, { id });
      setIsOpen(false);
    } catch (error: any) {
      if (error instanceof Error) toast.error(error.message, { id });
      else toast.error(error.data?.message || 'Something went wrong', { id });
    }
  };

  return { isOpen, setIsOpen, onUpdateService, isLoading };
};
