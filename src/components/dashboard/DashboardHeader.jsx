import React from 'react';
import { BriefcaseMedical, UserCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const DashboardHeader = () => {
  return (
    <header className="bg-card shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <BriefcaseMedical className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-headline font-semibold text-primary">
              Medical Course Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {/* Placeholder for user actions or info */}
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" data-ai-hint="professional person" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
