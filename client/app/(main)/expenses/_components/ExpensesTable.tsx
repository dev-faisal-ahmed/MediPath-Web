'use client';

import * as table from '@/components/ui/table';

import { format } from 'date-fns';
import { Loader } from '@/components/shared/Loader';
import { useGetExpenseQuery } from '@/app/_redux/services';

export const ExpenseTable = () => {
  const { data: expenseData, isLoading } = useGetExpenseQuery(null);

  if (isLoading) return <Loader className='mt-8' />;

  if (!expenseData?.data?.length)
    return (
      <p className='mt-8 text-center text-base font-semibold'>
        No Expense Found
      </p>
    );

  const expenses = expenseData.data;
  console.log(expenses);

  return (
    <section className='mt-6 w-full overflow-x-auto rounded-md border bg-white p-6 shadow'>
      <table.Table>
        <table.TableHeader>
          <table.TableRow>
            <table.TableHead className='font-semibold'>Date</table.TableHead>
            <table.TableHead className='text-center font-semibold'>
              Amount
            </table.TableHead>
            <table.TableHead className='text-right font-semibold'>
              Description
            </table.TableHead>
          </table.TableRow>
        </table.TableHeader>
        <table.TableBody>
          {expenses.map(({ _id, amount, date, description }) => (
            <table.TableRow key={_id}>
              <table.TableCell>{format(date, 'PPP')}</table.TableCell>
              <table.TableCell className='text-center'>
                {amount}
              </table.TableCell>
              <table.TableCell className='text-right'>
                {description || 'N/A'}
              </table.TableCell>
            </table.TableRow>
          ))}
        </table.TableBody>
      </table.Table>
    </section>
  );
};
