import React from 'react';
import { format } from 'date-fns';

const LogEntryItem = ({ entry }) => {
  return (
    <div className="py-3 px-1 hover:bg-muted/50 rounded-md transition-colors">
      <p className="text-xs text-muted-foreground">{format(entry.date, 'MMM dd, yyyy - HH:mm')}</p>
      <p className="text-sm font-medium text-foreground">{entry.activity}</p>
      {entry.details && <p className="text-xs text-muted-foreground">{entry.details}</p>}
    </div>
  );
};

export default LogEntryItem;
