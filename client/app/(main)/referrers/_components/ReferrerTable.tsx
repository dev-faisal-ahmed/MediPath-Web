'use client';

import * as table from '@/components/ui/table';
import { Loader } from '@/components/shared/Loader';
import { useGetReferrersQuery } from '@/app/_redux/services';

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
              Type
            </table.TableHead>
            <table.TableHead className='text-center font-semibold'>
              Actions
            </table.TableHead>
          </table.TableRow>
        </table.TableHeader>
        <table.TableBody>
          {referrerData.data.map(({ _id, name, designation, type }, index) => (
            <table.TableRow key={_id}>
              <table.TableCell>{index + 1}</table.TableCell>
              <table.TableCell>
                <div>
                  <p className='font-semibold'>{name}</p>
                  <p className='text-sm text-muted-foreground'>{designation}</p>
                </div>
              </table.TableCell>
              <table.TableCell className='text-center'>{type}</table.TableCell>
              <table.TableCell>
                <div className='flex items-center justify-center gap-3'>
                  {/* <UpdateAgentForm agentId={_id} name={name} />
                  <DeleteAgent agentId={_id} /> */}
                </div>
              </table.TableCell>
            </table.TableRow>
          ))}
        </table.TableBody>
      </table.Table>
    </section>
  );
};
