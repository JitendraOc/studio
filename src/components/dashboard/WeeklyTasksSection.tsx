
import React from 'react';
import type { Module, Course } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import TimelineItem from './TimelineItem';
import { format } from 'date-fns';
import { CalendarClock } from 'lucide-react';
import CourseSelector from './CourseSelector';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


interface WeeklyTasksSectionProps {
  modules: Module[];
  courses: Course[];
  selectedCourseId: string;
  onCourseChange: (courseId: string) => void;
  weeks: Date[];
  selectedWeek: string;
  onWeekChange: (week: string) => void;
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

const renderTimelineForTasks = (tasks: Module[]) => {
  if (tasks.length === 0) {
    return <p className="text-muted-foreground text-center py-8">No tasks for the selected week.</p>;
  }

  const groupedTasks = groupTasksByDate(tasks);
  const sortedDateKeys = Object.keys(groupedTasks).sort((a, b) => {
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

const WeekSelector: React.FC<{
  weeks: Date[];
  selectedWeek: string;
  onWeekChange: (week: string) => void;
}> = ({ weeks, selectedWeek, onWeekChange }) => {
  return (
    <div className="w-full md:w-72">
      <Select value={selectedWeek} onValueChange={onWeekChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a week..." />
        </SelectTrigger>
        <SelectContent>
          {weeks.map(week => {
            const weekISO = week.toISOString();
            return (
              <SelectItem key={weekISO} value={weekISO}>
                {`Week of ${format(week, 'MMM dd, yyyy')}`}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </div>
  );
};


const WeeklyTasksSection: React.FC<WeeklyTasksSectionProps> = ({
  modules,
  courses,
  selectedCourseId,
  onCourseChange,
  weeks,
  selectedWeek,
  onWeekChange
}) => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 self-start">
            <CalendarClock className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl font-semibold">Timeline</CardTitle>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <CourseSelector
              courses={courses}
              selectedCourseId={selectedCourseId}
              onCourseChange={onCourseChange}
            />
            <WeekSelector
              weeks={weeks}
              selectedWeek={selectedWeek}
              onWeekChange={onWeekChange}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-4">
        {renderTimelineForTasks(modules)}
      </CardContent>
    </Card>
  );
};

export default WeeklyTasksSection;
