import { cn } from '@/lib/utils';
import Image from 'next/image';

type TProps = {
  className?: string;
  hideTitle?: boolean;
};

export const Logo = ({ className, hideTitle }: TProps) => {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Image src={'/images/medipath.jpg'} width={60} height={60} alt='Logo' />
      {!hideTitle && (
        <h3 className='text-2xl font-bold'>
          <span className='text-primary-red'>Medi</span>
          <span className='text-primary'>Path</span>
        </h3>
      )}
    </div>
  );
};
