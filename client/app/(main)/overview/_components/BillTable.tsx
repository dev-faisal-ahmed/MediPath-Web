import * as table from '@/components/ui/table';

import { TDailyOverViewBill } from '@/app/_utils/types';
import { generateDate } from '@/app/_helpers';

type TProps = {
  label: string;
  bills: TDailyOverViewBill[];
};

export const BillTable = ({ label, bills }: TProps) => {
  return (
    <>
      <h1 className='mt-6 text-lg font-semibold'>
        {label} ({bills?.length})
      </h1>
      <section className='mt-3 w-full overflow-x-auto rounded-md border bg-white p-6 shadow'>
        <table.Table>
          <table.TableHeader>
            <table.TableRow>
              <table.TableHead className='font-semibold'>SL</table.TableHead>
              <table.TableHead className='font-semibold'>
                Bill Id
              </table.TableHead>
              <table.TableHead className='font-semibold'>
                Patient Info
              </table.TableHead>
              <table.TableHead className='font-semibold'>Ref</table.TableHead>
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
            </table.TableRow>
          </table.TableHeader>
          <table.TableBody>
            {bills.map(
              (
                {
                  billId,
                  patientInfo,
                  paid,
                  price,
                  discount,
                  services,
                  date,
                  visitedBy,
                  referrer,
                },
                index,
              ) => (
                <table.TableRow key={billId}>
                  <table.TableCell>{index + 1}</table.TableCell>
                  <table.TableCell>{billId}</table.TableCell>
                  <table.TableCell>
                    <div>
                      <p className='font-semibold'>{patientInfo.name}</p>
                      <p className='text-xs font-semibold text-muted-foreground'>
                        Age : {patientInfo.age}
                      </p>
                    </div>
                  </table.TableCell>
                  <table.TableCell>
                    {visitedBy && (
                      <div>
                        <p>
                          Visited By :{' '}
                          <span className='font-semibold'>
                            {visitedBy?.name}
                          </span>
                        </p>
                        <p className='text-xs font-semibold text-muted-foreground'>
                          {visitedBy?.designation}
                        </p>
                      </div>
                    )}
                    {referrer && (
                      <div>
                        <p>
                          Ref By :{' '}
                          <span className='font-semibold'>{referrer.name}</span>
                        </p>
                        <p className='text-xs font-semibold text-muted-foreground'>
                          {referrer.designation}
                        </p>
                      </div>
                    )}

                    {!referrer && !visitedBy && (
                      <p className='font-semibold'>N/A</p>
                    )}
                  </table.TableCell>
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
                </table.TableRow>
              ),
            )}
          </table.TableBody>
        </table.Table>
      </section>
    </>
  );
};
