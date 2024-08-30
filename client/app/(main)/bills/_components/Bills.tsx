'use client';

import * as table from '@/components/ui/table';
import { Loader } from '@/components/shared/Loader';
import { useAppSelector } from '@/app/_redux/hooks';
import { useGetBillsQuery } from '@/app/_redux/services';
import { TakeDueForm } from '../_form/TakeDueForm';
import { generateDate } from '@/app/_helpers';

export const Bills = () => {
  const { billId } = useAppSelector((state) => state.search);
  const {
    data: billsData,
    isLoading,
    isFetching,
  } = useGetBillsQuery({ billId });

  console.log({ isLoading, isFetching });

  if (isLoading || isFetching) return <Loader className='mt-8' />;

  if (!billsData?.data?.length)
    return (
      <p className='mt-8 text-center text-base font-semibold'>
        No Doctor Found
      </p>
    );

  const bills = billsData.data;

  return (
    <section className='mt-6 w-full overflow-x-auto rounded-md border bg-white p-6 shadow'>
      <table.Table>
        <table.TableHeader>
          <table.TableRow>
            <table.TableHead className='font-semibold'>Bill Id</table.TableHead>
            <table.TableHead className='font-semibold'>
              Patient Name
            </table.TableHead>
            <table.TableHead className='font-semibold'>
              Services
            </table.TableHead>
            <table.TableHead className='text-center font-semibold'>
              Paid
            </table.TableHead>
            <table.TableHead className='text-center font-semibold'>
              Due
            </table.TableHead>
            <table.TableHead className='text-center font-semibold'>
              Date
            </table.TableHead>
            <table.TableHead className='text-center font-semibold'>
              Actions
            </table.TableHead>
          </table.TableRow>
        </table.TableHeader>
        <table.TableBody>
          {bills.map(
            ({
              billId,
              patientInfo,
              paid,
              price,
              discount,
              services,
              date,
            }) => (
              <table.TableRow key={billId}>
                <table.TableCell>{billId}</table.TableCell>
                <table.TableCell>{patientInfo.name}</table.TableCell>
                <table.TableCell>
                  {services.map(({ name }) => (
                    <li key={name}>{name}</li>
                  ))}
                </table.TableCell>
                <table.TableCell className='text-center'>
                  {paid}
                </table.TableCell>
                <table.TableCell className='text-center'>
                  {price - paid - (discount ? discount : 0) ? (
                    price - paid - (discount ? discount : 0)
                  ) : (
                    <span className='rounded-md bg-green-50 p-1 text-green-600'>
                      Paid
                    </span>
                  )}
                </table.TableCell>
                <table.TableCell className='text-center'>
                  {generateDate(date)}
                </table.TableCell>
                <table.TableCell>
                  <TakeDueForm
                    due={price - paid - (discount ? discount : 0)}
                    billId={billId}
                  />
                </table.TableCell>
              </table.TableRow>
            ),
          )}
        </table.TableBody>
      </table.Table>
    </section>
  );
};
