'use client';

import { useEffect, useState } from 'react';
import { useTask } from '@/contexts/TaskContext';
import TaskDetail from '@/components/TaskDetail';
import { notFound } from 'next/navigation';

export default function TaskPage({ params }: { params: { id: string } }) {
  const { getTask } = useTask();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchedTask = getTask(params.id);
    if (fetchedTask) {
      setTask(fetchedTask);
    } else {
      notFound();
    }
  }, [params.id, getTask]);

  if (!task) {
    return <div>Loading...</div>;
  }

  return <TaskDetail task={task} />;
}