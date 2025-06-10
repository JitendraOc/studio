import React from 'react';
import type { LogbookEntry as LogbookEntryType } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LogEntryItem from './LogEntryItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ClipboardList } from 'lucide-react';

interface LogbookSectionProps {
  entries: LogbookEntryType[];
}

const LogbookSection: React.FC<LogbookSectionProps> = ({ entries }) => {
  const recentEntries = entries.sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 10); // Show latest 10

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center space-x-2">
        <ClipboardList className="h-6 w-6 text-primary" />
        <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {recentEntries.length === 0 ? (
          <p className="text-muted-foreground">No recent activity.</p>
        ) : (
          <ScrollArea className="h-[250px] pr-3"> {/* Adjust height as needed */}
            <div className="space-y-1 divide-y divide-border">
              {recentEntries.map(entry => (
                <LogEntryItem key={entry.id} entry={entry} />
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default LogbookSection;
