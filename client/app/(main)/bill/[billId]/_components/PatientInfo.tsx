import { generateDate } from '@/app/_helpers';
import { TAgent, TDoctor, TPatient } from '@/app/_utils/types';

type TProps = {
  billId: string;
  date: Date;
  patientInfo: Omit<TPatient, '_id'>;
  doctorRefId?: Omit<TDoctor, '_id'>;
  agentRefId?: Omit<TAgent, '_id'>;
};

export const PatientInfo = ({
  billId,
  date,
  patientInfo,
  doctorRefId,
  agentRefId,
}: TProps) => {
  return (
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
      <span className='flex items-center justify-between gap-6'>
        <span>
          : <span className='font-semibold'>{patientInfo.name}</span>
        </span>
        {patientInfo.phone && (
          <span>
            Phone : <span className='font-semibold'>{patientInfo.phone}</span>{' '}
          </span>
        )}
      </span>
      {patientInfo.address && (
        <>
          <span>Address</span>
          <span> : {patientInfo.address}</span>
        </>
      )}

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
          <span>
            : {doctorRefId.name} {doctorRefId.designation}
          </span>
        </>
      )}
      {agentRefId && (
        <>
          <span>Ref Agent</span>
          <span>: {agentRefId.name} </span>
        </>
      )}
    </div>
  );
};
