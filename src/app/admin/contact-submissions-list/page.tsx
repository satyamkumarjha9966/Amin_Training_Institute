"use client"

import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Download, Plus, Archive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { FilterBar } from "@/components/ui/filter-bar";
import { DataGrid, Column } from "@/components/ui/data-grid";
import { StatusBadge } from "@/components/ui/status-badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

// Mock data
const mockSubmissions = [
  {
    id: "1",
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    subject: "Course Inquiry",
    status: "new",
    source: "Website",
    createdAt: "2024-01-20T10:30:00Z",
    category: "general"
  },
  {
    id: "2",
    name: "Priya Sharma",
    email: "priya@example.com",
    subject: "Admission Requirements",
    status: "in-review",
    source: "Phone",
    createdAt: "2024-01-19T14:15:00Z",
    category: "admission"
  },
  {
    id: "3",
    name: "Amit Singh",
    email: "amit@example.com",
    subject: "Fee Structure Query",
    status: "responded",
    source: "Email",
    createdAt: "2024-01-18T09:45:00Z",
    category: "fees"
  }
];

export default function ContactSubmissionsList() {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [filters, setFilters] = useState<Array<{ id: string; label: string; value: string }>>([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const columns: Column[] = [
    {
      key: "name",
      label: "Contact Name",
      sortable: true,
    },
    {
      key: "email",
      label: "Email",
      sortable: true,
    },
    {
      key: "subject",
      label: "Subject",
      sortable: true,
    },
    {
      key: "status",
      label: "Status",
      render: (value) => <StatusBadge status={value} />,
    },
    {
      key: "source",
      label: "Source",
      render: (value) => (
        <span className="text-sm text-muted-foreground">{value}</span>
      ),
    },
    {
      key: "createdAt",
      label: "Submitted",
      sortable: true,
      render: (value) => (
        <span className="text-sm">
          {new Date(value).toLocaleDateString()}
        </span>
      ),
    },
  ];

  const filteredData = useMemo(() => {
    return mockSubmissions.filter((submission) => {
      const matchesSearch = 
        submission.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        submission.email.toLowerCase().includes(searchValue.toLowerCase()) ||
        submission.subject.toLowerCase().includes(searchValue.toLowerCase());
      
      const matchesStatus = !statusFilter || submission.status === statusFilter;
      const matchesSource = !sourceFilter || submission.source === sourceFilter;
      const matchesCategory = !categoryFilter || submission.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesSource && matchesCategory;
    });
  }, [searchValue, statusFilter, sourceFilter, categoryFilter]);

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
    router.push(`/contact-submissions/${row.id}`);
  };

  const handleRemoveFilter = (filterId: string) => {
    setFilters(prev => prev.filter(f => f.id !== filterId));
    // Reset the corresponding filter state
    if (filterId === "status") setStatusFilter("");
    if (filterId === "source") setSourceFilter("");
    if (filterId === "category") setCategoryFilter("");
  };

  const handleClearAll = () => {
    setFilters([]);
    setStatusFilter("");
    setSourceFilter("");
    setCategoryFilter("");
  };

  const stats = [
    { label: "New", value: mockSubmissions.filter(s => s.status === "new").length, variant: "outline" as const },
    { label: "In Review", value: mockSubmissions.filter(s => s.status === "in-review").length, variant: "secondary" as const },
    { label: "Responded", value: mockSubmissions.filter(s => s.status === "responded").length, variant: "default" as const },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Contact Submissions"
        subtitle="Manage and respond to contact form submissions"
        count={filteredData.length}
        stats={stats}
        actions={
          <>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Create New
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
        placeholder="Search by name, email, or subject..."
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="in-review">In Review</SelectItem>
                <SelectItem value="responded">Responded</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="source">Source</Label>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All sources" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All sources</SelectItem>
                <SelectItem value="Website">Website</SelectItem>
                <SelectItem value="Phone">Phone</SelectItem>
                <SelectItem value="Email">Email</SelectItem>
                <SelectItem value="Walk-in">Walk-in</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All categories</SelectItem>
                <SelectItem value="general">General Inquiry</SelectItem>
                <SelectItem value="admission">Admission</SelectItem>
                <SelectItem value="fees">Fees</SelectItem>
                <SelectItem value="courses">Courses</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </FilterBar>

      {selectedRows.length > 0 && (
        <div className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
          <span className="text-sm text-muted-foreground">
            {selectedRows.length} item(s) selected
          </span>
          <Button variant="outline" size="sm">
            <Archive className="h-4 w-4 mr-2" />
            Archive Selected
          </Button>
          <Button variant="outline" size="sm">
            Mark as Reviewed
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
          view: (row) => router.push(`/contact-submissions/${row.id}`),
          edit: (row) => router.push(`/contact-submissions/${row.id}/edit`),
          archive: (row) => console.log("Archive", row),
        }}
      />
    </div>
  );
}