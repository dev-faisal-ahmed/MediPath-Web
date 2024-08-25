'use client';

import { FormEvent, useEffect, useState } from 'react';
import { TPatient, TService } from '@/app/_utils/types';
import { useGetDoctorsQuery } from '@/app/_redux/services';
import { useGetAgentQuery } from '@/app/_redux/services';
import { useGetServicesQuery } from '@/app/_redux/services';

const allPatients: TPatient[] = [
  {
    _id: 'P-1',
    name: 'Mr. X',
    age: '23',
    ageTitle: 'Day',
    gender: 'Male',
    phone: '0181212',
    address: 'Mirpur, Dhaka',
  },
  {
    _id: 'P-2',
    name: 'Mr. Y',
    age: '27',
    ageTitle: 'Year',
    gender: 'Male',
    phone: '0182332',
    address: 'Mohammadpur, Dhaka',
  },
  {
    _id: 'P-3',
    name: 'Mrs. Z',
    age: '16',
    ageTitle: 'Year',
    gender: 'Female',
    phone: '01932234',
    address: 'Shapahar, Naogaon',
  },
];

export const useAddBill = () => {
  // data from redux
  const { data: agentData, isLoading: isAgentLoading } = useGetAgentQuery(null);
  const { data: doctorData, isLoading: isDoctorLoading } =
    useGetDoctorsQuery(null);
  const { data: servicesData, isLoading: isServicesLoading } =
    useGetServicesQuery(null);

  // states
  const [patients, setPatients] = useState<TPatient[]>([]);
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

    const matchedPatients = allPatients.reduce(
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
    loading: { isDoctorLoading, isAgentLoading, isServicesLoading },
    data: { allDoctors: doctorData?.data, allAgents: agentData?.data },
  };
};
