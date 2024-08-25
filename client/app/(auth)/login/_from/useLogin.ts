import { loginAction } from '@/app/_actions';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

type TForm = HTMLFormElement & {
  userId: { value: string };
  password: { value: string };
};

export const useLogin = () => {
  // states
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // handlers
  const onLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as TForm;

    const userId = form.userId.value;
    const password = form.password.value;

    // logging
    const id = toast.loading('Logging in...!');
    try {
      setIsLoading(true);
      const response = await loginAction({ userId, password });
      console.log(response);
      if (!response?.ok) throw new Error(response?.message);

      toast.success(response?.message, { id });
      router.push('/');
    } catch (error: any) {
      toast.error(error?.message, { id });
    } finally {
      setIsLoading(false);
    }
  };

  return { states: { isLoading }, handlers: { onLogin } };
};
