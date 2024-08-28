import { TService } from '@/app/_utils/types';

type TProps = {
  services: Omit<TService, '_id'>[];
};

export const ServicesInfo = ({ services }: TProps) => {
  return (
    <>
      <h3 className='mb-3 mt-8 text-base font-bold'>Services</h3>
      <table className='w-full'>
        <thead>
          <tr>
            <th className='text-left'>SL.</th>
            <th className='text-left'>Test Name</th>
            <th>Room No</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {services.map(({ name, price, roomNo }, index) => (
            <tr key={name}>
              <td className='p-1'>{index + 1}</td>
              <td className='p-1'>{name}</td>
              <td className='p-1 text-center'>{roomNo}</td>
              <td className='p-1 text-center'>{price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
