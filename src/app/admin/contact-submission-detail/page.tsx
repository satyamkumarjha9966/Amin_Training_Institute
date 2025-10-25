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
  Mail,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";

// Mock data
const mockSubmission = {
  id: "1",
  name: "Rajesh Kumar",
  email: "rajesh@example.com",
  phone: "+91 98765 43210",
  subject: "Course Inquiry - Surveyor Training",
  message: "Hello, I am interested in your surveyor training program. Could you please provide me with detailed information about the course duration, fees, and placement assistance? I have a background in civil engineering and would like to know if there are any prerequisites for this course. Also, I would prefer weekend batches if available. Thank you.",
  status: "new",
  source: "Website",
  category: "courses",
  priority: "medium",
  createdAt: "2024-01-20T10:30:00Z",
  updatedAt: "2024-01-20T10:30:00Z",
  assignedTo: null,
  tags: ["surveyor", "weekend-batch", "placement"],
  timeline: [
    {
      id: "1",
      action: "Submission Created",
      description: "Contact form submitted via website",
      timestamp: "2024-01-20T10:30:00Z",
      user: "System"
    }
  ]
};

export default function ContactSubmissionDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [newNote, setNewNote] = useState("");
  const [status, setStatus] = useState(mockSubmission.status);

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
          <Button variant="ghost" size="sm" onClick={() => router.push("/contact-submissions")}>
            <ArrowLeft className="h-4 w-2 mr-2" />
            Back to List
          </Button>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h1 className="sm:text-sm xl:text-2xl font-semibold">Contact Submission</h1>
              <StatusBadge status={status} />
            </div>
            <p className="text-sm text-muted-foreground">
              Submitted on {new Date(mockSubmission.createdAt).toLocaleDateString()}
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
            Export PDF
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Submission Details */}
          <Card>
            <CardHeader>
              <CardTitle>Submission Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="text-sm font-medium">{mockSubmission.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-sm">{mockSubmission.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <p className="text-sm">{mockSubmission.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Source</label>
                  <p className="text-sm">{mockSubmission.source}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Subject</label>
                <p className="text-sm font-medium">{mockSubmission.subject}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Message</label>
                <p className="text-sm leading-relaxed mt-1 p-3 bg-muted rounded-md">
                  {mockSubmission.message}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Response/Notes Section */}
          <Card>
            <CardHeader>
              <CardTitle>Internal Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Textarea
                  placeholder="Add internal notes or response details..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  rows={4}
                />
                <Button onClick={handleAddNote} disabled={!newNote.trim()}>
                  Add Note
                </Button>
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
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="in-review">In Review</SelectItem>
                    <SelectItem value="responded">Responded</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Send Response
              </Button>
              
              <Button variant="outline" className="w-full">
                <Phone className="h-4 w-4 mr-2" />
                Schedule Call
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
                <span className="text-muted-foreground">Created:</span>
                <span>{new Date(mockSubmission.createdAt).toLocaleString()}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Updated:</span>
                <span>{new Date(mockSubmission.updatedAt).toLocaleString()}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Assigned:</span>
                <span>{mockSubmission.assignedTo || "Unassigned"}</span>
              </div>
              
              <div>
                <span className="text-sm text-muted-foreground">Category:</span>
                <Badge variant="outline" className="ml-2 text-xs">
                  {mockSubmission.category}
                </Badge>
              </div>
              
              <div>
                <span className="text-sm text-muted-foreground">Tags:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {mockSubmission.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockSubmission.timeline.map((event) => (
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