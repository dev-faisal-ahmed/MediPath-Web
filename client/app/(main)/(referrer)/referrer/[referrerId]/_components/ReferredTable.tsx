'use client';

import * as table from '@/components/ui/table';
import { TBillsInReferrerDetailsPage } from '@/app/_utils/types';
import { format } from 'date-fns';

type TProps = {
  bills: TBillsInReferrerDetailsPage[];
  title: string;
};

export const ReferredTable = ({ bills, title }: TProps) => {
  return (
    bills.length > 0 && (
      <div className='flex-grow'>
        <h3 className='mb-2 mt-6 text-xl font-semibold'>{title}</h3>
        <section className='w-full overflow-x-auto rounded-md border bg-white p-6 shadow'>
          <table.Table>
            <table.TableHeader>
              <table.TableRow>
                <table.TableHead className='font-semibold'>SL</table.TableHead>
                <table.TableHead className='font-semibold'>
                  Patient Info
                </table.TableHead>
                <table.TableHead className='text-center font-semibold'>
                  Price
                </table.TableHead>
                <table.TableHead className='text-center font-semibold'>
                  Paid
                </table.TableHead>
                <table.TableHead className='text-center font-semibold'>
                  Discount
                </table.TableHead>
                <table.TableHead className='text-center font-semibold'>
                  Due
                </table.TableHead>
                <table.TableHead className='text-center font-semibold'>
                  Commission
                </table.TableHead>
                <table.TableHead className='text-right font-semibold'>
                  Date
                </table.TableHead>
              </table.TableRow>
            </table.TableHeader>
            <table.TableBody>
              {bills.map(
                (
                  { _id, patientInfo, price, paid, commission, discount, date },
                  index,
                ) => (
                  <table.TableRow key={_id}>
                    <table.TableCell>{index + 1}</table.TableCell>

                    <table.TableCell>
                      <div>
                        <p className='font-semibold'>{patientInfo.name}</p>
                        <p className='text-sm text-muted-foreground'>
                          Age :{' '}
                          <span className='font-semibold'>
                            {' '}
                            {patientInfo.age}
                          </span>
                        </p>
                      </div>
                    </table.TableCell>
                    <table.TableCell className='text-center'>
                      {price}
                    </table.TableCell>
                    <table.TableCell className='text-center'>
                      {paid}
                    </table.TableCell>
                    <table.TableCell className='text-center'>
                      {discount ? discount : 'N/A'}
                    </table.TableCell>
                    <table.TableCell className='text-center'>
                      {price - paid - (discount || 0)}
                    </table.TableCell>
                    <table.TableCell className='text-center'>
                      {commission ? commission : 'N/A'}
                    </table.TableCell>
                    <table.TableCell className='text-right'>
                      {format(date, 'PPP')}
                    </table.TableCell>
                    <table.TableCell>
                      <div className='flex items-center justify-center gap-3'>
                        {/* <UpdateReferrerForm
                      referrerId={_id}
                      name={name}
                      designation={designation}
                      type={type}
                    /> */}
                        {/* <DeleteReferrer referrerId={_id} /> */}
                        {/* <GiveCommission referrerId={_id} /> */}
                      </div>
                    </table.TableCell>
                  </table.TableRow>
                ),
              )}
            </table.TableBody>
          </table.Table>
        </section>
      </div>
    )
  );
};
