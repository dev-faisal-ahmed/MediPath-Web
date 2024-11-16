import { ReferrerDetails } from './_components/ReferrerDetails';

type TProps = {
  params: { referrerId: string };
};

export default function ReferrerDetailsPage({
  params: { referrerId },
}: TProps) {
  return (
    <main>
      <ReferrerDetails referrerId={referrerId} />
    </main>
  );
}
