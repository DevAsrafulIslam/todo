export type TaskStatus = 'not_started' | 'in_progress' | 'completed';
export type TaskLocation = 'home' | 'office' | 'other';

export interface Task {
  id: string;
  description: string;
  completed: boolean;
  category: string;
  imageUrl?: string;
  status: TaskStatus;
  location: TaskLocation;
  shared?: boolean;
  sharedWith?: string[];
}
