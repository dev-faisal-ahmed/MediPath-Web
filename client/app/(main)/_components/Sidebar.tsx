'use client';

import Link from 'next/link';
import { links } from '@/app/_data';
import { isActive } from '@/app/_helpers';
import { TLoggedUser } from '@/app/_utils/types/common';
import { usePathname } from 'next/navigation';
import { ProfileIcon } from '@/components/shared/ProfileIcon';
import { Logo } from '@/components/shared/Logo';
import { cn } from '@/lib/utils';

type TProps = {
  user: TLoggedUser;
};

export const Sidebar = ({user}: TProps) => {
  const pathName = usePathname();
  
  return (
    <aside className='hidden min-h-screen min-w-[240px] flex-col border-r bg-card py-6 md:flex'>
      <Logo className='mx-4 pt-2' />
      <div className='mt-8 flex flex-col gap-3'>
        {links.map(({ url, title, icon }) => (
          <Link
            key={url}
            href={url}
            className={cn(
              'flex items-center gap-3 border-r-[3px] px-4 py-1 text-base duration-300 hover:bg-primary hover:text-white border-transparent',
              isActive(url, pathName) &&
                'border-primary font-semibold text-primary',
            )}
          >
            {icon}
            {title}
          </Link>
        ))}
      </div>

      <div className='mt-auto flex items-center gap-4 border-t-2 px-6 pt-6'>
        <ProfileIcon name={user.name} />
        <div>
          <h3 className='line-clamp-1 font-bold'>{user.name}</h3>
        </div>
      </div>
    </aside>
  );
};
