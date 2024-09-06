import { AddExpense } from './_components/AddExpense';
import { ExpenseTable } from './_components/ExpensesTable';

export const metadata = {
  title: 'Medipath | Expenses',
};

export default function ExpensesPage() {
  return (
    <main>
      <div className='mt-1 flex items-center justify-between'>
        <h1 className='text-lg font-semibold'>All Bills</h1>
        <AddExpense />
      </div>
      <ExpenseTable />
    </main>
  );
}
