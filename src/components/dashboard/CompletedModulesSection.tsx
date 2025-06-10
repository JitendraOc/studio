
import React from 'react';
import type { Module } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CompletedModuleItem from './CompletedModuleItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Archive } from 'lucide-react';

interface CompletedModulesSectionProps {
  modules: Module[];
}

const CompletedModulesSection: React.FC<CompletedModulesSectionProps> = ({ modules }) => {
  const completedModules = modules.filter(m => m.completed);

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center space-x-2">
        <Archive className="h-6 w-6 text-primary" />
        <CardTitle className="text-xl font-semibold">Completed Modules</CardTitle>
      </CardHeader>
      <CardContent>
        {completedModules.length === 0 ? (
          <p className="text-muted-foreground">No modules completed yet.</p>
        ) : (
          <ScrollArea className="h-[200px] pr-3"> {/* Adjust height as needed */}
            <div className="space-y-1 divide-y divide-border">
              {completedModules.map(module => (
                <CompletedModuleItem key={module.id} module={module} />
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default CompletedModulesSection;
