'use client';

import { Button } from '@/components/ui/button';
import { useAddBill } from './useAddBill';
import { PatientNameInput } from './form-components/PatientNameInput';
import { Input } from '@/components/ui/input';
import { CustomInput } from '@/components/shared/form/CustomInput';

export const AddBillForm = () => {
  const { handlers, states } = useAddBill();
  const { onAddBill, onPatientNameChange, onPatientSelect } = handlers;
  const { patient, patients } = states;

  return (
    <form onSubmit={onAddBill}>
      <h3 className='mb-8 text-xl font-semibold'>Add Bill</h3>
      <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3'>
        <PatientNameInput
          patients={patients}
          patient={patient}
          onPatientNameChange={onPatientNameChange}
          onPatientSelect={onPatientSelect}
        />
        <CustomInput
          label='Age'
          name='age'
          placeholder='Input age'
          type='number'
        />
        <div className='mt-6 sm:col-span-2 md:col-span-3'>
          <Button className='ml-auto block'>Generate Bill</Button>
        </div>
      </div>
    </form>
  );
};
