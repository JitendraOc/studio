
import React from 'react';
import type { Module } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ModuleCard from './ModuleCard';
import { ListChecks } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface WeeklyTasksSectionProps {
  modules: Module[];
}

const INITIAL_VISIBLE_COUNT = 2; // Number of tasks to show before collapsing

const WeeklyTasksSection: React.FC<WeeklyTasksSectionProps> = ({ modules }) => {
  const unlockedModules = modules.filter(m => m.unlocked);
  const currentDueTasks = unlockedModules.filter(m => !m.completed);
  const pastDueTasks = unlockedModules.filter(m => m.completed);

  const renderTaskSection = (tasks: Module[], accordionValuePrefix: string, emptyMessage: string) => {
    if (tasks.length === 0) {
      return <p className="text-muted-foreground pt-2">{emptyMessage}</p>;
    }

    const visibleTasks = tasks.slice(0, INITIAL_VISIBLE_COUNT);
    const hiddenTasks = tasks.slice(INITIAL_VISIBLE_COUNT);

    return (
      <div>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          {visibleTasks.map(module => (
            <ModuleCard key={`${accordionValuePrefix}-visible-${module.id}`} module={module} />
          ))}
        </div>
        {hiddenTasks.length > 0 && (
          <Accordion type="single" collapsible className="w-full mt-4">
            <AccordionItem value={`${accordionValuePrefix}-item`}>
              <AccordionTrigger className="text-sm hover:no-underline justify-start [&[data-state=open]>svg]:ml-2">
                Show {hiddenTasks.length} more task{hiddenTasks.length > 1 ? 's' : ''}
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 pt-4">
                  {hiddenTasks.map(module => (
                    <ModuleCard key={`${accordionValuePrefix}-hidden-${module.id}`} module={module} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </div>
    );
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center space-x-2">
        <ListChecks className="h-6 w-6 text-primary" />
        <CardTitle className="text-xl font-semibold">Weekly Learning Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        {unlockedModules.length === 0 ? (
          <p className="text-muted-foreground">No tasks available yet. New modules will appear here as they unlock.</p>
        ) : (
          <Tabs defaultValue="current-due" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="current-due">Current Due</TabsTrigger>
              <TabsTrigger value="past-due">Past Due</TabsTrigger>
            </TabsList>
            <TabsContent value="current-due">
              {renderTaskSection(currentDueTasks, 'current-due', 'No current due tasks.')}
            </TabsContent>
            <TabsContent value="past-due">
              {renderTaskSection(pastDueTasks, 'past-due', 'No past due (completed) tasks found.')}
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

export default WeeklyTasksSection;
