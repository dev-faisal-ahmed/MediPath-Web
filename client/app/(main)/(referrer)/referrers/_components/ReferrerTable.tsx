'use client';

import Link from 'next/link';
import * as table from '@/components/ui/table';

import { DeleteReferrer } from './DeleteReferrer';
import { Loader } from '@/components/shared/Loader';
import { useGetReferrersQuery } from '@/app/_redux/services';
import { UpdateReferrerForm } from '../_form/UpdateReferrerForm';
import { GiveCommission } from '../../_components/GiveCommission';
import { TooltipContainer } from '@/components/ui/tooltip';
import { FaExternalLinkAlt } from 'react-icons/fa';

export const ReferrerTable = () => {
  const { data: referrerData, isLoading } = useGetReferrersQuery(null);

  if (isLoading) return <Loader className='mt-8' />;

  if (!referrerData?.data?.length)
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
            <table.TableHead className='font-semibold'>SL</table.TableHead>
            <table.TableHead className='font-semibold'>
              Referrer Details
            </table.TableHead>
            <table.TableHead className='text-center font-semibold'>
              Commission
            </table.TableHead>
            <table.TableHead className='text-center font-semibold'>
              Paid
            </table.TableHead>
            <table.TableHead className='text-center font-semibold'>
              Due
            </table.TableHead>
            <table.TableHead className='text-center font-semibold'>
              Type
            </table.TableHead>
            <table.TableHead className='text-center font-semibold'>
              Actions
            </table.TableHead>
          </table.TableRow>
        </table.TableHeader>
        <table.TableBody>
          {referrerData.data.map(
            ({ _id, name, designation, type, commission, paid }, index) => (
              <table.TableRow key={_id}>
                <table.TableCell>{index + 1}</table.TableCell>
                <table.TableCell>
                  <div>
                    <p className='font-semibold'>{name}</p>
                    <p className='text-sm text-muted-foreground'>
                      {designation}
                    </p>
                  </div>
                </table.TableCell>
                <table.TableCell className='text-center'>
                  {commission}
                </table.TableCell>
                <table.TableCell className='text-center'>
                  {paid}
                </table.TableCell>
                <table.TableCell className='text-center'>
                  {commission - paid}
                </table.TableCell>
                <table.TableCell className='text-center'>
                  {type}
                </table.TableCell>
                <table.TableCell>
                  <div className='flex items-center justify-center gap-3'>
                    <UpdateReferrerForm
                      referrerId={_id}
                      name={name}
                      designation={designation}
                      type={type}
                    />
                    <DeleteReferrer referrerId={_id} />
                    <GiveCommission referrerId={_id} />
                    <TooltipContainer label='See Referrer Details'>
                      <Link href={`/referrer/${_id}`}>
                        <FaExternalLinkAlt
                          className='cursor-pointer text-blue-600'
                          size={16}
                        />
                      </Link>
                    </TooltipContainer>
                  </div>
                </table.TableCell>
              </table.TableRow>
            ),
          )}
        </table.TableBody>
      </table.Table>
    </section>
  );
};
