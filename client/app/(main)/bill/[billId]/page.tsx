type TProps = {
  params: { billId: string };
};

export default async function BillDetailsPage({ params: { billId } }: TProps) {
  return <main>{billId}</main>;
}
