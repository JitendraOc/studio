
import React from 'react';
import type { Module } from '@/types';
import { CheckCircle2 } from 'lucide-react';

interface CompletedModuleItemProps {
  module: Module;
}

const CompletedModuleItem: React.FC<CompletedModuleItemProps> = ({ module }) => {
  return (
    <div className="py-3 px-1 hover:bg-muted/50 rounded-md transition-colors flex items-center space-x-3">
      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
      <div className="flex-grow">
        <p className="text-sm font-medium text-foreground">{module.title}</p>
        {module.description && <p className="text-xs text-muted-foreground truncate">{module.description}</p>}
      </div>
    </div>
  );
};

export default CompletedModuleItem;
