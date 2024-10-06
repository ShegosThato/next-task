'use client';

import { useState } from 'react';
import { useTask } from '@/contexts/TaskContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { XIcon } from 'lucide-react';

export default function TaskForm({ onClose }: { onClose: () => void }) {
  const { addTask } = useTask();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTask({
        title: title.trim(),
        description: description.trim(),
        content: '',
        subtasks: [
          { title: 'User story and requirements', completed: false },
          { title: 'Architecture and design', completed: false },
          { title: 'Visual design', completed: false },
          { title: 'Interaction design', completed: false },
        ],
      });
      onClose();
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Add New Task</CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <XIcon className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button type="submit">Add Task</Button>
        </form>
      </CardContent>
    </Card>
  );
}