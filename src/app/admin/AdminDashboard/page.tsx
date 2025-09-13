'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';
import { FilterBar } from '@/components/ui/filter-bar';
import { KPICard } from '@/components/admin/KPICard';
import { DashboardCharts } from '@/components/admin/DashboardCharts';
import { WorkQueue } from '@/components/admin/WorkQueue';
import { ActivityTimeline } from '@/components/admin/ActivityTimeline';
import {
  Mail,
  GraduationCap,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  RefreshCw,
  Calendar,
  Filter,
} from 'lucide-react';

// If your routes already include /admin in child components (as we did),
// keep this ''. If not, set to '/admin' here and remove duplicates below.
// To be consistent with prior components, we’ll prefix here:
const ADMIN_PREFIX = '/admin';

export default function AdminDashboard() {
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState<Array<{ id: string; label: string; value: string }>>([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock data with enhanced metrics
  const stats = {
    totalSubmissions: 156,
    newSubmissions: 23,
    totalEnrollments: 89,
    pendingEnrollments: 12,
    totalRevenue: 1650000,
    thisMonthRevenue: 185000,
    activeStudents: 67,
    conversionRate: 73.5,
    avgResponseTime: 2.4,
    avgProcessingTime: 5.2,
  };

  const handleRefresh = () => {
    setLastUpdated(new Date());
    // TODO: trigger data refetch
  };

  const handleExport = () => {
    // TODO: export dashboard data
    console.log('Exporting dashboard data...');
  };

  const recentSubmissions = [
    { id: '1', name: 'Rajesh Kumar', subject: 'Course Inquiry', status: 'new', time: '2 hours ago' },
    { id: '2', name: 'Priya Sharma', subject: 'Admission Requirements', status: 'in-review', time: '4 hours ago' },
    { id: '3', name: 'Amit Singh', subject: 'Fee Structure', status: 'responded', time: '1 day ago' },
  ];

  const recentEnrollments = [
    { id: '1', name: 'Sunita Patel', course: 'Diploma in Amin', status: 'pending', time: '1 hour ago' },
    { id: '2', name: 'Ravi Kumar', course: 'Surveyor Training', status: 'approved', time: '3 hours ago' },
    { id: '3', name: 'Meera Shah', course: 'GST Practitioner', status: 'enrolled', time: '6 hours ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Enhanced Page Header */}
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back! Here's what's happening at your institute."
        actions={
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </span>
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        }
      />

      {/* Global Filters */}
      <FilterBar
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        filters={filters}
        onRemoveFilter={(id) => setFilters(filters.filter((f) => f.id !== id))}
        onClearAll={() => setFilters([])}
        placeholder="Search across all data..."
      >
        {/* Advanced filter content */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Date Range</label>
            <Button variant="outline" className="w-full justify-start mt-1">
              <Calendar className="h-4 w-4 mr-2" />
              Last 30 days
            </Button>
          </div>
          <div>
            <label className="text-sm font-medium">Module</label>
            <Button variant="outline" className="w-full justify-start mt-1">
              <Filter className="h-4 w-4 mr-2" />
              All Modules
            </Button>
          </div>
        </div>
      </FilterBar>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard
          title="Contact Submissions"
          value={stats.totalSubmissions}
          icon={<Mail className="h-4 w-4" />}
          trend={{ value: 12.5, label: 'vs last month', direction: 'up' }}
          subtitle={`${stats.newSubmissions} new this week`}
          href={`${ADMIN_PREFIX}/contact-submissions`}
        />

        <KPICard
          title="Course Enrollments"
          value={stats.totalEnrollments}
          icon={<GraduationCap className="h-4 w-4" />}
          trend={{ value: 8.3, label: 'vs last month', direction: 'up' }}
          subtitle={`${stats.pendingEnrollments} pending review`}
          href={`${ADMIN_PREFIX}/enrollments`}
        />

        <KPICard
          title="Conversion Rate"
          value={`${stats.conversionRate}%`}
          icon={<TrendingUp className="h-4 w-4" />}
          trend={{ value: 2.1, label: 'vs last month', direction: 'up' }}
          subtitle="submissions to enrollments"
        />

        <KPICard
          title="Pending Actions"
          value={stats.pendingEnrollments + 8}
          icon={<AlertCircle className="h-4 w-4" />}
          trend={{ value: -15.2, label: 'vs last week', direction: 'down' }}
          subtitle="require attention"
        />

        <KPICard
          title="Avg Response Time"
          value={`${stats.avgResponseTime}h`}
          icon={<Clock className="h-4 w-4" />}
          trend={{ value: -8.5, label: 'vs last month', direction: 'down' }}
          subtitle="to submissions"
        />

        <KPICard
          title="Active Students"
          value={stats.activeStudents}
          icon={<Users className="h-4 w-4" />}
          trend={{ value: 18.7, label: 'vs last month', direction: 'up' }}
          subtitle="currently enrolled"
        />
      </div>

      {/* Charts */}
      <DashboardCharts />

      {/* Work Queue and Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WorkQueue />
        </div>
        <ActivityTimeline />
      </div>

      {/* Recent Activity Tables */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Contact Submissions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Contact Submissions</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link href={`${ADMIN_PREFIX}/contact-submissions`}>View All</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentSubmissions.map((submission) => (
              <Link
                key={submission.id}
                href={`${ADMIN_PREFIX}/contact-submissions/${submission.id}`}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors block"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium">{submission.name}</p>
                  <p className="text-xs text-muted-foreground">{submission.subject}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={submission.status === 'new' ? 'outline' : 'secondary'}
                    className="text-xs capitalize"
                  >
                    {submission.status === 'new'
                      ? 'New'
                      : submission.status === 'in-review'
                      ? 'In Review'
                      : 'Responded'}
                  </Badge>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {submission.time}
                  </div>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Recent Enrollments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Enrollments</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link href={`${ADMIN_PREFIX}/enrollments`}>View All</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentEnrollments.map((enrollment) => (
              <Link
                key={enrollment.id}
                href={`${ADMIN_PREFIX}/enrollments/${enrollment.id}`}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors block"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium">{enrollment.name}</p>
                  <p className="text-xs text-muted-foreground">{enrollment.course}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {enrollment.status === 'pending' && (
                      <AlertCircle className="h-3 w-3 text-orange-500" />
                    )}
                    {enrollment.status === 'approved' && (
                      <CheckCircle className="h-3 w-3 text-green-500" />
                    )}
                    {enrollment.status === 'enrolled' && (
                      <CheckCircle className="h-3 w-3 text-blue-500" />
                    )}
                    <Badge
                      variant={enrollment.status === 'pending' ? 'outline' : 'default'}
                      className="text-xs capitalize"
                    >
                      {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {enrollment.time}
                  </div>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col space-y-2" asChild>
              <Link href={`${ADMIN_PREFIX}/contact-submissions`}>
                <Mail className="h-6 w-6" />
                <span className="text-sm">Review Submissions</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2" asChild>
              <Link href={`${ADMIN_PREFIX}/enrollments`}>
                <GraduationCap className="h-6 w-6" />
                <span className="text-sm">Manage Enrollments</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Users className="h-6 w-6" />
              <span className="text-sm">Student Database</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <TrendingUp className="h-6 w-6" />
              <span className="text-sm">View Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
