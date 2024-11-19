'use client';

import * as table from '@/components/ui/table';
import { TTransaction } from '@/app/_utils/types';
import { format } from 'date-fns';

type TProps = {
  transactions: TTransaction[];
};

export const TransactionTable = ({ transactions }: TProps) => {
  return (
    transactions.length > 0 && (
      <div className='flex-grow'>
        <h3 className='mb-2 mt-6 text-xl font-semibold'>Transactions</h3>
        <section className='w-full overflow-x-auto rounded-md border bg-white p-6 shadow'>
          <table.Table>
            <table.TableHeader>
              <table.TableRow>
                <table.TableHead className='font-semibold'>SL</table.TableHead>
                <table.TableHead className='text-center font-semibold'>
                  Amount
                </table.TableHead>
                <table.TableHead className='text-right font-semibold'>
                  Date
                </table.TableHead>
              </table.TableRow>
            </table.TableHeader>
            <table.TableBody>
              {transactions.map(({ _id, amount, date }, index) => (
                <table.TableRow key={_id}>
                  <table.TableCell>{index + 1}</table.TableCell>
                  <table.TableCell className='text-center'>
                    {amount}
                  </table.TableCell>
                  <table.TableCell className='text-right'>
                    {format(date, 'PPP')}
                  </table.TableCell>
                </table.TableRow>
              ))}
            </table.TableBody>
          </table.Table>
        </section>
      </div>
    )
  );
};
