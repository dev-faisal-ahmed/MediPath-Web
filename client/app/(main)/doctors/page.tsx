import { AddDoctor } from './_form/AddDoctor';
import { Doctors } from './_components/Doctors';

export const metadata = {
  title: 'MediPath | Doctors',
};

export default function DoctorsPage() {
  return (
    <main>
      <AddDoctor />
      <Doctors />
    </main>
  );
}
