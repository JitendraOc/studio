import React from 'react';
import type { LogbookEntry } from '@/types';
import { format } from 'date-fns';

interface LogEntryItemProps {
  entry: LogbookEntry;
}

const LogEntryItem: React.FC<LogEntryItemProps> = ({ entry }) => {
  return (
    <div className="py-3 px-1 hover:bg-muted/50 rounded-md transition-colors">
      <p className="text-xs text-muted-foreground">{format(entry.date, 'MMM dd, yyyy - HH:mm')}</p>
      <p className="text-sm font-medium text-foreground">{entry.activity}</p>
      {entry.details && <p className="text-xs text-muted-foreground">{entry.details}</p>}
    </div>
  );
};

export default LogEntryItem;
