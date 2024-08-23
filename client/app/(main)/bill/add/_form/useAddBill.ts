'use client';

import { FormEvent, useState } from 'react';
import { TDoctor, TPatient } from '@/app/_utils/types';

const allPatients: TPatient[] = [
  {
    name: 'Mr. X',
    age: '23',
    ageTitle: 'day',
    gender: 'Male',
    phone: '018********',
    address: 'Mirpur, Dhaka',
  },
  {
    name: 'Mr. Y',
    age: '27',
    ageTitle: 'year',
    gender: 'Male',
    phone: '018********',
    address: 'Mohammadpur, Dhaka',
  },
  {
    name: 'Mrs. Z',
    age: '16',
    ageTitle: 'year',
    gender: 'Female',
    phone: '019*****',
    address: 'Shapahar, Naogaon',
  },
];

const allDoctors: TDoctor[] = [
  { name: 'Dr. Rahim', phone: '012******' },
  { name: 'Dr. Karim', phone: '013******' },
  { name: 'Dr. Jahir', phone: '014******' },
  { name: 'Dr. Faruk', phone: '015******' },
  { name: 'Dr. Kalam', phone: '016******' },
  { name: 'Dr. Amir', phone: '017******' },
  { name: 'Dr. Amin', phone: '018******' },
];

const allAgents: TDoctor[] = [
  { name: 'Agent Rahim', phone: '012******' },
  { name: 'Rabiul Karim', phone: '013******' },
  { name: 'Jahir Raihan', phone: '014******' },
  { name: 'Babu Mia', phone: '015******' },
  { name: 'Abdul Barik', phone: '016******' },
  { name: 'Rahim Miya', phone: '017******' },
  { name: 'Rakibul Hasan', phone: '018******' },
];

export const useAddBill = () => {
  // states
  const [patients, setPatients] = useState<TPatient[]>([]);
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
    },
    states: { patients, patient },
    data: { allDoctors, allAgents },
  };
};
