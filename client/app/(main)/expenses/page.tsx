import { AddExpense } from './_components/AddExpense';

export const metadata = {
  title: 'Medipath | Expenses',
};

export default function ExpensesPage() {
  return (
    <main>
      <div className='mt-1 flex items-center justify-between'>
        <h1 className='text-lg font-semibold'>All Bills</h1>
        <AddExpense />
        {/* <Search /> */}
      </div>
      {/* <BillsTable /> */}
    </main>
  );
}
