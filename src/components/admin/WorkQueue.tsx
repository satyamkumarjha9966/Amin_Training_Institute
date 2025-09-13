'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, AlertCircle, User, FileText } from 'lucide-react';

const urgentItems = [
  {
    id: '1',
    type: 'submission',
    title: 'Course Inquiry - Diploma in Amin',
    submitter: 'Rajesh Kumar',
    timeAgo: '2 hours ago',
    urgency: 'high',
    route: '/admin/contact-submissions/1',
  },
  {
    id: '2',
    type: 'enrollment',
    title: 'Pending Enrollment Approval',
    submitter: 'Priya Sharma',
    timeAgo: '4 hours ago',
    urgency: 'medium',
    route: '/admin/enrollments/2',
  },
  {
    id: '3',
    type: 'submission',
    title: 'Fee Structure Inquiry',
    submitter: 'Amit Singh',
    timeAgo: '6 hours ago',
    urgency: 'low',
    route: '/admin/contact-submissions/3',
  },
  {
    id: '4',
    type: 'enrollment',
    title: 'Document Verification Required',
    submitter: 'Sunita Patel',
    timeAgo: '1 day ago',
    urgency: 'high',
    route: '/admin/enrollments/4',
  },
];

export function WorkQueue() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 text-warning" />
          <span>Needs Attention</span>
        </CardTitle>
        <Badge variant="outline" className="text-xs">
          {urgentItems.length} items
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        {urgentItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                {item.type === 'submission' ? (
                  <FileText className="h-4 w-4 text-primary" />
                ) : (
                  <User className="h-4 w-4 text-secondary" />
                )}
                <Badge
                  variant={
                    item.urgency === 'high'
                      ? 'destructive'
                      : item.urgency === 'medium'
                      ? 'default'
                      : 'secondary'
                  }
                  className="text-xs capitalize"
                >
                  {item.urgency}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span>{item.submitter}</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{item.timeAgo}</span>
                  </div>
                </div>
              </div>
            </div>

            <Button variant="outline" size="sm" asChild>
              <Link href={item.route}>Review</Link>
            </Button>
          </div>
        ))}

        <div className="pt-2 border-t">
          <Button variant="ghost" className="w-full" asChild>
            <Link href="/admin/contact-submissions">View All Pending Items</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
