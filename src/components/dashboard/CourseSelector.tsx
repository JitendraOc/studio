'use client';

import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Course } from '@/types';

interface CourseSelectorProps {
  courses: Course[];
  selectedCourseId: string;
  onCourseChange: (courseId: string) => void;
}

const CourseSelector: React.FC<CourseSelectorProps> = ({ courses, selectedCourseId, onCourseChange }) => {
  return (
    <div className="w-full md:w-72">
      <Select value={selectedCourseId} onValueChange={onCourseChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a course..." />
        </SelectTrigger>
        <SelectContent>
          {courses.map(course => (
            <SelectItem key={course.id} value={course.id}>
              {course.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CourseSelector;
