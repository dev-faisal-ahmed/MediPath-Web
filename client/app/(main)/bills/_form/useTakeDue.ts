import { useTakeDueMutation } from '@/app/_redux/services';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import { toast } from 'sonner';

type TTakeDueForm = HTMLFormElement & {
  price: { value: string };
};

export const useTakeDue = (billId: string) => {
  const router = useRouter();
  const [takeDue, { isLoading }] = useTakeDueMutation();

  const onTakeDue = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as TTakeDueForm;
    const price = form.price.value;

    const id = toast.loading('Taking due...🔃');

    try {
      const response = await takeDue({ billId, price: Number(price) }).unwrap();
      if (!response?.ok) throw new Error(response?.message);
      toast.success(response.message, { id });
      router.push(`/bill/${billId}`);
    } catch (error: any) {
      if (error instanceof Error) toast.error(error.message, { id });
      else toast.error(error.data?.message || 'Something went wrong', { id });
    }
  };

  return { onTakeDue, isLoading };
};
