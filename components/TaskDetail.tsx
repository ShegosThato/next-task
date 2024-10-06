'use client';

import { useState, useEffect } from 'react';
import { useTask } from '@/contexts/TaskContext';
import { Task } from '@/types/Task';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Trash } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import { DeleteTaskDialog } from '@/components/DeleteTaskDialog';

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
});

export default function TaskDetail({ task }: { task: Task | null }) {
  const { updateTask, deleteTask } = useTask();
  const [content, setContent] = useState(task?.content || '');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (task) {
      setContent(task.content);
    }
  }, [task]);

  if (!task) {
    return <div>Loading...</div>;
  }

  const handleEditorChange = ({ text }: { text: string }) => {
    setContent(text);
    updateTask({ ...task, content: text });
  };

  const toggleSubtask = (subtaskIndex: number) => {
    const updatedSubtasks = task.subtasks.map((subtask, index) =>
      index === subtaskIndex ? { ...subtask, completed: !subtask.completed } : subtask
    );
    updateTask({ ...task, subtasks: updatedSubtasks });
  };

  const handleDeleteTask = () => {
    deleteTask(task.id);
    router.push('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/">
        <Button className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Task List
        </Button>
      </Link>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">{task.title}</h1>
        <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
          <Trash className="mr-2 h-4 w-4" /> Delete Task
        </Button>
      </div>
      <p className="text-muted-foreground mb-4">
        Created: {new Date(task.createdAt).toLocaleString()}
      </p>
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardContent className="p-4">
            <MdEditor
              value={content}
              onChange={handleEditorChange}
              renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-4">Subtasks</h2>
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
          </CardContent>
        </Card>
      </div>
      <DeleteTaskDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteTask}
      />
    </div>
  );
}