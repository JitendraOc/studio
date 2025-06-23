import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, Phone, UserCircle, LifeBuoy } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SupportSection = ({ contact }) => {
  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center space-x-2">
        <LifeBuoy className="h-6 w-6 text-primary" />
        <CardTitle className="text-xl font-semibold">Support & Guidance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={contact.avatarUrl} alt={contact.name} data-ai-hint="professional person" />
            <AvatarFallback>{contact.avatarFallback}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="text-lg font-medium text-foreground">{contact.name}</h4>
            <p className="text-sm text-muted-foreground">{contact.role}</p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <a href={`mailto:${contact.email}`} className="flex items-center space-x-2 hover:text-primary transition-colors">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{contact.email}</span>
          </a>
          <a href={`tel:${contact.phone}`} className="flex items-center space-x-2 hover:text-primary transition-colors">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{contact.phone}</span>
          </a>
        </div>
        <Button className="w-full mt-2" variant="outline">
          <UserCircle className="mr-2 h-4 w-4" /> Contact Support
        </Button>
      </CardContent>
    </Card>
  );
};

export default SupportSection;
