import { Metadata } from 'next';
import { AddBillForm } from './_form/AddBillForm';

export const metadata: Metadata = {
  title: 'Medipath | Add Bill',
};

export default function AddBillPage() {
  return <AddBillForm />;
}
