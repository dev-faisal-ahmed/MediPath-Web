'use client';

import { useEffect, useRef, useState } from 'react';
import { useOutsideClick } from '@/app/_hooks';
import { TPatient } from '@/app/_utils/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

type TProps = {
  patients: TPatient[];
  patient: TPatient | undefined;
  onPatientNameChange: (key: string) => void;
  onPatientSelect: (patent: TPatient) => void;
};

export const PatientNameInput = ({
  patients,
  onPatientNameChange,
  onPatientSelect,
}: TProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const innerRef = useOutsideClick(() => onPatientNameChange(''));
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) setWidth(containerRef.current.clientWidth);
  }, [containerRef]);

  const onSelect = (patient: TPatient) => {
    onPatientSelect(patient);
    onPatientNameChange('');
    if (inputRef?.current) inputRef.current.value = patient.name;
  };

  return (
    <div ref={containerRef} className='relative flex flex-col gap-2'>
      <Label className='font-semibold'>Patient&apos;s Name</Label>
      <Input
        ref={inputRef}
        name='name'
        placeholder="Input patient' name"
        onChange={(e) => onPatientNameChange(e.target.value)}
        required
      />
      {patients.length > 0 && (
        <div
          ref={innerRef}
          style={{ width, maxHeight: 270 }}
          className='absolute top-16 z-20 mt-3 flex flex-col gap-1 overflow-y-auto rounded-md border bg-white py-3'
        >
          {patients.map((patient, index) => (
            <div
              onClick={() => onSelect(patient)}
              className='group cursor-pointer px-3 py-2 hover:bg-primary hover:text-white'
              key={index}
            >
              <h1>{patient.name}</h1>
              <div className='text-xs text-muted-foreground group-hover:text-primary-50'>
                <p>{patient.address}</p>
                <p>{patient.phone}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
