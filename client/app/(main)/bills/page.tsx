import { BillsTable } from './_components/BillsTable';
import { Search } from './_components/Search';

export const metadata = {
  title: 'Medipath | Bills',
};

export default function BillsPage() {
  return (
    <main>
      <div className='mt-1 flex items-center justify-between'>
        <h1 className='text-lg font-semibold'>All Bills</h1>
        <Search />
      </div>
      <BillsTable />
    </main>
  );
}
