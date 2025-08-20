import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  FileText, 
  Download, 
  Search, 
  Calendar,
  Bell,
  AlertCircle,
  Clock
} from "lucide-react";

const Notices = () => {
  const notices = [
    {
      id: 1,
      title: "Admission Open for April 2024 Batch",
      description: "Applications are now open for the April 2024 batch. Last date for application submission is 30th March 2024.",
      category: "Admission",
      date: "2024-01-15",
      isNew: true,
      pdfLink: "#",
      priority: "high"
    },
    {
      id: 2,
      title: "Mid-Term Examination Schedule",
      description: "Mid-term examinations for all courses will be conducted from 15th February to 25th February 2024.",
      category: "Exam",
      date: "2024-01-10",
      isNew: true,
      pdfLink: "#",
      priority: "medium"
    },
    {
      id: 3,
      title: "Republic Day Holiday Notice",
      description: "The institute will remain closed on 26th January 2024 on account of Republic Day.",
      category: "Holiday",
      date: "2024-01-05",
      isNew: false,
      pdfLink: "#",
      priority: "low"
    },
    {
      id: 4,
      title: "Guest Lecture on Modern Survey Techniques",
      description: "Special guest lecture by Dr. Ram Kumar, Former Director of Survey of India, on 20th January 2024.",
      category: "Event",
      date: "2024-01-08",
      isNew: true,
      pdfLink: "#",
      priority: "medium"
    },
    {
      id: 5,
      title: "Fee Structure Update for 2024-25",
      description: "Revised fee structure for all courses for the academic year 2024-25. Check details in the attached PDF.",
      category: "Fee",
      date: "2024-01-12",
      isNew: true,
      pdfLink: "#",
      priority: "high"
    },
    {
      id: 6,
      title: "Winter Break Schedule",
      description: "Institute will remain closed from 25th December 2023 to 2nd January 2024 for winter break.",
      category: "Holiday",
      date: "2023-12-15",
      isNew: false,
      pdfLink: "#",
      priority: "low"
    },
    {
      id: 7,
      title: "Placement Drive by Survey of India",
      description: "Survey of India will conduct campus placement drive on 25th January 2024 for final year students.",
      category: "Placement",
      date: "2024-01-14",
      isNew: true,
      pdfLink: "#",
      priority: "high"
    },
    {
      id: 8,
      title: "Annual Sports Day 2024",
      description: "Annual sports day will be organized on 15th February 2024. All students are encouraged to participate.",
      category: "Event",
      date: "2024-01-06",
      isNew: false,
      pdfLink: "#",
      priority: "medium"
    }
  ];

  const categories = [
    { id: "all", label: "All Notices", color: "default" },
    { id: "admission", label: "Admission", color: "blue" },
    { id: "exam", label: "Examination", color: "red" },
    { id: "holiday", label: "Holiday", color: "green" },
    { id: "event", label: "Events", color: "purple" },
    { id: "fee", label: "Fee Related", color: "orange" },
    { id: "placement", label: "Placement", color: "teal" }
  ];

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "admission": return "bg-blue-100 text-blue-800 border-blue-200";
      case "exam": return "bg-red-100 text-red-800 border-red-200";
      case "holiday": return "bg-green-100 text-green-800 border-green-200";
      case "event": return "bg-purple-100 text-purple-800 border-purple-200";
      case "fee": return "bg-orange-100 text-orange-800 border-orange-200";
      case "placement": return "bg-teal-100 text-teal-800 border-teal-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high": return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "medium": return <Clock className="h-4 w-4 text-yellow-500" />;
      default: return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-elm/10 to-elm/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Notice Board
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Stay updated with the latest announcements, important dates, and institutional notices
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search notices..." 
                  className="pl-10"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 4).map((category) => (
                  <Button key={category.id} variant="outline" size="sm">
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notices List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-6">
              {notices.map((notice) => (
                <Card key={notice.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-elm">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-2">
                          {getPriorityIcon(notice.priority)}
                          <div className="flex-1">
                            <CardTitle className="text-xl text-foreground flex items-center gap-2">
                              {notice.title}
                              {notice.isNew && (
                                <Badge variant="destructive" className="text-xs">
                                  NEW
                                </Badge>
                              )}
                            </CardTitle>
                          </div>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {notice.description}
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-end gap-3">
                        <Badge 
                          variant="secondary" 
                          className={`${getCategoryColor(notice.category)} border`}
                        >
                          {notice.category}
                        </Badge>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {formatDate(notice.date)}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-3">
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Download PDF
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Notices
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-amber-200 bg-amber-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-800">
                  <AlertCircle className="h-5 w-5" />
                  Important Notice
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-amber-700 leading-relaxed">
                  All students are required to check the notice board regularly for important updates. 
                  Make sure to download and read all notices relevant to your course. For any clarifications, 
                  contact the administration office during working hours.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <div className="text-sm text-amber-600">
                    <strong>Office Hours:</strong> Monday to Saturday, 9:00 AM - 6:00 PM
                  </div>
                  <div className="text-sm text-amber-600">
                    <strong>Contact:</strong> +91 98765 43210
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Notices;