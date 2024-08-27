'use client';

import { useGetBillDetailsQuery } from '@/app/_redux/services';
import { Loader } from '@/components/shared/Loader';
import { useReactToPrint } from 'react-to-print';
import { Logo } from '@/components/shared/Logo';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { generateDate } from '@/app/_helpers';

type TProps = {
  billId: string;
};

export const BillDetails = ({ billId }: TProps) => {
  const { data: billData, isLoading } = useGetBillDetailsQuery(billId);
  const printRef = useRef<HTMLDivElement>(null);

  const onPrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `Invoice`,
  });

  if (isLoading) return <Loader className='mt-12' />;

  if (!billData?.data)
    return (
      <section className='mx-auto w-fit font-semibold'>
        No Invoice Found
      </section>
    );

  const { date, patientInfo, doctorRefId, agentRefId, services } =
    billData?.data;

  return (
    <section className='rounded-md bg-white'>
      <div className='p-12' ref={printRef}>
        <Logo />
        <div className='mt-8 grid grid-cols-[auto_1fr] gap-x-1 gap-y-2'>
          {/* bill Id */}
          <span>ID No</span>
          <span className='flex items-center justify-between gap-6'>
            <span>
              : <span className='font-semibold'>{billId}</span>
            </span>
            <span>
              Date : <span className='font-semibold'>{generateDate(date)}</span>
            </span>
          </span>
          {/* patient Info */}
          <span>Name</span>
          <span>
            : <span className='font-semibold'>{patientInfo.name}</span>
          </span>
          <span>Age</span>
          <span className='flex items-center justify-between gap-6'>
            <span>
              : {patientInfo.age} {patientInfo.ageTitle}
              {patientInfo.age > 1 && 's'}
            </span>
            <span>Gender: {patientInfo.gender} </span>
          </span>
          {/* references */}
          {doctorRefId && (
            <>
              <span>Ref Doc</span>
              <span>: {doctorRefId.name} </span>
            </>
          )}
          {agentRefId && (
            <>
              <span>Ref Doc</span>
              <span>: {agentRefId.name} </span>
            </>
          )}
        </div>

        {/* services */}
        <table className='mt-12 w-full'>
          <thead>
            <tr>
              <th className='text-left'>SL.</th>
              <th className='text-left'>Test Name</th>
              <th className='text-left'>Quantity</th>
              <th className=''>Price</th>
            </tr>
          </thead>
          <tbody>
            {services.map(({ name, price }, index) => (
              <tr key={name}>
                <td className='p-1'>{index + 1}</td>
                <td className='p-1'>{name}</td>
                <td className='p-1 pl-5'>1</td>
                <td className='p-1 text-center'>{price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='p-6'>
        <Button onClick={onPrint} className='mt-6 w-full'>
          Print Invoice
        </Button>
      </div>
    </section>
  );
};
