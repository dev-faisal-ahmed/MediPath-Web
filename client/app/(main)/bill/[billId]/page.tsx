import { BillDetails } from './_components/BillDetails';

type TProps = {
  params: { billId: string };
};

export default async function BillDetailsPage({ params: { billId } }: TProps) {
  return (
    <main>
      <BillDetails billId={billId} />
    </main>
  );
}
