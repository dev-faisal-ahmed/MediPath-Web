'use client';

import { useGetBillDetailsQuery } from '@/app/_redux/services';
import { Loader } from '@/components/shared/Loader';
import { useReactToPrint } from 'react-to-print';
import { Logo } from '@/components/shared/Logo';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { PatientInfo } from './PatientInfo';
import { ServicesInfo } from './ServicesInfo';
import { PaymentInfo } from './PaymentInfo';

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

  const {
    date,
    patientInfo,
    doctorRefId,
    agentRefId,
    services,
    price,
    discount,
    paid,
  } = billData?.data;

  return (
    <section className='rounded-md bg-white'>
      <div className='p-12' ref={printRef}>
        <Logo />
        {/* patient copy */}
        <p className='my-6 text-center text-lg font-bold'>Patient Copy</p>
        <PatientInfo
          billId={billId}
          date={date}
          patientInfo={patientInfo}
          doctorRefId={doctorRefId}
          agentRefId={agentRefId}
        />
        <ServicesInfo services={services} />
        <PaymentInfo paid={paid} price={price} discount={discount} />
        <div className='mt-8 h-[1px] w-full bg-neutral-300' />

        {/* lab copy */}
        <p className='my-6 text-center text-lg font-bold'>Lab Copy</p>
        <PatientInfo
          billId={billId}
          date={date}
          patientInfo={patientInfo}
          doctorRefId={doctorRefId}
          agentRefId={agentRefId}
        />
        <ServicesInfo services={services} />
      </div>

      <div className='p-6'>
        <Button onClick={onPrint} className='mt-6 w-full'>
          Print Invoice
        </Button>
      </div>
    </section>
  );
};
