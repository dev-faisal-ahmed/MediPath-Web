import { AddDoctor } from './_form/AddDoctor';
import { Doctors } from './_components/Doctors';

export const metadata = {
  title: 'MediPath | Doctors',
};

export default function DoctorsPage() {
  return (
    <main>
      <div className='flex items-center justify-between'>
        <h1 className='text-lg font-semibold'>All Doctors</h1>
        <AddDoctor />
      </div>
      <Doctors />
    </main>
  );
}
