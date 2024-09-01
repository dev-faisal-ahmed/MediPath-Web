import { useAddAgentMutation } from '@/app/_redux/services';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

type TAddAgentFormType = HTMLFormElement & {
  name: { value: string };
};

export const useAddAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [addAgent, { isLoading }] = useAddAgentMutation();

  const onAddAgent = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as TAddAgentFormType;
    const name = form.name.value.trim();

    const id = toast.loading('Adding agent...🔃');
    try {
      const response = await addAgent({ name }).unwrap();
      toast.success(response.message, { id });
      setIsOpen(false);
    } catch (error: any) {
      if (error instanceof Error) toast.error(error.message, { id });
      else toast.error(error.data?.message || 'Something went wrong', { id });
    }
  };

  return { isOpen, onAddAgent, setIsOpen, isLoading };
};
