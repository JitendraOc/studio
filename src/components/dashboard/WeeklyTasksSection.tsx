
import React from 'react';
import type { Module } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import TimelineItem from './TimelineItem';
import { format } from 'date-fns';
import { Filter, CalendarClock } from 'lucide-react';

interface WeeklyTasksSectionProps {
  modules: Module[];
}

interface GroupedTasks {
  [dateString: string]: Module[];
}

const WeeklyTasksSection: React.FC<WeeklyTasksSectionProps> = ({ modules }) => {
  // For now, Timeline shows all unlocked modules, sorted by due date.
  // Filtering by "current" or "past" status can be added to filter controls later.
  const relevantModules = modules
    .filter(m => m.unlocked)
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());

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

  const groupedTasks = groupTasksByDate(relevantModules);
  const sortedDateKeys = Object.keys(groupedTasks).sort((a, b) => {
    // Ensure consistent date parsing for sorting keys
    const dateA = groupedTasks[a][0].dueDate;
    const dateB = groupedTasks[b][0].dueDate;
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <CalendarClock className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl font-semibold">Timeline</CardTitle>
            </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 pt-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="assignment">Assignments</SelectItem>
              <SelectItem value="quiz">Quizzes</SelectItem>
              <SelectItem value="reading">Readings</SelectItem>
              <SelectItem value="event">Events</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="dueDate">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dueDate">Sort by Date</SelectItem>
              <SelectItem value="activityType">Sort by Type</SelectItem>
              <SelectItem value="title">Sort by Name</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="search"
            placeholder="Search by activity type or name..."
            className="flex-grow"
          />
        </div>
      </CardHeader>
      <CardContent>
        {relevantModules.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No tasks in the timeline yet.</p>
        ) : (
          <ScrollArea className="h-[400px] pr-3"> {/* Adjust height as needed */}
            {sortedDateKeys.map(dateKey => (
              <div key={dateKey} className="mb-4">
                <h3 className="text-md font-semibold text-primary my-3 sticky top-0 bg-background/95 py-2 z-10 backdrop-blur-sm">
                  {dateKey}
                </h3>
                {groupedTasks[dateKey].map((module, index, arr) => (
                  <TimelineItem key={module.id} module={module} isLastItem={index === arr.length -1} />
                ))}
              </div>
            ))}
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default WeeklyTasksSection;

