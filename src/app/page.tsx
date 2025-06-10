import DashboardHeader from '@/components/dashboard/DashboardHeader';
import LogbookSection from '@/components/dashboard/LogbookSection';
import ProgressTrackerSection from '@/components/dashboard/ProgressTrackerSection';
import SupportSection from '@/components/dashboard/SupportSection';
import WeeklyTasksSection from '@/components/dashboard/WeeklyTasksSection';
import type { LogbookEntry, Module, SupportContact } from '@/types';

// Mock Data
const mockModules: Module[] = [
  { id: '1', title: 'Module 1: Introduction to Anatomy', description: 'Core concepts of human anatomy, skeletal system, and musculature.', unlocked: true, completed: true, totalChapters: 5, completedChapters: 5 },
  { id: '2', title: 'Module 2: Physiology & Bodily Functions', description: 'Understanding the cardiovascular, respiratory, and nervous systems.', unlocked: true, completed: false, totalChapters: 8, completedChapters: 3 },
  { id: '3', title: 'Module 3: Pharmacology Fundamentals', description: 'Introduction to drug classifications, pharmacokinetics, and pharmacodynamics.', unlocked: true, completed: false, totalChapters: 6, completedChapters: 0 },
  { id: '4', title: 'Module 4: Clinical Skills Workshop', description: 'Practical application of diagnostic procedures and patient interaction.', unlocked: false, completed: false, totalChapters: 10, completedChapters: 0 },
  { id: '5', title: 'Module 5: Medical Ethics & Law', description: 'Understanding legal responsibilities and ethical considerations in healthcare.', unlocked: false, completed: false, totalChapters: 4, completedChapters: 0 },
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
