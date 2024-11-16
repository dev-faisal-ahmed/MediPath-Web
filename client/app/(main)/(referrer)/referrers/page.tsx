import { ReferrerTable } from './_components/ReferrerTable';
import { AddReferrerForm } from './_form/AddReferrerForm';

export const metadata = {
  title: 'Medipath | Referrers',
};

export default function ReferrersPage() {
  return (
    <main>
      <div className='flex items-center justify-between'>
        <h1 className='text-lg font-semibold'>All Referrer</h1>
        <AddReferrerForm />
      </div>
      <ReferrerTable />
    </main>
  );
}
