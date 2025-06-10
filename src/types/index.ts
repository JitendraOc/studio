export interface Module {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  completed: boolean;
  totalChapters?: number;
  completedChapters?: number;
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
