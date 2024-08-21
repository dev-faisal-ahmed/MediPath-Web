
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { links } from '@/app/_data';
import { isActive } from '@/app/_helpers';

export const MobileBar = () => {
  const pathName = usePathname();

  return (
    <div className='flex justify-between border-t px-6 py-3 md:hidden'>
      {links.map(({ icon, title, url }) => (
        <Link
          href={url}
          key={url}
          className={cn(
            'flex flex-col items-center gap-1',
            isActive(url, pathName) && 'text-primary',
          )}
        >
          <span className='text-2xl'>{icon}</span>
          <span className='hidden text-[10px] min-[350px]:block'>{title}</span>
        </Link>
      ))}
    </div>
  );
};
