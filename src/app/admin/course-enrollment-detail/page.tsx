"use client"

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Edit, 
  Printer, 
  Download, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  User,
  GraduationCap,
  CreditCard,
  CheckCircle,
  XCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

// Mock data
const mockEnrollment = {
  id: "1",
  studentName: "Rajesh Kumar",
  email: "rajesh@example.com",
  phone: "+91 98765 43210",
  fatherName: "Suresh Kumar",
  address: "123 Main Street, New Delhi, 110001",
  aadhaar: "1234-5678-9012",
  course: "Diploma in Amin",
  mode: "Online",
  batch: "Morning",
  status: "approved",
  paymentStatus: "paid",
  fees: 15000,
  paidAmount: 15000,
  appliedAt: "2024-01-20T10:30:00Z",
  approvedAt: "2024-01-21T09:15:00Z",
  enrolledAt: "2024-01-22T10:00:00Z",
  qualification: "B.Tech Civil Engineering",
  institution: "Delhi Technical University",
  yearOfPassing: "2022",
  documents: [
    { name: "Aadhaar Card", url: "/docs/aadhaar.pdf", uploaded: true },
    { name: "Marksheet", url: "/docs/marksheet.pdf", uploaded: true },
    { name: "Photograph", url: "/docs/photo.jpg", uploaded: true }
  ],
  progress: {
    modules: [
      { name: "Introduction to Survey", completed: true, score: 85 },
      { name: "Land Measurement", completed: true, score: 92 },
      { name: "Digital Mapping", completed: false, score: null },
      { name: "Legal Aspects", completed: false, score: null }
    ],
    overallProgress: 50
  },
  timeline: [
    {
      id: "1",
      action: "Application Submitted",
      description: "Student submitted enrollment application",
      timestamp: "2024-01-20T10:30:00Z",
      user: "System"
    },
    {
      id: "2",
      action: "Application Approved",
      description: "Application reviewed and approved by admin",
      timestamp: "2024-01-21T09:15:00Z",
      user: "Admin"
    },
    {
      id: "3",
      action: "Payment Received",
      description: "Full course fee payment completed",
      timestamp: "2024-01-22T08:30:00Z",
      user: "System"
    },
    {
      id: "4",
      action: "Student Enrolled",
      description: "Student enrolled in Morning batch",
      timestamp: "2024-01-22T10:00:00Z",
      user: "System"
    }
  ]
};

export default function CourseEnrollmentDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [newNote, setNewNote] = useState("");
  const [status, setStatus] = useState(mockEnrollment.status);

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    // Here you would typically make an API call to update the status
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      // Add note logic here
      setNewNote("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => router.push("/enrollments")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to List
          </Button>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h1 className="sm:text-sm xl:text-2xl font-semibold">Course Enrollment</h1>
              <StatusBadge status={status} />
              <StatusBadge status={mockEnrollment.paymentStatus} />
            </div>
            <p className="text-sm text-muted-foreground">
              Applied on {new Date(mockEnrollment.appliedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Certificate
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Student Details */}
          <Card>
            <CardHeader>
              <CardTitle>Student Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="text-sm font-medium">{mockEnrollment.studentName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-sm">{mockEnrollment.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <p className="text-sm">{mockEnrollment.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Father's Name</label>
                  <p className="text-sm">{mockEnrollment.fatherName}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Address</label>
                <p className="text-sm">{mockEnrollment.address}</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Qualification</label>
                  <p className="text-sm">{mockEnrollment.qualification}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Institution</label>
                  <p className="text-sm">{mockEnrollment.institution}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Course Details */}
          <Card>
            <CardHeader>
              <CardTitle>Course Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Course</label>
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    <p className="text-sm font-medium">{mockEnrollment.course}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Mode</label>
                  <Badge variant="outline">{mockEnrollment.mode}</Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Batch</label>
                  <Badge variant="secondary">{mockEnrollment.batch}</Badge>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Course Fee</label>
                  <p className="text-lg font-semibold">₹{mockEnrollment.fees.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Amount Paid</label>
                  <p className="text-lg font-semibold text-green-600">₹{mockEnrollment.paidAmount.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Tracking */}
          {status === "enrolled" && (
            <Card>
              <CardHeader>
                <CardTitle>Course Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Progress</span>
                    <span>{mockEnrollment.progress.overallProgress}%</span>
                  </div>
                  <Progress value={mockEnrollment.progress.overallProgress} className="h-2" />
                </div>

                <div className="space-y-3">
                  {mockEnrollment.progress.modules.map((module, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {module.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-gray-400" />
                        )}
                        <span className="font-medium">{module.name}</span>
                      </div>
                      {module.completed && module.score && (
                        <Badge variant="default">Score: {module.score}%</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {mockEnrollment.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">{doc.name}</span>
                    <div className="flex items-center space-x-2">
                      {doc.uploaded ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <Select value={status} onValueChange={handleStatusChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="enrolled">Enrolled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="w-full">
                <CreditCard className="h-4 w-4 mr-2" />
                Process Payment
              </Button>
              
              <Button variant="outline" className="w-full">
                Send Notification
              </Button>
            </CardContent>
          </Card>

          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Applied:</span>
                <span>{new Date(mockEnrollment.appliedAt).toLocaleDateString()}</span>
              </div>
              
              {mockEnrollment.approvedAt && (
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Approved:</span>
                  <span>{new Date(mockEnrollment.approvedAt).toLocaleDateString()}</span>
                </div>
              )}
              
              {mockEnrollment.enrolledAt && (
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Enrolled:</span>
                  <span>{new Date(mockEnrollment.enrolledAt).toLocaleDateString()}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockEnrollment.timeline.map((event) => (
                  <div key={event.id} className="flex space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{event.action}</p>
                      <p className="text-xs text-muted-foreground">{event.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(event.timestamp).toLocaleString()} by {event.user}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}