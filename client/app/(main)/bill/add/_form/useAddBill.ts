'use client';

import { FormEvent, useState } from 'react';
import { TPatient } from '@/app/_utils/types';

const allPatients: TPatient[] = [
  {
    name: 'Mr. X',
    age: '23',
    ageTitle: 'year',
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

export const useAddBill = () => {
  // states
  const [patient, setPatient] = useState<TPatient>();
  const [patients, setPatients] = useState<TPatient[]>([]);

  const onPatientNameChange = (key: string) => {
    const matchedPatients = allPatients.reduce(
      (matched: TPatient[], patient) => {
        if (key && patient.name.toLowerCase().includes(key.toLowerCase()))
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
    };
    const name = form.name.value.trim();

    console.log({ name });
  };

  return {
    handlers: { onAddBill, onPatientNameChange, onPatientSelect },
    states: { patients, patient },
  };
};
