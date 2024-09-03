'use client';

import { useRef } from 'react';
import { ServicesInfo } from './ServicesInfo';
import { PatientInfo } from './PatientInfo';
import { PaymentInfo } from './PaymentInfo';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/shared/Logo';
import { useReactToPrint } from 'react-to-print';
import { Loader } from '@/components/shared/Loader';
import { useGetBillDetailsQuery } from '@/app/_redux/services';

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

  const { date, patientInfo, services, price, discount, paid, referrer } =
    billData?.data;

  return (
    <section className='mx-auto max-w-[920px] rounded-md bg-white'>
      <div className='p-12' ref={printRef}>
        <div className='relative flex flex-col items-center justify-center gap-2'>
          <Logo className='absolute left-0 top-0' hideTitle />
          <h1 className='text-2xl font-bold'>
            Medi Path Clinic And Digital Diagnostic Centre
          </h1>
          <p>Hospital Road, Rajjodhor Primary School, Sapahar Naogaon</p>
          <p>
            Mobile :{' '}
            <span className='font-semibold'> 01725708075, 01728717696</span>{' '}
          </p>
        </div>

        <p className='my-6 rounded-e-md border border-neutral-300 p-1 text-center text-lg font-bold'>
          Invoice / Bill
        </p>
        <PatientInfo
          billId={billId}
          date={date}
          patientInfo={patientInfo}
          referrer={referrer}
        />
        <ServicesInfo services={services} />
        <PaymentInfo paid={paid} price={price} discount={discount} />
      </div>

      <div className='p-6'>
        <Button onClick={onPrint} className='mt-6 w-full'>
          Print Invoice
        </Button>
      </div>
    </section>
  );
};
