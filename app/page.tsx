import dynamic from 'next/dynamic';
import { TaskProvider } from '@/contexts/TaskContext';

const TaskList = dynamic(() => import('@/components/TaskList'), { ssr: false });

export default function Home() {
  return (
    <TaskProvider>
      <main className="container mx-auto px-4 py-8">
        <TaskList />
      </main>
    </TaskProvider>
  );
}