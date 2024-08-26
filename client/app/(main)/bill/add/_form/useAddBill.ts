'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { TAgeTitle, TGender, TPatient, TService } from '@/app/_utils/types';
import { useGetAgentQuery } from '@/app/_redux/services';
import { useGetDoctorsQuery } from '@/app/_redux/services';
import { useGetPatientsQuery } from '@/app/_redux/services';
import { useGetServicesQuery } from '@/app/_redux/services';
import { useGenerateBillMutation } from '@/app/_redux/services';
import { removeEmptyProperty } from '@/app/_helpers';
import { TGenerateBillPayload } from '@/app/_redux/services';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export const useAddBill = () => {
  // data from redux
  const { data: agentData, isLoading: isAgentLoading } = useGetAgentQuery(null);
  const { data: patientData, isLoading: isPatientLoading } =
    useGetPatientsQuery(null);
  const { data: doctorData, isLoading: isDoctorLoading } =
    useGetDoctorsQuery(null);
  const { data: servicesData, isLoading: isServicesLoading } =
    useGetServicesQuery(null);

  // redux mutation
  const [generateBill, { isLoading: isBillLoading }] =
    useGenerateBillMutation();

  // router
  const router = useRouter();

  // states
  const [patients, setPatients] = useState<TPatient[] | undefined>();
  const [services, setServices] = useState<TService[]>([]);
  const [servicesList, setServicesList] = useState<TService[] | undefined>(
    servicesData?.data,
  );
  const [patient, setPatient] = useState<TPatient>();
  const [discount, setDiscount] = useState<number>();

  // side effect
  useEffect(() => {
    setServicesList(servicesData?.data);
  }, [servicesData?.data]);

  // handlers
  const onPatientNameChange = (key: string) => {
    if (!key) return setPatients([]);

    const matchedPatients = patientData?.data?.reduce(
      (matched: TPatient[], patient) => {
        if (patient.name.toLowerCase().includes(key.toLowerCase()))
          matched.push(patient);
        return matched;
      },
      [],
    );

    setPatients(matchedPatients);
  };

  const onPatientSelect = (patient: TPatient) => {
    setPatient(patient);
  };

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
    if (isNaN(discount)) {
      return;
    }

    if (discount < 0) {
      return setDiscount(-discount);
    }
    setDiscount(discount);
  };

  const onAddBill = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLInputElement & {
      name: { value: string };
      age: { value: string };
      ageTitle: { value: string };
      phone: { value: string };
      address: { value: string };
      doctor: { value: string };
      agent: { value: string };
      gender: { value: string };
      discount: { value: string };
    };

    const name = form.name.value.trim();
    const age = Number(form.age.value);
    const ageTitle = form.ageTitle.value || 'Year';
    const phone = form.phone.value;
    const address = form.address.value.trim();
    const doctor = form.doctor.value;
    const agent = form.agent.value;
    const gender = form.gender.value;
    const discount = Number(form.discount.value);

    const id = toast.loading('Generating the bill ...!');
    try {
      // validation
      if (!gender) throw new Error('Select gender');
      if (services.length === 0) throw new Error('Please select any service');

      let payload: Record<string, any> = {
        patientInfo: {
          name,
          age,
          ageTitle: ageTitle as TAgeTitle,
          address,
          gender: gender as TGender,
          phone,
        },
        doctorRefId: doctor,
        agentRefId: agent,
        discount: Number(discount),
        services: services.map(({ name, price }) => ({ name, price })),
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
      onPatientNameChange,
      onPatientSelect,
      onServiceFilter,
      onServiceAdd,
      onServiceRemove,
      onDiscountChange,
    },
    states: {
      patients,
      patient,
      services,
      servicesList,
      discount,
    },
    loading: {
      isDoctorLoading,
      isAgentLoading,
      isServicesLoading,
      isPatientLoading,
      isBillLoading,
    },
    data: { allDoctors: doctorData?.data, allAgents: agentData?.data },
  };
};
