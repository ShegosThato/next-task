'use client';

import { useState } from 'react';
import { useTask } from '@/contexts/TaskContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDownIcon, ChevronUpIcon, TrashIcon } from 'lucide-react';
import { Task } from '@/types/Task';

export default function TaskItem({ task }: { task: Task }) {
  const { updateTask, deleteTask } = useTask();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const toggleSubtask = (subtaskIndex: number) => {
    const updatedSubtasks = task.subtasks.map((subtask, index) =>
      index === subtaskIndex ? { ...subtask, completed: !subtask.completed } : subtask
    );
    updateTask({ ...task, subtasks: updatedSubtasks });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{task.title}</CardTitle>
        <Button variant="ghost" size="sm" onClick={toggleExpanded}>
          {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </Button>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
          <ul className="space-y-2">
            {task.subtasks.map((subtask, index) => (
              <li key={index} className="flex items-center space-x-2">
                <Checkbox
                  id={`subtask-${task.id}-${index}`}
                  checked={subtask.completed}
                  onCheckedChange={() => toggleSubtask(index)}
                />
                <label
                  htmlFor={`subtask-${task.id}-${index}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {subtask.title}
                </label>
              </li>
            ))}
          </ul>
          <Button
            variant="destructive"
            size="sm"
            className="mt-4"
            onClick={() => deleteTask(task.id)}
          >
            <TrashIcon className="mr-2 h-4 w-4" /> Delete Task
          </Button>
        </CardContent>
      )}
    </Card>
  );
}