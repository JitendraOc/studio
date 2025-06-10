import React from 'react';
import type { Module } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, NotebookPen, Lock } from 'lucide-react';

interface ModuleCardProps {
  module: Module;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module }) => {
  const Icon = module.completed ? CheckCircle2 : module.unlocked ? NotebookPen : Lock;
  const iconColor = module.completed ? 'text-green-500' : module.unlocked ? 'text-primary' : 'text-muted-foreground';
  
  const chapterProgress = module.unlocked && module.totalChapters && module.completedChapters !== undefined
    ? (module.completedChapters / module.totalChapters) * 100
    : module.completed ? 100 : 0;

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{module.title}</CardTitle>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <CardDescription className="text-sm pt-1">{module.description}</CardDescription>
      </CardHeader>
      {module.unlocked && (module.totalChapters ?? 0) > 0 && (
        <CardContent>
          {module.completedChapters !== undefined && module.totalChapters !== undefined && (
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Chapter Progress</span>
                <span>{module.completedChapters} / {module.totalChapters}</span>
              </div>
              <Progress value={chapterProgress} aria-label={`${module.title} chapter progress`} className="h-2" />
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default ModuleCard;
