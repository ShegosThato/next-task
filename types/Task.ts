export interface Task {
  id: string;
  title: string;
  description: string;
  content: string;
  createdAt: string;
  subtasks: Subtask[];
}

export interface Subtask {
  title: string;
  completed: boolean;
}