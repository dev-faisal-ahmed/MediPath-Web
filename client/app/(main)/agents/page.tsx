import { AddAgentForm } from './_form/AddAgentForm';

export const metadata = {
  title: 'MediPath | Doctors',
};

export default function AgentPage() {
  return (
    <main>
      <div className='flex items-center justify-between'>
        <h1 className='text-lg font-semibold'>All Agents</h1>
        <AddAgentForm />
      </div>
      {/* <DoctorsTable /> */}
    </main>
  );
}
