'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTask } from '@/contexts/TaskContext';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import TaskCard from '@/components/TaskCard';
import TaskCardSkeleton from '@/components/TaskCardSkeleton';
import TaskForm from '@/components/TaskForm';
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';

export default function TaskList() {
  const { tasks } = useTask();
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleAddTask = useCallback(() => {
    setIsAddingTask(true);
  }, []);

  useKeyboardShortcut('n', handleAddTask);

  return (
    <div className="relative min-h-screen">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <TaskCardSkeleton key={index} />
            ))
          : tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
      </div>
      {isAddingTask && <TaskForm onClose={() => setIsAddingTask(false)} />}
      <Button
        onClick={handleAddTask}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg"
      >
        <PlusIcon className="h-6 w-6" />
      </Button>
    </div>
  );
}