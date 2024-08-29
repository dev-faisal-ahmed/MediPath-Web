import { Services } from './_components/Services';
import { AddServiceForm } from './_form/AddServiceFrom';

export const metadata = {
  title: 'Medipath | Services',
};

export default function ServicesPage() {
  return (
    <main>
      <div className='flex items-center justify-between'>
        <h1 className='text-lg font-semibold'>All Services</h1>
        <AddServiceForm />
      </div>
      <Services />
    </main>
  );
}
