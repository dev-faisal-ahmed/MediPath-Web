'use client';

import { CustomTextarea } from '@/components/shared/form/CustomTextArea';
import { PatientNameInput } from './form-components/PatientNameInput';
import { PatientAgeInput } from './form-components/PatientAgeInput';
import { CustomInput } from '@/components/shared/form/CustomInput';
import { SelectService } from './form-components/SelectService';
import { SelectGender } from './form-components/SelectGender';
import { SelectDoctor } from './form-components/SelectDoctor';
import { SelectAgent } from './form-components/SelectAgent';
import { Loader } from '@/components/shared/Loader';
import { Button } from '@/components/ui/button';
import { useAddBill } from './useAddBill';

export const AddBillForm = () => {
  const { handlers, states, data, loading, helpers } = useAddBill();
  const { patient, patients, services, servicesList, discount } = states;
  const { allDoctors, allAgents } = data;
  const { getTotalCost } = helpers;

  const {
    onAddBill,
    onPatientNameChange,
    onPatientSelect,
    onServiceFilter,
    onServiceAdd,
    onServiceRemove,
    onDiscountChange,
  } = handlers;

  const {
    isDoctorLoading,
    isAgentLoading,
    isPatientLoading,
    isServicesLoading,
    isBillLoading,
  } = loading;

  if (
    isDoctorLoading ||
    isAgentLoading ||
    isPatientLoading ||
    isServicesLoading
  )
    return <Loader className='mt-12' />;

  const totalCost = getTotalCost(services);

  return (
    <div className='mx-auto max-w-[650px] rounded-md border bg-neutral-50 p-10 shadow'>
      <form className='' onSubmit={onAddBill}>
        <div className='mb-8 flex items-center justify-between gap-6'>
          <h3 className='text-xl font-semibold'>Add Bill</h3>
          <h3 className='text-lg font-semibold'>
            Total : ৳{' '}
            {totalCost - (discount ? (totalCost === 0 ? 0 : discount) : 0)}
          </h3>
        </div>

        <SelectService
          serviceList={servicesList}
          services={services}
          onServiceAdd={onServiceAdd}
          onServiceRemove={onServiceRemove}
          onServiceFilter={onServiceFilter}
        />

        <div className='mt-6 flex flex-col gap-6 md:flex-row'>
          <PatientNameInput
            patients={patients}
            patient={patient}
            onPatientNameChange={onPatientNameChange}
            onPatientSelect={onPatientSelect}
          />
          <PatientAgeInput age={patient?.age} ageTitle={patient?.ageTitle} />
        </div>

        <div className='mt-6 flex flex-col gap-6 md:flex-row'>
          <CustomInput
            containerClass='w-full'
            label='Phone'
            name='phone'
            type='number'
            defaultValue={patient?.phone}
            placeholder="Input Patient's Phone Number"
          />
          <SelectGender defaultValue={patient?.gender} />
        </div>

        <CustomTextarea
          containerClass='mt-6'
          placeholder='Add Address'
          defaultValue={patient?.address}
          label='Address'
          name='address'
          rows={4}
        />

        <div className='my-6 flex flex-col gap-6'>
          <SelectDoctor doctors={allDoctors} />
          <SelectAgent agents={allAgents} />
        </div>

        <div className='my-6 flex flex-col gap-6 md:flex-row'>
          <CustomInput
            name='discount'
            label='Discount'
            placeholder='Enter Amount'
            type='number'
            min={0}
            onChange={onDiscountChange}
          />
          <CustomInput
            name='paid'
            label='Payment'
            placeholder='Enter Amount'
            type='number'
            min={0}
            required
          />
        </div>

        <Button disabled={isBillLoading} className='mt-10 block w-full'>
          Generate Bill
        </Button>
      </form>
    </div>
  );
};
