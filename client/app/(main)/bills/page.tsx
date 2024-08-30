import { Bills } from './_components/Bills';

export const metadata = {
  title: 'Medipath | Bills',
};

export default function BillsPage() {
  return (
    <main>
      <div className='flex items-center justify-between'>
        <h1 className='text-lg font-semibold'>All Bills</h1>
      </div>
      <Bills />
    </main>
  );
}
