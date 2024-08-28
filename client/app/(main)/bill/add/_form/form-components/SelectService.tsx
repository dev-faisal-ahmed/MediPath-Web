'use client';

import * as drop from '@/components/ui/dropdown-menu';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { TService } from '@/app/_utils/types';
import { Label } from '@radix-ui/react-dropdown-menu';
import { FaCheck } from 'react-icons/fa6';
import { IoCloseOutline } from 'react-icons/io5';
import { Input } from '@/components/ui/input';
import { IoSearch } from 'react-icons/io5';

type TProps = {
  services: TService[];
  serviceList: TService[] | undefined;
  onServiceAdd: (service: TService) => void;
  onServiceRemove: (serviceId: string) => void;
  onServiceFilter: (key: string) => void;
};

const isSelected = (service: TService, services: TService[]) => {
  return services.includes(service);
};

export const SelectService = ({
  services,
  serviceList,
  onServiceAdd,
  onServiceRemove,
  onServiceFilter,
}: TProps) => {
  const containerRef = useRef<HTMLButtonElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) setWidth(containerRef.current.clientWidth);
  }, [containerRef]);

  // handler
  const onFiler = (event: ChangeEvent<HTMLInputElement>) => {
    const key = event.target.value;
    onServiceFilter(key);
  };

  const handleToggle = (service: TService) => {
    if (isSelected(service, services)) {
      onServiceRemove(service._id);
    } else {
      onServiceAdd(service);
    }
  };

  return (
    <div className='relative flex flex-col gap-2 md:col-span-2'>
      <Label className='font-semibold'>Services</Label>
      <div className='rounded-md border border-input p-2'>
        {services.length > 0 && (
          <div className='mb-3 flex flex-wrap gap-x-3 gap-y-2'>
            {services.map(({ _id, name }) => (
              <div
                className='relative rounded-md bg-primary px-3 py-1 text-xs text-white'
                key={_id}
              >
                {name}
                <div
                  className='absolute -right-2 -top-2 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full border bg-primary-200 text-white'
                  onClick={() => onServiceRemove(_id)}
                >
                  <IoCloseOutline size={20} />
                </div>
              </div>
            ))}
          </div>
        )}

        <drop.DropdownMenu>
          <drop.DropdownMenuTrigger
            ref={containerRef}
            className='w-full text-left outline-none'
          >
            Select Services
          </drop.DropdownMenuTrigger>
          <drop.DropdownMenuContent className='p-3' style={{ width }}>
            <div className='relative mb-3'>
              <IoSearch className='absolute left-2 top-1/2 -translate-y-1/2 text-lg text-primary' />
              <Input
                onChange={onFiler}
                className='pl-8'
                placeholder='Search Here'
              />
            </div>
            <div className='overflow-y-auto' style={{ maxHeight: 220 }}>
              {serviceList ? (
                <>
                  {serviceList.map((service) => (
                    <div
                      className='grid cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-x-3 rounded-md p-2 hover:bg-primary-100'
                      key={service._id}
                      onClick={() => handleToggle(service)}
                    >
                      <p>Service Name : </p>
                      <p className='font-semibold'>{service.name}</p>
                      <div className='row-span-3 flex items-center gap-3'>
                        <p>
                          Room :{' '}
                          <span className='font-semibold'>
                            {service.roomNo}
                          </span>
                        </p>
                        <div className='w-6'>
                          {isSelected(service, services) && <FaCheck />}
                        </div>
                      </div>
                      <p>Price</p>
                      <p className='font-semibold'>{service.price}</p>
                    </div>
                  ))}
                </>
              ) : (
                <p className='p-1 text-muted-foreground'>No Services Found</p>
              )}
            </div>
          </drop.DropdownMenuContent>
        </drop.DropdownMenu>
      </div>
    </div>
  );
};
