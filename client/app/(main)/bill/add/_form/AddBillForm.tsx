'use client';

import { useAddBill } from './useAddBill';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/shared/Loader';
import { SelectDoctor } from './form-components/SelectDoctor';
import { SelectGender } from './form-components/SelectGender';
import { SelectService } from './form-components/SelectService';
import { CustomInput } from '@/components/shared/form/CustomInput';
import { PatientAgeInput } from './form-components/PatientAgeInput';
import { SelectReferrer } from './form-components/SelectReferrer';

export const AddBillForm = () => {
  const { handlers, states, loading, helpers, data } = useAddBill();
  const { getTotalCost } = helpers;
  const { referrersList, doctorList } = data;

  const {
    services,
    servicesList,
    discount,
    referrer,
    paid,
    commission,
    doctor,
  } = states;

  const {
    onAddBill,
    onServiceFilter,
    onServiceAdd,
    onServiceRemove,
    onDiscountChange,
    onReferrerSelection,
    onPaidChange,
    onCommissionChange,
    onDoctorSelection,
  } = handlers;

  const { isServicesLoading, isBillLoading, isReferrersLoading } = loading;

  if (isReferrersLoading || isServicesLoading)
    return <Loader className='mt-12' />;

  const totalCost = getTotalCost(services);

  return (
    <div className='mx-auto max-w-[650px] rounded-md border bg-neutral-50 p-8 shadow'>
      <form onSubmit={onAddBill}>
        <div className='mb-4 flex items-center justify-between gap-6'>
          <h3 className='text-xl font-semibold'>Add Bill</h3>
          <h4 className='text-xl font-semibold'>Total : {totalCost} ৳</h4>
        </div>

        <SelectService
          serviceList={servicesList}
          services={services}
          onServiceAdd={onServiceAdd}
          onServiceRemove={onServiceRemove}
          onServiceFilter={onServiceFilter}
        />

        <div className='mt-3 flex flex-col gap-6 md:flex-row'>
          <CustomInput
            containerClass='w-full'
            label='Full Name'
            name='name'
            placeholder="Input Patient's Name"
          />
          <PatientAgeInput />
        </div>

        <div className='mt-3 flex flex-col gap-6 md:flex-row'>
          <CustomInput
            containerClass='w-full'
            label='Phone'
            name='phone'
            placeholder="Input Patient's Phone Number"
          />
          <SelectGender />
        </div>

        <CustomInput
          containerClass='mt-3'
          placeholder='Add Address'
          label='Address'
          name='address'
        />

        <SelectDoctor
          doctor={doctor}
          doctorList={doctorList}
          onDoctorSelection={onDoctorSelection}
        />

        <SelectReferrer
          referrer={referrer}
          referrerList={referrersList}
          onReferrerSelection={onReferrerSelection}
        />

        <CustomInput
          containerClass='mt-3'
          label='Commission'
          placeholder={referrer ? 'Enter Amount' : 'Select a referrer first'}
          type='number'
          min={0}
          value={commission}
          onChange={onCommissionChange}
          disabled={!referrer}
        />

        <div className='my-3 flex flex-col gap-6 md:flex-row'>
          <CustomInput
            name='discount'
            label='Discount'
            placeholder='Enter Amount'
            type='number'
            min={0}
            onChange={onDiscountChange}
          />
          <CustomInput
            label='Payment'
            placeholder='Enter Amount'
            type='number'
            min={0}
            value={paid}
            onChange={onPaidChange}
            required
          />
        </div>

        <div className='mt-3 grid grid-cols-[1fr_auto] rounded-md border border-input p-3'>
          <h1 className='col-span-2 mb-3 text-lg font-semibold'>Summary.</h1>
          <h1 className='text-lg font-bold'>Total. </h1>
          <p className='text-right text-lg font-bold'> {totalCost} ৳</p>
          <h3 className='font-semibold'>Discount.</h3>
          <p className='text-right font-semibold'> {discount || 0} ৳</p>
          <h3 className='font-semibold'>Paid.</h3>
          <p className='text-right font-semibold'> {paid || 0} ৳</p>
          <h3 className='font-semibold'>Due.</h3>
          <p className='text-right font-semibold'>
            {' '}
            {totalCost - (discount || 0) - (paid || 0)} ৳
          </p>
        </div>

        <Button disabled={isBillLoading} className='mt-6 block w-full'>
          Generate Bill
        </Button>
      </form>
    </div>
  );
};
