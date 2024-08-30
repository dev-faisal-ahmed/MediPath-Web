import { Summary } from './_components/Summary';
import { RecentBills } from './_components/RecentBills';

export const metadata = { title: 'Medipath | Dashboard' };

export default function DashboardPage() {
  return (
    <main>
      <Summary />
      <RecentBills />
    </main>
  );
}
