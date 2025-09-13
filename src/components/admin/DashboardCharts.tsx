'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
// No react-router-dom here (not needed)

const timeSeriesData = [
  { name: 'Jan', submissions: 45, enrollments: 28 },
  { name: 'Feb', submissions: 52, enrollments: 35 },
  { name: 'Mar', submissions: 48, enrollments: 42 },
  { name: 'Apr', submissions: 61, enrollments: 38 },
  { name: 'May', submissions: 55, enrollments: 45 },
  { name: 'Jun', submissions: 67, enrollments: 52 },
];

const sourceData = [
  { name: 'Website', value: 145, color: 'hsl(var(--primary))' },
  { name: 'Social Media', value: 98, color: 'hsl(var(--secondary))' },
  { name: 'Referral', value: 67, color: 'hsl(var(--accent))' },
  { name: 'Direct', value: 45, color: 'hsl(var(--muted))' },
];

const statusData = [
  { name: 'Pending', value: 25, color: 'hsl(var(--warning))' },
  { name: 'Approved', value: 45, color: 'hsl(var(--success))' },
  { name: 'In Review', value: 20, color: 'hsl(var(--info))' },
  { name: 'Rejected', value: 10, color: 'hsl(var(--destructive))' },
];

export function DashboardCharts() {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Time Series */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Activity Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="name" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                }}
              />
              <Area
                type="monotone"
                dataKey="submissions"
                stackId="1"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.6}
                name="Contact Submissions"
              />
              <Area
                type="monotone"
                dataKey="enrollments"
                stackId="1"
                stroke="hsl(var(--secondary))"
                fill="hsl(var(--secondary))"
                fillOpacity={0.6}
                name="Course Enrollments"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Status Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="grid grid-cols-2 gap-2 mt-4">
            {statusData.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Source Breakdown */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Traffic Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={sourceData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="name" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                }}
              />
              <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
