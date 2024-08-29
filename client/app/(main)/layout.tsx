import { PropsWithChildren } from 'react';
import { getUserAction } from '../_actions';
import { Sidebar } from './_components/Sidebar';
import { TopBar } from './_components/Topbar';
import { MobileBar } from './_components/MobileBar';
import { authGuardAction } from '../_actions/authGuardAction';

export default async function DashboardLayout({ children }: PropsWithChildren) {
  await authGuardAction();
  const user = await getUserAction();

  return (
    <main className='grid md:grid-cols-[auto_1fr]'>
      <Sidebar user={user!} />
      <section className='grid h-screen grid-rows-[auto_1fr]'>
        <TopBar user={user!} />
        <main className='h-full overflow-y-auto px-5 pb-6'>{children}</main>
        <MobileBar />
      </section>
    </main>
  );
}
