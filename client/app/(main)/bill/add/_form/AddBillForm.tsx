'use client';

import { Button } from '@/components/ui/button';
import { useAddBill } from './useAddBill';
import { PatientNameInput } from './form-components/PatientNameInput';
import { PatientAgeInput } from './form-components/PatientAgeInput';
import { CustomInput } from '@/components/shared/form/CustomInput';
import { CustomTextarea } from '@/components/shared/form/CustomTextArea';
import { SelectDoctor } from './form-components/SelectDoctor';
import { SelectAgent } from './form-components/SelectAgent';

export const AddBillForm = () => {
  const { handlers, states, data } = useAddBill();
  const { onAddBill, onPatientNameChange, onPatientSelect } = handlers;
  const { patient, patients } = states;
  const { allDoctors, allAgents } = data;

  return (
    <form onSubmit={onAddBill}>
      <h3 className='mb-8 text-xl font-semibold'>Add Bill</h3>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        <PatientNameInput
          patients={patients}
          patient={patient}
          onPatientNameChange={onPatientNameChange}
          onPatientSelect={onPatientSelect}
        />
        <PatientAgeInput age={patient?.age} ageTitle={patient?.ageTitle} />
        <CustomInput
          containerClass='md:col-span-2 lg:col-span-1'
          label='Phone'
          name='phone'
          type='number'
          placeholder="Input Patient's Phone Number"
        />
        <CustomTextarea
          containerClass='md:col-span-2'
          placeholder='Add Address'
          label='Address'
          name='address'
          rows={4}
        />
      </div>
      <div className='mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        <SelectDoctor doctors={allDoctors} />
        <SelectAgent agents={allAgents} />
      </div>

      <Button className='ml-auto block'>Generate Bill</Button>
    </form>
  );
};
