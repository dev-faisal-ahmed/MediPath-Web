'use client';

import * as table from '@/components/ui/table';
import { RiEdit2Fill } from 'react-icons/ri';
import { TbTrashFilled } from 'react-icons/tb';
import { Loader } from '@/components/shared/Loader';
import { useGetDoctorsQuery } from '@/app/_redux/services';

export const DoctorsTable = () => {
  const { data: doctorsData, isLoading, isFetching } = useGetDoctorsQuery(null);

  if (isFetching || isLoading) return <Loader className='mt-8' />;

  if (!doctorsData?.data?.length)
    return (
      <p className='mt-8 text-center text-base font-semibold'>
        No Doctor Found
      </p>
    );

  return (
    <section className='mt-6 w-full overflow-x-auto rounded-md border bg-white p-6 shadow'>
      <table.Table>
        <table.TableHeader>
          <table.TableRow>
            <table.TableHead className='font-semibold'>Name</table.TableHead>
            <table.TableHead className='font-semibold'>
              Designation
            </table.TableHead>
            <table.TableHead className='text-center font-semibold'>
              Actions
            </table.TableHead>
          </table.TableRow>
        </table.TableHeader>
        <table.TableBody>
          {doctorsData.data.map(({ _id, name, designation }) => (
            <table.TableRow key={_id}>
              <table.TableCell>{name}</table.TableCell>
              <table.TableCell>{designation}</table.TableCell>
              <table.TableCell>
                <div className='flex items-center justify-center gap-3'>
                  <RiEdit2Fill className='text-blue-600' size={20} />
                  <TbTrashFilled className='text-red-600' size={20} />
                </div>
              </table.TableCell>
            </table.TableRow>
          ))}
        </table.TableBody>
      </table.Table>
    </section>
  );
};
