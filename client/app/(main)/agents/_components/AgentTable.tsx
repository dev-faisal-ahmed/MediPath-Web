'use client';

import * as table from '@/components/ui/table';
import { Loader } from '@/components/shared/Loader';
import { useGetAgentQuery } from '@/app/_redux/services';
import { UpdateAgentForm } from '../_form/UpdateAgentForm';

export const AgentTable = () => {
  const { data: agentData, isLoading, isFetching } = useGetAgentQuery(null);

  if (isFetching || isLoading) return <Loader className='mt-8' />;

  if (!agentData?.data?.length)
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
            <table.TableHead className='font-semibold'>Name</table.TableHead>
            <table.TableHead className='text-center font-semibold'>
              Actions
            </table.TableHead>
          </table.TableRow>
        </table.TableHeader>
        <table.TableBody>
          {agentData.data.map(({ _id, name }, index) => (
            <table.TableRow key={_id}>
              <table.TableCell>{index + 1}</table.TableCell>
              <table.TableCell>{name}</table.TableCell>
              <table.TableCell>
                <div className='flex items-center justify-center gap-3'>
                  <UpdateAgentForm agentId={_id} name={name} />
                  {/* <UpdateDoctorForm
                    doctorId={_id}
                    name={name}
                    designation={designation}
                  />
                  <DeleteDoctor doctorId={_id} /> */}
                </div>
              </table.TableCell>
            </table.TableRow>
          ))}
        </table.TableBody>
      </table.Table>
    </section>
  );
};
