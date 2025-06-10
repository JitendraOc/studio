import React from 'react';
import type { Module } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Gauge } from 'lucide-react';

interface ProgressTrackerSectionProps {
  modules: Module[];
}

const ProgressTrackerSection: React.FC<ProgressTrackerSectionProps> = ({ modules }) => {
  const totalModules = modules.length;
  
  const unlockedCount = modules.filter(m => m.unlocked).length;
  const unlockedProgress = totalModules > 0 ? (unlockedCount / totalModules) * 100 : 0;

  const completedCount = modules.filter(m => m.completed).length;
  const courseCompletionProgress = totalModules > 0 ? (completedCount / totalModules) * 100 : 0;

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center space-x-2">
        <TrendingUp className="h-6 w-6 text-primary" />
        <CardTitle className="text-xl font-semibold">Your Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-1">
            <h4 className="text-md font-medium text-foreground">Module Access</h4>
            <span className="text-sm text-muted-foreground">{unlockedCount} / {totalModules} Modules Unlocked</span>
          </div>
          <Progress value={unlockedProgress} aria-label="Unlocked modules progress" className="h-3 bg-accent" />
          <p className="text-xs text-muted-foreground mt-1">Progress based on currently accessible modules.</p>
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <h4 className="text-md font-medium text-foreground">Overall Course Completion</h4>
            <span className="text-sm text-muted-foreground">{completedCount} / {totalModules} Modules Completed</span>
          </div>
          <Progress value={courseCompletionProgress} aria-label="Total course completion progress" className="h-3" />
          <p className="text-xs text-muted-foreground mt-1">Progress based on successfully completed modules.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressTrackerSection;
