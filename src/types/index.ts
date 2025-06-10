
export interface Module {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  completed: boolean;
  totalChapters?: number;
  completedChapters?: number;
  dueDate: Date; // Added for timeline
  activityType: 'assignment' | 'quiz' | 'reading' | 'event'; // Added for timeline
  category?: string; // Added for timeline, e.g., "Digital Literacy"
}

export interface LogbookEntry {
  id: string;
  date: Date;
  activity: string;
  details?: string;
}

export interface SupportContact {
  name: string;
  role: string;
  email: string;
  phone: string;
  avatarUrl: string;
  avatarFallback: string;
}
