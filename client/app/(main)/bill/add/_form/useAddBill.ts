'use client';

import {
  TGender,
  TService,
  TAgeTitle,
  TReferrer,
  TGenerateBillPayload,
} from '@/app/_utils/types';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { removeEmptyProperty } from '@/app/_helpers';
import { useGetServicesQuery } from '@/app/_redux/services';
import { useGetReferrersQuery } from '@/app/_redux/services';
import { useGenerateBillMutation } from '@/app/_redux/services';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

const getTotalCost = (services: TService[]) => {
  return services.reduce((total, service) => {
    total += service.price;
    return total;
  }, 0);
};

export const useAddBill = () => {
  // data from redux
  const { data: servicesData, isLoading: isServicesLoading } =
    useGetServicesQuery(null);
  const { data: referrersData, isLoading: isReferrersLoading } =
    useGetReferrersQuery(null);

  // redux mutation
  const [generateBill, { isLoading: isBillLoading }] =
    useGenerateBillMutation();

  // router
  const router = useRouter();

  // states
  const [services, setServices] = useState<TService[]>([]);
  const [servicesList, setServicesList] = useState<TService[] | undefined>(
    servicesData?.data,
  );
  const [discount, setDiscount] = useState<number>();
  const [referrer, setReferrer] = useState<TReferrer | undefined>();
  const [paid, setPaid] = useState<number>();
  const [commission, setCommission] = useState<number>();

  // side effect
  useEffect(() => {
    setServicesList(servicesData?.data || []);
  }, [servicesData?.data]);

  // handlers
  const onServiceAdd = (service: TService) => {
    setServices((prevServices) => [...prevServices, service]);
  };

  const onServiceFilter = (key: string) => {
    if (!key) return setServicesList(servicesData?.data);

    const matchedServices = servicesData?.data?.reduce(
      (matched: TService[], service) => {
        if (service.name.toLowerCase().includes(key.toLowerCase()))
          matched.push(service);
        return matched;
      },
      [],
    );

    setServicesList(matchedServices);
  };

  const onServiceRemove = (serviceId: string) => {
    setServices((prevServices) =>
      prevServices.filter((service) => service._id !== serviceId),
    );
  };

  const onDiscountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const discount = Number(event.target.value);
    if (isNaN(discount)) return;
    if (discount < 0) return setDiscount(-discount);

    setDiscount(discount);
  };

  const onReferrerSelection = (referrer: TReferrer | undefined) => {
    setReferrer(referrer);
  };

  const onPaidChange = (event: ChangeEvent<HTMLInputElement>) => {
    const paid = Number(event.target.value);
    if (isNaN(paid)) return;
    if (paid < 0) return setPaid(-paid);

    setPaid(paid);
  };

  const onCommissionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const commission = Number(event.target.value);
    if (isNaN(commission)) return;
    if (commission < 0) return setCommission(-commission);

    setCommission(commission);
  };

  const onAddBill = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLInputElement & {
      name: { value: string };
      age: { value: string };
      ageTitle: { value: string };
      phone: { value: string };
      address: { value: string };
      gender: { value: string };
    };

    const name = form.name.value.trim();
    const age = Number(form.age.value);
    const ageTitle = form.ageTitle.value || 'Year';
    const phone = form.phone.value;
    const address = form.address.value.trim();
    const gender = form.gender.value;

    const id = toast.loading('Generating the bill ...!');
    try {
      // validation
      if (!paid) throw Error('Take payment first');
      if (!gender) throw new Error('Select gender');
      if (services.length === 0) throw new Error('Please select any service');

      const price = getTotalCost(services);
      if (paid > price - (discount || 0))
        throw new Error('Can not pay more than you need to');

      let payload: Record<string, any> = {
        patientInfo: removeEmptyProperty({
          name: name.toUpperCase(),
          age,
          ageTitle: ageTitle as TAgeTitle,
          address,
          gender: gender as TGender,
          phone,
        }),
        referrer: referrer?._id,
        discount: discount,
        commission: referrer ? commission : undefined,
        paid,
        services: services.map(({ name, price, roomNo }) => ({
          name,
          price,
          roomNo,
        })),
      };

      payload = removeEmptyProperty(payload);

      const response = await generateBill(
        payload as TGenerateBillPayload,
      ).unwrap();

      toast.success(response.message, { id });
      router.push(`/bill/${response?.data?.billId}`);
    } catch (error: any) {
      if (error instanceof Error) toast.error(error.message, { id });
      else toast.error(error.data?.message || 'Something went wrong', { id });
    }
  };

  return {
    handlers: {
      onAddBill,
      onServiceFilter,
      onServiceAdd,
      onServiceRemove,
      onDiscountChange,
      onReferrerSelection,
      onPaidChange,
      onCommissionChange,
    },
    helpers: {
      getTotalCost,
    },
    states: {
      services,
      servicesList,
      discount,
      referrer,
      paid,
      commission,
    },
    loading: {
      isServicesLoading,
      isBillLoading,
      isReferrersLoading,
    },
    data: { referrersList: referrersData?.data || [] },
  };
};
