import { PropsWithChildren } from 'react';
import { getUserAction } from '../_actions';
import { Sidebar } from './_components/Sidebar';

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const user = await getUserAction();
  return (
    <main className='grid md:grid-cols-[auto_1fr]'>
      <Sidebar user={user!} />
      <section className='grid h-screen grid-rows-[auto_1fr]'>
        {/* <TopBar user={user} /> */}
        <main className='customized_scrollbar h-full overflow-y-auto px-5 pb-6'>
          {children}
        </main>
        {/* <MobileBar /> */}
      </section>
    </main>
  );
}
