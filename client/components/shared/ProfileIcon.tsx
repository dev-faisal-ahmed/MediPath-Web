'use client';

import * as drop from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';

type TProps = {
  size?: number;
  imageUrl?: string;
  name: string;
  extend?: boolean;
};

export const ProfileIcon = ({ name, size = 40, imageUrl, extend }: TProps) => {
  const onLogout = () => {
    //
  };

  return (
    <>
      {extend ? (
        <>
          <drop.DropdownMenu>
            <drop.DropdownMenuTrigger>
              <div
                className='flex items-center justify-center rounded-full bg-primary text-2xl font-bold text-white'
                style={{ height: size, width: size }}
              >
                {name?.[0]}
              </div>
            </drop.DropdownMenuTrigger>
            <drop.DropdownMenuContent
              side='bottom'
              align='end'
              className='bg-card'
              sideOffset={10}
            >
              <div className='p-2'>
                <h4 className='text-base'>{name}</h4>
                <drop.DropdownMenuItem className='cursor-pointer' asChild>
                  <Button
                    onClick={onLogout}
                    className='mt-4 w-full'
                    variant={'destructive'}
                  >
                    Logout
                  </Button>
                </drop.DropdownMenuItem>
              </div>
            </drop.DropdownMenuContent>
          </drop.DropdownMenu>
        </>
      ) : (
        <div
          className='flex items-center justify-center rounded-full bg-primary text-2xl font-bold text-white'
          style={{ height: size, width: size }}
        >
          {name?.[0]}
        </div>
      )}
    </>
  );
};
