"use client"

import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Download, Plus, Archive, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { FilterBar } from "@/components/ui/filter-bar";
import { DataGrid, Column } from "@/components/ui/data-grid";
import { StatusBadge } from "@/components/ui/status-badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

// Mock data
const mockEnrollments = [
  {
    id: "1",
    studentName: "Rajesh Kumar",
    email: "rajesh@example.com",
    phone: "+91 98765 43210",
    course: "Diploma in Amin",
    mode: "Online",
    status: "pending",
    paymentStatus: "unpaid",
    appliedAt: "2024-01-20T10:30:00Z",
    batch: "Morning",
    fees: 15000
  },
  {
    id: "2",
    studentName: "Priya Sharma",
    email: "priya@example.com",
    phone: "+91 87654 32109",
    course: "Surveyor Training",
    mode: "Offline",
    status: "approved",
    paymentStatus: "paid",
    appliedAt: "2024-01-19T14:15:00Z",
    batch: "Evening",
    fees: 20000
  },
  {
    id: "3",
    studentName: "Amit Singh",
    email: "amit@example.com",
    phone: "+91 76543 21098",
    course: "GST Practitioner",
    mode: "Online",
    status: "enrolled",
    paymentStatus: "paid",
    appliedAt: "2024-01-18T09:45:00Z",
    batch: "Morning",
    fees: 12000
  },
  {
    id: "4",
    studentName: "Sunita Patel",
    email: "sunita@example.com",
    phone: "+91 65432 10987",
    course: "Labour Law",
    mode: "Offline",
    status: "completed",
    paymentStatus: "paid",
    appliedAt: "2024-01-15T16:20:00Z",
    batch: "Evening",
    fees: 18000
  }
];

export default function CourseEnrollmentsList() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [filters, setFilters] = useState<Array<{ id: string; label: string; value: string }>>([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [modeFilter, setModeFilter] = useState("");

  const columns: Column[] = [
    {
      key: "studentName",
      label: "Student Name",
      sortable: true,
    },
    {
      key: "email",
      label: "Email",
      sortable: true,
    },
    {
      key: "course",
      label: "Course",
      sortable: true,
      render: (value) => (
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
    {
      key: "mode",
      label: "Mode",
      render: (value) => (
        <Badge variant="outline" className="text-xs">
          {value}
        </Badge>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value) => <StatusBadge status={value} />,
    },
    {
      key: "paymentStatus",
      label: "Payment",
      render: (value) => <StatusBadge status={value} />,
    },
    {
      key: "fees",
      label: "Fees",
      render: (value) => (
        <span className="font-medium">₹{value.toLocaleString()}</span>
      ),
    },
    {
      key: "appliedAt",
      label: "Applied",
      sortable: true,
      render: (value) => (
        <span className="text-sm">
          {new Date(value).toLocaleDateString()}
        </span>
      ),
    },
  ];

  const filteredData = useMemo(() => {
    return mockEnrollments.filter((enrollment) => {
      const matchesSearch = 
        enrollment.studentName.toLowerCase().includes(searchValue.toLowerCase()) ||
        enrollment.email.toLowerCase().includes(searchValue.toLowerCase()) ||
        enrollment.course.toLowerCase().includes(searchValue.toLowerCase());
      
      const matchesStatus = !statusFilter || enrollment.status === statusFilter;
      const matchesCourse = !courseFilter || enrollment.course === courseFilter;
      const matchesPayment = !paymentFilter || enrollment.paymentStatus === paymentFilter;
      const matchesMode = !modeFilter || enrollment.mode === modeFilter;

      return matchesSearch && matchesStatus && matchesCourse && matchesPayment && matchesMode;
    });
  }, [searchValue, statusFilter, courseFilter, paymentFilter, modeFilter]);

  const handleRowSelect = (rowId: string) => {
    setSelectedRows(prev => 
      prev.includes(rowId) 
        ? prev.filter(id => id !== rowId)
        : [...prev, rowId]
    );
  };

  const handleSelectAll = (selected: boolean) => {
    setSelectedRows(selected ? filteredData.map(item => item.id) : []);
  };

  const handleRowClick = (row: any) => {
    router.push(`/enrollments/${row.id}`);
  };

  const handleRemoveFilter = (filterId: string) => {
    setFilters(prev => prev.filter(f => f.id !== filterId));
    // Reset the corresponding filter state
    if (filterId === "status") setStatusFilter("");
    if (filterId === "course") setCourseFilter("");
    if (filterId === "payment") setPaymentFilter("");
    if (filterId === "mode") setModeFilter("");
  };

  const handleClearAll = () => {
    setFilters([]);
    setStatusFilter("");
    setCourseFilter("");
    setPaymentFilter("");
    setModeFilter("");
  };

  const stats = [
    { label: "Pending", value: mockEnrollments.filter(e => e.status === "pending").length, variant: "outline" as const },
    { label: "Approved", value: mockEnrollments.filter(e => e.status === "approved").length, variant: "default" as const },
    { label: "Enrolled", value: mockEnrollments.filter(e => e.status === "enrolled").length, variant: "secondary" as const },
    { label: "Completed", value: mockEnrollments.filter(e => e.status === "completed").length, variant: "default" as const },
  ];

  const totalRevenue = mockEnrollments
    .filter(e => e.paymentStatus === "paid")
    .reduce((sum, e) => sum + e.fees, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Course Enrollments"
        subtitle="Manage student course registrations and applications"
        count={filteredData.length}
        stats={stats}
        actions={
          <>
            <div className="text-sm text-muted-foreground">
              Total Revenue: <span className="font-semibold text-foreground">₹{totalRevenue.toLocaleString()}</span>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Enrollment
            </Button>
          </>
        }
      />

      <FilterBar
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        filters={filters}
        onRemoveFilter={handleRemoveFilter}
        onClearAll={handleClearAll}
        placeholder="Search by student name, email, or course..."
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="status">Enrollment Status</Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="enrolled">Enrolled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="course">Course</Label>
            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All courses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All courses</SelectItem>
                <SelectItem value="Diploma in Amin">Diploma in Amin</SelectItem>
                <SelectItem value="Surveyor Training">Surveyor Training</SelectItem>
                <SelectItem value="GST Practitioner">GST Practitioner</SelectItem>
                <SelectItem value="Labour Law">Labour Law</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="payment">Payment Status</Label>
            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All payments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All payments</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="unpaid">Unpaid</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="mode">Learning Mode</Label>
            <Select value={modeFilter} onValueChange={setModeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All modes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All modes</SelectItem>
                <SelectItem value="Online">Online</SelectItem>
                <SelectItem value="Offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </FilterBar>

      {selectedRows.length > 0 && (
        <div className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
          <span className="text-sm text-muted-foreground">
            {selectedRows.length} enrollment(s) selected
          </span>
          <Button variant="outline" size="sm">
            Approve Selected
          </Button>
          <Button variant="outline" size="sm">
            Send Notification
          </Button>
          <Button variant="outline" size="sm">
            <Archive className="h-4 w-4 mr-2" />
            Archive
          </Button>
        </div>
      )}

      <DataGrid
        columns={columns}
        data={filteredData}
        selectedRows={selectedRows}
        onRowSelect={handleRowSelect}
        onSelectAll={handleSelectAll}
        onRowClick={handleRowClick}
        actions={{
          view: (row) => router.push(`/enrollments/${row.id}`),
          edit: (row) => router.push(`/enrollments/${row.id}/edit`),
          archive: (row) => console.log("Archive", row),
        }}
      />
    </div>
  );
}