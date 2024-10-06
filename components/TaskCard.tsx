'use client';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Task } from '@/types/Task';
import Link from 'next/link';
import { CheckCircle, Circle } from 'lucide-react';

export default function TaskCard({ task }: { task: Task }) {
  const completedSubtasks = task.subtasks.filter(subtask => subtask.completed).length;
  const totalSubtasks = task.subtasks.length;

  return (
    <Link href={`/task/${task.id}`}>
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle>{task.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{task.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <p className="text-xs text-muted-foreground">
            {new Date(task.createdAt).toLocaleDateString()}
          </p>
          <div className="flex items-center">
            {completedSubtasks === totalSubtasks ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <Circle className="h-5 w-5 text-gray-300" />
            )}
            <span className="ml-2 text-sm">
              {completedSubtasks}/{totalSubtasks}
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}