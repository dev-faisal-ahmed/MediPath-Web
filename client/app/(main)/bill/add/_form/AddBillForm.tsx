'use client';

import { Button } from '@/components/ui/button';
import { PatientNameInput } from './form-components/PatientNameInput';
import { PatientAgeInput } from './form-components/PatientAgeInput';
import { CustomInput } from '@/components/shared/form/CustomInput';
import { CustomTextarea } from '@/components/shared/form/CustomTextArea';
import { SelectDoctor } from './form-components/SelectDoctor';
import { SelectAgent } from './form-components/SelectAgent';
import { useAddBill } from './useAddBill';
import { SelectService } from './form-components/SelectService';

export const AddBillForm = () => {
  const { handlers, states, data } = useAddBill();
  const {
    onAddBill,
    onPatientNameChange,
    onPatientSelect,
    onServiceFilter,
    onServiceAdd,
    onServiceRemove,
  } = handlers;
  const { patient, patients, services, servicesList } = states;
  const { allDoctors, allAgents } = data;

  return (
    <div className='mx-auto max-w-[650px]'>
      <form className='' onSubmit={onAddBill}>
        <h3 className='mb-8 text-xl font-semibold'>Add Bill</h3>
        <div className='grid gap-6 md:grid-cols-2'>
          <PatientNameInput
            patients={patients}
            patient={patient}
            onPatientNameChange={onPatientNameChange}
            onPatientSelect={onPatientSelect}
          />
          <PatientAgeInput age={patient?.age} ageTitle={patient?.ageTitle} />
          <CustomInput
            containerClass='md:col-span-2'
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
        <div className='mt-6 grid gap-6 md:grid-cols-2'>
          <SelectService
            serviceList={servicesList}
            services={services}
            onServiceAdd={onServiceAdd}
            onServiceRemove={onServiceRemove}
            onServiceFilter={onServiceFilter}
          />
        </div>
        <div className='mt-6 grid gap-6 md:grid-cols-2'>
          <SelectDoctor doctors={allDoctors} />
          <SelectAgent agents={allAgents} />
        </div>

        <Button className='mt-6 block w-full'>Generate Bill</Button>
      </form>
    </div>
  );
};
