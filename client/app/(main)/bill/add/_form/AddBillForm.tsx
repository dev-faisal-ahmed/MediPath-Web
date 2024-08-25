'use client';

import { Button } from '@/components/ui/button';
import { CustomTextarea } from '@/components/shared/form/CustomTextArea';
import { PatientNameInput } from './form-components/PatientNameInput';
import { PatientAgeInput } from './form-components/PatientAgeInput';
import { CustomInput } from '@/components/shared/form/CustomInput';
import { SelectGender } from './form-components/SelectGender';
import { SelectDoctor } from './form-components/SelectDoctor';
import { SelectAgent } from './form-components/SelectAgent';
import { SelectService } from './form-components/SelectService';
import { TService } from '@/app/_utils/types';
import { useAddBill } from './useAddBill';

const getTotalCost = (services: TService[]) => {
  return services.reduce((total, service) => {
    total += service.price;
    return total;
  }, 0);
};

export const AddBillForm = () => {
  const { handlers, states, data } = useAddBill();
  const {
    onAddBill,
    onPatientNameChange,
    onPatientSelect,
    onServiceFilter,
    onServiceAdd,
    onServiceRemove,
    onDiscountChange,
  } = handlers;
  const { patient, patients, services, servicesList, discount } = states;
  const { allDoctors, allAgents } = data;

  return (
    <div className='mx-auto max-w-[650px]'>
      <form className='' onSubmit={onAddBill}>
        <div className='mb-8 flex items-center justify-between gap-6'>
          <h3 className='text-xl font-semibold'>Add Bill</h3>
          <h3 className='text-lg font-semibold'>
            Total : ৳ {getTotalCost(services) - (discount || 0)}
          </h3>
        </div>

        <SelectService
          serviceList={servicesList}
          services={services}
          onServiceAdd={onServiceAdd}
          onServiceRemove={onServiceRemove}
          onServiceFilter={onServiceFilter}
        />

        <div className='mt-6 flex gap-6'>
          <PatientNameInput
            patients={patients}
            patient={patient}
            onPatientNameChange={onPatientNameChange}
            onPatientSelect={onPatientSelect}
          />
          <PatientAgeInput age={patient?.age} ageTitle={patient?.ageTitle} />
        </div>

        <div className='mt-6 flex gap-6'>
          <CustomInput
            containerClass='w-full'
            label='Phone'
            name='phone'
            type='number'
            defaultValue={patient?.phone}
            placeholder="Input Patient's Phone Number"
          />
          <SelectGender />
        </div>

        <CustomTextarea
          containerClass='mt-6'
          placeholder='Add Address'
          label='Address'
          name='address'
          rows={4}
        />

        <div className='my-6 flex gap-6'>
          <SelectDoctor doctors={allDoctors} />
          <SelectAgent agents={allAgents} />
        </div>

        <CustomInput
          containerClass='md:col-span-2'
          label='Discount'
          placeholder='Enter Amount'
          type='number'
          onChange={(e) => onDiscountChange(e.target.value)}
        />

        <Button className='mt-6 block w-full'>Generate Bill</Button>
      </form>
    </div>
  );
};
