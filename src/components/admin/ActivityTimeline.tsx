'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MessageSquare, UserCheck, FileText, Mail } from 'lucide-react';

type TimelineEvent = {
  id: string;
  type:
    | 'enrollment_approved'
    | 'submission_received'
    | 'note_added'
    | 'status_changed'
    | 'submission_responded';
  actor: string;
  description: string;
  target: string;
  time: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  route: string; // e.g. '/enrollments/2'
};

// Optional: change this to '' if your routes are already absolute.
const ADMIN_PREFIX = '/admin';

const timelineEvents: TimelineEvent[] = [
  {
    id: '1',
    type: 'enrollment_approved',
    actor: 'Admin User',
    description: 'Approved enrollment for Surveyor Training',
    target: 'Ravi Kumar',
    time: '15 minutes ago',
    icon: UserCheck,
    route: '/enrollments/2',
  },
  {
    id: '2',
    type: 'submission_received',
    actor: 'System',
    description: 'New contact submission received',
    target: 'Course Inquiry',
    time: '1 hour ago',
    icon: Mail,
    route: '/contact-submissions/5',
  },
  {
    id: '3',
    type: 'note_added',
    actor: 'Support Team',
    description: 'Added note to enrollment',
    target: 'Document verification completed',
    time: '2 hours ago',
    icon: MessageSquare,
    route: '/enrollments/1',
  },
  {
    id: '4',
    type: 'status_changed',
    actor: 'Admin User',
    description: 'Changed status from Pending to In Review',
    target: 'Meera Shah enrollment',
    time: '3 hours ago',
    icon: FileText,
    route: '/enrollments/3',
  },
  {
    id: '5',
    type: 'submission_responded',
    actor: 'Support Team',
    description: 'Responded to fee structure inquiry',
    target: 'Amit Singh',
    time: '4 hours ago',
    icon: MessageSquare,
    route: '/contact-submissions/3',
  },
];

export function ActivityTimeline() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5" />
          <span>Recent Activity</span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {timelineEvents.map((event, index) => (
            <div key={event.id} className="flex items-start space-x-3">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                  <event.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                {index < timelineEvents.length - 1 && (
                  <div className="w-px h-6 bg-border mt-2" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium truncate">
                    <span className="text-primary">{event.actor}</span>
                    <span className="text-muted-foreground"> {event.description}</span>
                  </p>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                    {event.time}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-1">
                  <Link
                    href={`${ADMIN_PREFIX}${event.route}`}
                    className="text-xs text-primary hover:underline truncate"
                  >
                    {event.target}
                  </Link>

                  <Badge variant="secondary" className="text-xs">
                    {event.type.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t mt-4">
          <Link
            href={`${ADMIN_PREFIX}/activity`}
            className="text-sm text-primary hover:underline block text-center"
          >
            View Full Activity Log
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
