'use client';

import { useOutsideClick } from '@/app/_hooks';
import { TService } from '@/app/_utils/types';
import { Label } from '@radix-ui/react-dropdown-menu';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

type TProps = {
  services: TService[];
  serviceList: TService[];
  onServiceAdd: (service: TService) => void;
  onServiceRemove: (serviceId: string) => void;
  onServiceFilter: (key: string) => void;
};

export const SelectService = ({
  services,
  serviceList,
  onServiceAdd,
  onServiceRemove,
  onServiceFilter,
}: TProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const innerRef = useOutsideClick(() => onServiceFilter(''));
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) setWidth(containerRef.current.clientWidth);
  }, [containerRef]);

  // handler
  const onFiler = (event: ChangeEvent<HTMLInputElement>) => {
    const key = event.target.value;
    console.log(key);
    onServiceFilter(key);
  };

  const onAddService = (service: TService) => {
    onServiceAdd(service);
    onServiceFilter('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className='relative flex flex-col gap-2 md:col-span-2'>
      <Label className='font-semibold'>Services</Label>
      <div className='rounded-md border border-input p-2'>
        <div>{}</div>
        <div ref={containerRef} className='relative'>
          <input
            ref={inputRef}
            className='w-full bg-transparent outline-none'
            placeholder='Write Service Name'
            onChange={onFiler}
          />

          {serviceList.length > 0 && (
            <div
              className='absolute top-8 z-20 overflow-y-auto rounded-md border bg-white p-2'
              ref={innerRef}
              style={{ maxHeight: 320, width }}
            >
              {serviceList.map((service) => (
                <div
                  className='flex cursor-pointer flex-col rounded-md p-2 hover:bg-primary hover:text-white'
                  key={service._id}
                  onClick={() => onAddService(service)}
                >
                  <h3>
                    Service Name :{' '}
                    <span className='font-semibold'>{service.name}</span>{' '}
                  </h3>
                  <p>
                    Price :{' '}
                    <span className='font-bold'>{service.price} /-</span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
