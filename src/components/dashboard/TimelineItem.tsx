
import React from 'react';
import type { Module } from '@/types';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FileUp, ListChecks, BookOpen, CalendarDays, HelpCircle, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface TimelineItemProps {
  module: Module;
  isLastItem?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ module, isLastItem }) => {
  let ItemIcon;
  let actionButtonText = "View Details";
  let actionButtonVariant: "default" | "outline" | "secondary" = "outline";

  if (module.completed) {
    ItemIcon = CheckCircle2;
    actionButtonVariant = "secondary";
    switch (module.activityType) {
      case 'assignment':
        actionButtonText = "View Submission";
        break;
      case 'quiz':
        actionButtonText = "Review Quiz";
        break;
      default:
        actionButtonText = "View Details";
    }
  } else {
    switch (module.activityType) {
      case 'assignment':
        ItemIcon = FileUp;
        actionButtonText = "Add Submission";
        actionButtonVariant = "default";
        break;
      case 'quiz':
        ItemIcon = ListChecks;
        actionButtonText = "Attempt Quiz Now";
        actionButtonVariant = "default";
        break;
      case 'reading':
        ItemIcon = BookOpen;
        actionButtonText = "Start Reading";
        break;
      case 'event':
        ItemIcon = CalendarDays;
        actionButtonText = "View Event";
        break;
      default:
        ItemIcon = HelpCircle;
    }
  }
  

  return (
    <>
      <div className="flex items-start space-x-4 py-4">
        <div className="flex flex-col items-center w-16 flex-shrink-0 pt-1">
          <p className="text-sm font-medium text-foreground">{format(module.dueDate, 'HH:mm')}</p>
          <ItemIcon className={cn("h-6 w-6 mt-1", module.completed ? "text-green-500" : "text-primary")} />
        </div>
        <div className="flex-grow">
          <h4 className="font-semibold text-foreground">{module.title}</h4>
          <p className="text-sm text-muted-foreground">
            {module.description}
            {module.category && ` - ${module.category}`}
          </p>
        </div>
        <div className="flex-shrink-0">
          <Button variant={actionButtonVariant} size="sm">
            {actionButtonText}
          </Button>
        </div>
      </div>
      {!isLastItem && <Separator />}
    </>
  );
};

export default TimelineItem;
