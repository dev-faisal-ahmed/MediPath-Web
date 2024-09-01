import { useUpdateAgentMutation } from '@/app/_redux/services';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

type TUpdateAgentFormType = HTMLFormElement & {
  name: { value: string };
};

export const useUpdateAgent = (agentId: string) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updateAgent, { isLoading }] = useUpdateAgentMutation();

  const onUpdateAgent = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as TUpdateAgentFormType;
    const name = form.name.value.trim();

    const id = toast.loading('Adding agent...🔃');
    try {
      const response = await updateAgent({ agentId, data: { name } }).unwrap();
      toast.success(response.message, { id });
      setIsOpen(false);
    } catch (error: any) {
      if (error instanceof Error) toast.error(error.message, { id });
      else toast.error(error.data?.message || 'Something went wrong', { id });
    }
  };

  return { isOpen, onUpdateAgent, setIsOpen, isLoading };
};
