'use client';

import { CustomInput } from '@/components/shared/form/CustomInput';
import { PasswordInput } from '@/components/shared/form/PasswordInput';
import { Button } from '@/components/ui/button';
import { useLogin } from './useLogin';

export const LoginForm = () => {
  const { states, handlers } = useLogin();
  const { onLogin } = handlers;
  const { isLoading } = states;

  return (
    <form
      className='w-full max-w-[420px] rounded-md border bg-white p-6 shadow-md'
      onSubmit={onLogin}
    >
      <h1 className='text-center text-xl font-semibold'>
        Welcome to <span className='text-primary-red'>Medi</span>
        <span className='text-primary'>Path</span> 👋
      </h1>
      <p className='mb-8 mt-1 text-center text-muted-foreground'>
        Please provide your credentials
      </p>

      <CustomInput
        label='UserId'
        name='userId'
        placeholder='Input UserId'
        required
      />
      <PasswordInput
        containerClass='mt-4'
        label='Password'
        name='password'
        placeholder='Input Password'
        required
      />

      <Button disabled={isLoading} className='mt-6 w-full'>
        Login
      </Button>
    </form>
  );
};
