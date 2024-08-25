import { LoginForm } from './_from/LoginForm';

export const metadata = { title: 'Medipath | Login' };

export default function LoginPage() {
  return (
    <main className='flex min-h-screen items-center justify-center'>
      <LoginForm />
    </main>
  );
}
