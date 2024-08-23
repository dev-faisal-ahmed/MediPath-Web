'use client';

import { FormEvent, useState } from 'react';
import { TAgent, TDoctor, TPatient, TService } from '@/app/_utils/types';

const allPatients: TPatient[] = [
  {
    _id: 'P-1',
    name: 'Mr. X',
    age: '23',
    ageTitle: 'day',
    gender: 'Male',
    phone: '018********',
    address: 'Mirpur, Dhaka',
  },
  {
    _id: 'P-2',
    name: 'Mr. Y',
    age: '27',
    ageTitle: 'year',
    gender: 'Male',
    phone: '018********',
    address: 'Mohammadpur, Dhaka',
  },
  {
    _id: 'P-3',
    name: 'Mrs. Z',
    age: '16',
    ageTitle: 'year',
    gender: 'Female',
    phone: '019*****',
    address: 'Shapahar, Naogaon',
  },
];

const allDoctors: TDoctor[] = [
  { _id: 'D-1', name: 'Dr. Karim', phone: '013******' },
  { _id: 'D-2', name: 'Dr. Jahir', phone: '014******' },
  { _id: 'D-3', name: 'Dr. Faruk', phone: '015******' },
  { _id: 'D-4', name: 'Dr. Rahim', phone: '012******' },
  { _id: 'D-5', name: 'Dr. Kalam', phone: '016******' },
  { _id: 'D6', name: 'Dr. Amir', phone: '017******' },
  { _id: 'D7', name: 'Dr. Amin', phone: '018******' },
];

const allAgents: TAgent[] = [
  { _id: 'A-1', name: 'Agent Rahim', phone: '012******' },
  { _id: 'A-2', name: 'Rabiul Karim', phone: '013******' },
  { _id: 'A-3', name: 'Jahir Raihan', phone: '014******' },
  { _id: 'A-4', name: 'Babu Mia', phone: '015******' },
  { _id: 'A-5', name: 'Abdul Barik', phone: '016******' },
  { _id: 'A-6', name: 'Rahim Miya', phone: '017******' },
  { _id: 'A-7', name: 'Rakibul Hasan', phone: '018******' },
];

const allServices: TService[] = [
  { _id: 'S-1', name: 'CBC', price: 500 },
  { _id: 'S-2', name: 'Blood Test', price: 300 },
  { _id: 'S-3', name: 'Urine Test', price: 200 },
  { _id: 'S-4', name: 'BT/CT', price: 250 },
  { _id: 'S-5', name: 'Glucose Level', price: 80 },
  { _id: 'S-6', name: 'STD', price: 150 },
  { _id: 'S-7', name: 'PT_HD', price: 230 },
];

export const useAddBill = () => {
  // states
  const [patients, setPatients] = useState<TPatient[]>([]);
  const [services, setServices] = useState<TService[]>([]);
  const [servicesList, setServicesList] = useState<TService[]>(allServices);
  const [patient, setPatient] = useState<TPatient>();

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
    if (!key) return setServicesList(allServices);

    const matchedServices = allServices.reduce(
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

  return {
    handlers: {
      onAddBill,
      onPatientNameChange,
      onPatientSelect,
      onServiceFilter,
      onServiceAdd,
      onServiceRemove,
    },
    states: { patients, patient, services, servicesList },
    data: { allDoctors, allAgents },
  };
};
