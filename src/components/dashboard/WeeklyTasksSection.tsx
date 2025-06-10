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

interface WeeklyTasksSectionProps {
  modules: Module[];
}

const INITIAL_VISIBLE_COUNT = 2; // Number of tasks to show before collapsing

const WeeklyTasksSection: React.FC<WeeklyTasksSectionProps> = ({ modules }) => {
  const unlockedModules = modules.filter(m => m.unlocked);
  const activeTasks = unlockedModules.filter(m => !m.completed);
  const completedTasks = unlockedModules.filter(m => m.completed);

  const renderTaskSection = (title: string, tasks: Module[], sectionType: 'active' | 'completed') => {
    if (tasks.length === 0) return null;

    const visibleTasks = tasks.slice(0, INITIAL_VISIBLE_COUNT);
    const hiddenTasks = tasks.slice(INITIAL_VISIBLE_COUNT);

    return (
      <div>
        <h3 className="text-lg font-medium mb-3 text-foreground">{title}</h3>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          {visibleTasks.map(module => (
            <ModuleCard key={`${sectionType}-visible-${module.id}`} module={module} />
          ))}
        </div>
        {hiddenTasks.length > 0 && (
          <Accordion type="single" collapsible className="w-full mt-4">
            <AccordionItem value={`item-${sectionType}`}>
              <AccordionTrigger className="text-sm hover:no-underline justify-start [&[data-state=open]>svg]:ml-2">
                Show {hiddenTasks.length} more {title.toLowerCase()} task{hiddenTasks.length > 1 ? 's' : ''}
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 pt-4">
                  {hiddenTasks.map(module => (
                    <ModuleCard key={`${sectionType}-hidden-${module.id}`} module={module} />
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
        <CardTitle className="text-xl font-semibold">Current Learning Tasks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {unlockedModules.length === 0 ? (
          <p className="text-muted-foreground">No tasks available yet. New modules will appear here as they unlock.</p>
        ) : (
          <>
            {renderTaskSection('In Progress', activeTasks, 'active')}
            {activeTasks.length > 0 && completedTasks.length > 0 && <hr className="my-6 border-border" />}
            {renderTaskSection('Completed', completedTasks, 'completed')}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default WeeklyTasksSection;
