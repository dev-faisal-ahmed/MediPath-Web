'use client';

import * as table from '@/components/ui/table';
import { useGetServicesQuery } from '@/app/_redux/services';
import { Loader } from '@/components/shared/Loader';
import { UpdateServiceForm } from '../_form/UpdateServiceForm';
import { DeleteService } from './DeleteService';

export const ServiceTable = () => {
  const {
    data: servicesData,
    isFetching,
    isLoading,
  } = useGetServicesQuery(null);

  if (isFetching || isLoading) return <Loader className='mt-8' />;

  if (!servicesData?.data?.length)
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
            <table.TableHead className='text-center font-semibold'>
              Price
            </table.TableHead>
            <table.TableHead className='text-center font-semibold'>
              Room No
            </table.TableHead>
            <table.TableHead className='text-center font-semibold'>
              Actions
            </table.TableHead>
          </table.TableRow>
        </table.TableHeader>
        <table.TableBody>
          {servicesData.data.map(({ _id, name, price, roomNo }) => (
            <table.TableRow key={_id}>
              <table.TableCell>{name}</table.TableCell>
              <table.TableCell className='text-center'>{price}</table.TableCell>
              <table.TableCell className='text-center'>
                {roomNo}
              </table.TableCell>
              <table.TableCell>
                <div className='flex items-center justify-center gap-3'>
                  <UpdateServiceForm
                    billId={_id}
                    name={name}
                    price={price}
                    roomNo={roomNo}
                  />
                  <DeleteService serviceId={_id} />
                </div>
              </table.TableCell>
            </table.TableRow>
          ))}
        </table.TableBody>
      </table.Table>
    </section>
  );
};
