import React from 'react';
import { BriefcaseMedical } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import CourseSelector from './CourseSelector';
import type { Course } from '@/types';

interface DashboardHeaderProps {
  courses: Course[];
  selectedCourseId: string;
  onCourseChange: (courseId: string) => void;
}


const DashboardHeader: React.FC<DashboardHeaderProps> = ({ courses, selectedCourseId, onCourseChange }) => {
  return (
    <header className="bg-card shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between h-auto md:h-20 py-4 md:py-0 gap-4">
          <div className="flex items-center space-x-3">
            <BriefcaseMedical className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-headline font-semibold text-primary">
              Medical Course Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <CourseSelector 
              courses={courses} 
              selectedCourseId={selectedCourseId} 
              onCourseChange={onCourseChange} 
            />
            <Avatar className="h-10 w-10 hidden md:flex">
              <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" data-ai-hint="professional person" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
