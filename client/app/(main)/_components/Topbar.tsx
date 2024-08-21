import { TLoggedUser } from '@/app/_utils/types';
import { ProfileIcon } from '@/components/shared/ProfileIcon';

type TProps = {
  user: TLoggedUser;
};

export const TopBar = ({ user }: TProps) => {
  return (
    <nav className='sticky top-0 gap-6 flex items-center justify-between p-6'>
      <h4 className='w-fit rounded-full bg-white px-6 py-2 text-base sm:text-lg'>
        Greetings,{' '}
        <span className='font-semibold'>{user.name.split(" ")[0]}</span>
      </h4>
      <ProfileIcon
        name={user.name}
        imageUrl={user.imageUrl}
        extend
      />
    </nav>
  );
};