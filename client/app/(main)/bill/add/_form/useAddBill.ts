'use client';

import { FormEvent, useEffect, useState } from 'react';
import { TPatient, TService } from '@/app/_utils/types';
import { useGetDoctorsQuery, useGetPatientsQuery } from '@/app/_redux/services';
import { useGetAgentQuery } from '@/app/_redux/services';
import { useGetServicesQuery } from '@/app/_redux/services';

export const useAddBill = () => {
  // data from redux
  const { data: agentData, isLoading: isAgentLoading } = useGetAgentQuery(null);
  const { data: patientData, isLoading: isPatientLoading } =
    useGetPatientsQuery(null);
  const { data: doctorData, isLoading: isDoctorLoading } =
    useGetDoctorsQuery(null);
  const { data: servicesData, isLoading: isServicesLoading } =
    useGetServicesQuery(null);

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

  const onAddBill = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLInputElement & {
      name: { value: string };
      age: { value: string };
      ageTitle: { value: string };
      phone: { value: string };
      address: { value: string };
      doctor: { value: string };
      agent: { value: string };
    };

    const name = form.name.value.trim();
    const age = form.age.value;
    const ageTitle = form.ageTitle.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const doctor = form.doctor.value;
    const agent = form.agent.value;

    console.log({ name, age, ageTitle, phone, address, doctor, agent });
  };

  const onDiscountChange = (discount: string) => {
    setDiscount(Number(discount));
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
    },
    data: { allDoctors: doctorData?.data, allAgents: agentData?.data },
  };
};
