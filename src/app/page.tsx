
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import LogbookSection from '@/components/dashboard/LogbookSection';
import ProgressTrackerSection from '@/components/dashboard/ProgressTrackerSection';
import SupportSection from '@/components/dashboard/SupportSection';
import WeeklyTasksSection from '@/components/dashboard/WeeklyTasksSection';
import type { LogbookEntry, Module, SupportContact } from '@/types';

// Mock Data
const now = new Date();
const tomorrow = new Date(now);
tomorrow.setDate(now.getDate() + 1);
const dayAfterTomorrow = new Date(now);
dayAfterTomorrow.setDate(now.getDate() + 2);
const yesterday = new Date(now);
yesterday.setDate(now.getDate() - 1);
const twoDaysAgo = new Date(now);
twoDaysAgo.setDate(now.getDate() - 2);


const mockModules: Module[] = [
  // Upcoming tasks
  { id: 'assign-1', title: 'Assignment 1: Case Study Analysis', description: 'Analyze the provided case study on patient communication.', unlocked: true, completed: false, dueDate: new Date(new Date().setDate(new Date().getDate() + 2)), activityType: 'assignment', category: 'Clinical Communication', totalChapters: 1, completedChapters: 0 },
  { id: 'quiz-1', title: 'Quiz: Pharmacology Basics', description: 'Test your knowledge on fundamental drug interactions.', unlocked: true, completed: false, dueDate: new Date(new Date().setDate(new Date().getDate() + 3)), activityType: 'quiz', category: 'Pharmacology' },
  { id: 'reading-1', title: 'Reading: Latest Research on Diabetes', description: 'Review the new guidelines published by ADA.', unlocked: true, completed: false, dueDate: new Date(new Date().setDate(new Date().getDate() + 1)), activityType: 'reading', category: 'Endocrinology' },
  { id: 'event-1', title: 'Webinar: AI in Medicine', description: 'Join the live webinar on emerging AI technologies.', unlocked: true, completed: false, dueDate: new Date(new Date(new Date().setDate(new Date().getDate() + 4)).setHours(14,0,0)), activityType: 'event', category: 'Medical Technology' },
  { id: 'assign-4', title: 'Assignment 4: Patient Privacy', description: 'Write a short essay on patient privacy laws.', unlocked: true, completed: false, dueDate: new Date(new Date().setDate(new Date().getDate() + 6)), activityType: 'assignment', category: 'Medical Law', totalChapters: 1, completedChapters: 0 },
  { id: 'quiz-4', title: 'Quiz: Diagnostic Tools', description: 'Identify common diagnostic tools and their uses.', unlocked: true, completed: false, dueDate: new Date(new Date().setDate(new Date().getDate() + 8)), activityType: 'quiz', category: 'Diagnostics' },
  
  // Completed tasks (for "Past Due" in timeline if shown, and "Completed Modules" section)
  { id: '1', title: 'Module 1: Introduction to Anatomy', description: 'Core concepts of human anatomy.', unlocked: true, completed: true, totalChapters: 5, completedChapters: 5, dueDate: new Date(new Date().setDate(new Date().getDate() - 7)), activityType: 'reading', category: 'Anatomy' },
  { id: '2', title: 'Module 2: Physiology & Bodily Functions', description: 'Understanding the cardiovascular system.', unlocked: true, completed: true, totalChapters: 8, completedChapters: 8, dueDate: new Date(new Date().setDate(new Date().getDate() - 5)), activityType: 'reading', category: 'Physiology' },
  { id: '3', title: 'Module 3: Pharmacology Fundamentals', description: 'Introduction to drug classifications.', unlocked: true, completed: true, totalChapters: 6, completedChapters: 6, dueDate: new Date(new Date().setDate(new Date().getDate() - 10)), activityType: 'reading', category: 'Pharmacology' },
  { id: 'assign-2', title: 'Assignment: Ethical Dilemmas', description: 'Submit your paper on common ethical issues.', unlocked: true, completed: true, dueDate: new Date(new Date().setDate(new Date().getDate() - 5)), activityType: 'assignment', category: 'Medical Ethics' },
  { id: 'quiz-2', title: 'Quiz: Basic Life Support', description: 'Completed BLS certification quiz.', unlocked: true, completed: true, dueDate: new Date(new Date().setDate(new Date().getDate() - 10)), activityType: 'quiz', category: 'Emergency Medicine' },
  { id: '4', title: 'Module 4: Clinical Skills Workshop', description: 'Practical application of diagnostic procedures.', unlocked: true, completed: true, totalChapters: 10, completedChapters: 10, dueDate: new Date(new Date().setDate(new Date().getDate() - 12)), activityType: 'event', category: 'Clinical Skills' },
  { id: '5', title: 'Module 5: Medical Ethics & Law', description: 'Understanding legal responsibilities.', unlocked: true, completed: true, totalChapters: 4, completedChapters: 4, dueDate: new Date(new Date().setDate(new Date().getDate() - 14)), activityType: 'reading', category: 'Medical Ethics' },
  { id: '6', title: 'Module 6: Advanced Diagnostics', description: 'Exploring advanced imaging techniques.', unlocked: true, completed: true, totalChapters: 7, completedChapters: 7, dueDate: new Date(new Date().setDate(new Date().getDate() - 15)), activityType: 'reading', category: 'Diagnostics' },
  { id: '7', title: 'Module 7: Pediatrics Overview', description: 'Fundamental concepts in pediatric care.', unlocked: true, completed: true, totalChapters: 5, completedChapters: 5, dueDate: new Date(new Date().setDate(new Date().getDate() - 3)), activityType: 'reading', category: 'Pediatrics' },
  { id: 'assign-3', title: 'Assignment: Research Proposal', description: 'Develop a research proposal on a chosen topic.', unlocked: true, completed: true, dueDate: new Date(new Date().setDate(new Date().getDate() - 7)), activityType: 'assignment', category: 'Research Methods' },
  { id: 'quiz-3', title: 'Quiz: Infection Control', description: 'Assessment on hospital infection control protocols.', unlocked: true, completed: true, dueDate: new Date(new Date().setDate(new Date().getDate() - 9)), activityType: 'quiz', category: 'Public Health' },
];


const mockLogbookEntries: LogbookEntry[] = [
  { id: '1', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), activity: 'Completed Chapter 2.3', details: 'Physiology of the Nervous System' },
  { id: '2', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), activity: 'Attended Webinar', details: 'Advanced Cardiac Life Support (ACLS) Updates' },
  { id: '3', date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), activity: 'Module 1 Assessment', details: 'Achieved 92% score.' },
  { id: '4', date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), activity: 'Submitted Case Study', details: 'Case Study on Myocardial Infarction' },
  { id: '5', date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), activity: 'Joined Study Group', details: 'Pharmacology Review Session' },
];

const mockSupportContact: SupportContact = {
  name: 'Dr. Evelyn Reed',
  role: 'Lead Course Advisor',
  email: 'e.reed@medicalcourse.edu',
  phone: '+1-555-010-2030',
  avatarUrl: 'https://placehold.co/128x128.png',
  avatarFallback: 'ER'
};


export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <DashboardHeader />
      <main className="flex-1 container mx-auto p-4 md:p-6 lg:p-8 space-y-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column (takes 2/3 on large screens) */}
          <div className="lg:col-span-2 space-y-6">
            <WeeklyTasksSection modules={mockModules} />
            <ProgressTrackerSection modules={mockModules} />
          </div>
          {/* Right Column (takes 1/3 on large screens) */}
          <div className="lg:col-span-1 space-y-6">
            <LogbookSection entries={mockLogbookEntries} />
            <SupportSection contact={mockSupportContact} />
          </div>
        </div>
      </main>
      <footer className="py-4 text-center text-sm text-muted-foreground border-t">
        © {new Date().getFullYear()} Medical Professional Course Dashboard. All rights reserved.
      </footer>
    </div>
  );
}
