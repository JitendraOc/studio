
'use client';

import { useState, useEffect } from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import LogbookSection from '@/components/dashboard/LogbookSection';
import ProgressTrackerSection from '@/components/dashboard/ProgressTrackerSection';
import SupportSection from '@/components/dashboard/SupportSection';
import WeeklyTasksSection from '@/components/dashboard/WeeklyTasksSection';
import type { Course, LogbookEntry, Module, SupportContact } from '@/types';

// Mock Data
const mockCourses: Course[] = [
  { id: 'course-1', title: 'Advanced Cardiac Life Support (ACLS)' },
  { id: 'course-2', title: 'Pediatric Advanced Life Support (PALS)' },
  { id: 'course-3', title: 'Basic Life Support (BLS)' },
];

const mockModules: Module[] = [
  // Course 1: ACLS
  { courseId: 'course-1', id: 'assign-1', title: 'Assignment 1: Case Study Analysis', description: 'Analyze the provided case study on patient communication.', unlocked: true, completed: false, dueDate: new Date(new Date().setDate(new Date().getDate() + 2)), activityType: 'assignment', category: 'Clinical Communication', totalChapters: 1, completedChapters: 0 },
  { courseId: 'course-1', id: 'quiz-1', title: 'Quiz: Pharmacology Basics', description: 'Test your knowledge on fundamental drug interactions.', unlocked: true, completed: false, dueDate: new Date(new Date().setDate(new Date().getDate() + 3)), activityType: 'quiz', category: 'Pharmacology' },
  { courseId: 'course-1', id: 'reading-1', title: 'Reading: Latest Research on Arrhythmia', description: 'Review the new guidelines.', unlocked: true, completed: false, dueDate: new Date(new Date().setDate(new Date().getDate() + 1)), activityType: 'reading', category: 'Cardiology' },
  { courseId: 'course-1', id: '1', title: 'Module 1: Intro to ACLS', description: 'Core concepts of ACLS.', unlocked: true, completed: true, totalChapters: 5, completedChapters: 5, dueDate: new Date(new Date().setDate(new Date().getDate() - 7)), activityType: 'reading', category: 'ACLS' },
  { courseId: 'course-1', id: '2', title: 'Module 2: ACLS Protocols', description: 'Understanding the intervention sequences.', unlocked: true, completed: true, totalChapters: 8, completedChapters: 8, dueDate: new Date(new Date().setDate(new Date().getDate() - 5)), activityType: 'reading', category: 'ACLS' },
  
  // Course 2: PALS
  { courseId: 'course-2', id: 'event-1', title: 'Webinar: Pediatric Respiratory Emergencies', description: 'Join the live webinar.', unlocked: true, completed: false, dueDate: new Date(new Date(new Date().setDate(new Date().getDate() + 4)).setHours(14,0,0)), activityType: 'event', category: 'Pediatrics' },
  { courseId: 'course-2', id: 'assign-4', title: 'Assignment: Pediatric Dosing', description: 'Calculate correct dosages for pediatric patients.', unlocked: true, completed: false, dueDate: new Date(new Date().setDate(new Date().getDate() + 6)), activityType: 'assignment', category: 'Pharmacology', totalChapters: 1, completedChapters: 0 },
  { courseId: 'course-2', id: '7', title: 'Module 1: Pediatrics Overview', description: 'Fundamental concepts in pediatric care.', unlocked: true, completed: true, totalChapters: 5, completedChapters: 5, dueDate: new Date(new Date().setDate(new Date().getDate() - 3)), activityType: 'reading', category: 'Pediatrics' },
  { courseId: 'course-2', id: 'assign-3', title: 'Assignment: Research Proposal', description: 'Develop a research proposal on a pediatric topic.', unlocked: true, completed: true, dueDate: new Date(new Date().setDate(new Date().getDate() - 7)), activityType: 'assignment', category: 'Research Methods' },
  
  // Course 3: BLS
  { courseId: 'course-3', id: 'quiz-4', title: 'Quiz: CPR Techniques', description: 'Identify correct hand placement and compression rates.', unlocked: true, completed: false, dueDate: new Date(new Date().setDate(new Date().getDate() + 8)), activityType: 'quiz', category: 'CPR' },
  { courseId: 'course-3', id: 'quiz-2', title: 'Quiz: Basic Life Support', description: 'Completed BLS certification quiz.', unlocked: true, completed: true, dueDate: new Date(new Date().setDate(new Date().getDate() - 10)), activityType: 'quiz', category: 'Emergency Medicine' },
  { courseId: 'course-3', id: '4', title: 'Module: AED Usage', description: 'Practical application of automated external defibrillators.', unlocked: true, completed: true, totalChapters: 10, completedChapters: 10, dueDate: new Date(new Date().setDate(new Date().getDate() - 12)), activityType: 'event', category: 'Clinical Skills' },
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
  const [selectedCourseId, setSelectedCourseId] = useState<string>(mockCourses[0].id);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCourseChange = (courseId: string) => {
    setSelectedCourseId(courseId);
  };

  const filteredModules = mockModules.filter(module => module.courseId === selectedCourseId);

  if (!isClient) {
    return null; // Or a loading spinner
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <DashboardHeader
        courses={mockCourses}
        selectedCourseId={selectedCourseId}
        onCourseChange={handleCourseChange}
      />
      <main className="flex-1 container mx-auto p-4 md:p-6 lg:p-8 space-y-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column (takes 2/3 on large screens) */}
          <div className="lg:col-span-2 space-y-6">
            <WeeklyTasksSection modules={filteredModules} />
            <ProgressTrackerSection modules={filteredModules} />
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
