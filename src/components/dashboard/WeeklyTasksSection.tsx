import React from 'react';
import type { Module } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ModuleCard from './ModuleCard';
import { ListChecks } from 'lucide-react';

interface WeeklyTasksSectionProps {
  modules: Module[];
}

const WeeklyTasksSection: React.FC<WeeklyTasksSectionProps> = ({ modules }) => {
  const unlockedModules = modules.filter(m => m.unlocked);
  const activeTasks = unlockedModules.filter(m => !m.completed);
  const completedTasks = unlockedModules.filter(m => m.completed);

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
            {activeTasks.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-3 text-foreground">In Progress</h3>
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                  {activeTasks.map(module => (
                    <ModuleCard key={module.id} module={module} />
                  ))}
                </div>
              </div>
            )}
            {completedTasks.length > 0 && activeTasks.length > 0 && <hr className="my-6 border-border" />}
            {completedTasks.length > 0 && (
               <div>
                <h3 className="text-lg font-medium mb-3 text-foreground">Completed</h3>
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                  {completedTasks.map(module => (
                    <ModuleCard key={module.id} module={module} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default WeeklyTasksSection;
