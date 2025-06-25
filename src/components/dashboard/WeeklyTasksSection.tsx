
import React from 'react';
import type { Module, Course } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import TimelineItem from './TimelineItem';
import { format } from 'date-fns';
import { CalendarClock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CourseSelector from './CourseSelector';

interface WeeklyTasksSectionProps {
  modules: Module[];
  courses: Course[];
  selectedCourseId: string;
  onCourseChange: (courseId: string) => void;
}

interface GroupedTasks {
  [dateString: string]: Module[];
}

const groupTasksByDate = (tasks: Module[]): GroupedTasks => {
  return tasks.reduce((acc, task) => {
    const dateStr = format(task.dueDate, 'EEEE, d MMMM yyyy'); // e.g., "Friday, 26 December 2025"
    if (!acc[dateStr]) {
      acc[dateStr] = [];
    }
    acc[dateStr].push(task);
    return acc;
  }, {} as GroupedTasks);
};

const renderTimelineForTasks = (tasks: Module[], title: string) => {
  if (tasks.length === 0) {
    return <p className="text-muted-foreground text-center py-8">No {title.toLowerCase()} tasks in the timeline yet.</p>;
  }

  const groupedTasks = groupTasksByDate(tasks);
  const sortedDateKeys = Object.keys(groupedTasks).sort((a, b) => {
    // Ensure tasks within each date group are also sorted by time if needed,
    // but for date group sorting, use the first task's due date.
    const dateA = groupedTasks[a][0].dueDate;
    const dateB = groupedTasks[b][0].dueDate;
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <ScrollArea className="h-[400px] pr-3"> {/* Adjust height as needed */}
      {sortedDateKeys.map(dateKey => (
        <div key={dateKey} className="mb-4">
          <h3 className="text-md font-semibold text-primary my-3 sticky top-0 bg-background/95 py-2 z-10 backdrop-blur-sm">
            {dateKey}
          </h3>
          {groupedTasks[dateKey]
            .sort((a,b) => a.dueDate.getTime() - b.dueDate.getTime()) // Sort tasks within the same day by time
            .map((module, index, arr) => (
            <TimelineItem key={module.id} module={module} isLastItem={index === arr.length - 1} />
          ))}
        </div>
      ))}
    </ScrollArea>
  );
};

const WeeklyTasksSection: React.FC<WeeklyTasksSectionProps> = ({ modules, courses, selectedCourseId, onCourseChange }) => {
  const currentDueTasks = modules
    .filter(m => m.unlocked && !m.completed)
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());

  const pastDueTasks = modules
    .filter(m => m.unlocked && m.completed) // Assuming past due means completed for now
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CalendarClock className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl font-semibold">Timeline</CardTitle>
          </div>
          <CourseSelector
            courses={courses}
            selectedCourseId={selectedCourseId}
            onCourseChange={onCourseChange}
          />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="currentDue" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="currentDue">Current Due</TabsTrigger>
            <TabsTrigger value="pastDue">Past Due</TabsTrigger>
          </TabsList>
          <TabsContent value="currentDue" className="mt-4">
            {renderTimelineForTasks(currentDueTasks, "Current Due")}
          </TabsContent>
          <TabsContent value="pastDue" className="mt-4">
            {renderTimelineForTasks(pastDueTasks, "Past Due")}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WeeklyTasksSection;
