'use client'

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  BookOpen, 
  Download, 
  Search, 
  Award, 
  FileText, 
  GraduationCap,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const StudentZone = () => {
  const { toast } = useToast();
  const [admitCardForm, setAdmitCardForm] = useState({ regNo: "", email: "" });
  const [resultForm, setResultForm] = useState({ course: "", session: "" });
  const [certificateForm, setCertificateForm] = useState({ regNo: "", dob: "" });

  const handleAdmitCardDownload = () => {
    if (!admitCardForm.regNo || !admitCardForm.email) {
      toast({
        title: "Missing Information",
        description: "Please enter both Registration Number and Email",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Admit Card Found",
      description: "Your admit card is ready for download",
    });
  };

  const handleResultDownload = () => {
    if (!resultForm.course || !resultForm.session) {
      toast({
        title: "Missing Information", 
        description: "Please select both Course and Session",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Result Available",
      description: "Your result is ready for download",
    });
  };

  const handleCertificateDownload = () => {
    if (!certificateForm.regNo || !certificateForm.dob) {
      toast({
        title: "Missing Information",
        description: "Please enter both Registration Number and Date of Birth",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Certificate Verified",
      description: "Your certificate is ready for download",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-[#E9F4F4] from-elm/10 to-elm/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Student Zone
            </h1>
            <p className="text-lg text-gray-400">
              Access your academic information, download documents, and track your progress
            </p>
          </div>
        </div>
      </section>

      {/* Student Zone Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="admission" className="w-full">
              <TabsList className="grid w-full bg-[#F4F5F6] grid-cols-4">
                <TabsTrigger value="admission" className="flex items-center gap-2 cursor-pointer">
                  <BookOpen className="h-2 w-2 md:h-4 md:w-4 lg:h-4 lg:w-4 xl:h-4 xl:w-4" />
                  Admission Info
                </TabsTrigger>
                <TabsTrigger value="admit-card" className="flex items-center gap-2 cursor-pointer">
                  <FileText className="h-2 w-2 md:h-4 md:w-4 lg:h-4 lg:w-4 xl:h-4 xl:w-4" />
                  Admit Card
                </TabsTrigger>
                <TabsTrigger value="result" className="flex items-center gap-2 cursor-pointer">
                  <GraduationCap className="h-2 w-2 md:h-4 md:w-4 lg:h-4 lg:w-4 xl:h-4 xl:w-4" />
                  Result
                </TabsTrigger>
                <TabsTrigger value="certificate" className="flex items-center gap-2 cursor-pointer">
                  <Award className="h-2 w-2 md:h-4 md:w-4 lg:h-4 lg:w-4 xl:h-4 xl:w-4" />
                  Certificate
                </TabsTrigger>
              </TabsList>

              {/* Admission Info Tab */}
              <TabsContent value="admission" className="mt-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-[#008080]" />
                        Admission Guidelines
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-[#008080] mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold">Orientation Program</h4>
                            <p className="text-sm text-gray-400">
                              Mandatory orientation on first day of class
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-[#008080] mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold">Class Timings</h4>
                            <p className="text-sm text-gray-400">
                              Morning: 9:00 AM - 1:00 PM | Evening: 2:00 PM - 6:00 PM
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-[#008080] mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold">Attendance Policy</h4>
                            <p className="text-sm text-gray-400">
                              Minimum 75% attendance required for certification
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-[#008080] mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold">Study Materials</h4>
                            <p className="text-sm text-gray-400">
                              All course materials and equipment provided by institute
                            </p>
                          </div>
                        </div>
                      </div>
                      <Button className="w-full border-gray-200" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download Complete Guide (PDF)
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>New Student Checklist</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-[#dbfafa] flex items-center justify-center">
                            <CheckCircle className="h-4 w-4 text-[#008080]" />
                          </div>
                          <span className="text-sm">Complete fee payment</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-[#dbfafa] flex items-center justify-center">
                            <CheckCircle className="h-4 w-4 text-[#008080]" />
                          </div>
                          <span className="text-sm">Submit original documents</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-xs">3</span>
                          </div>
                          <span className="text-sm text-gray-400">Collect student ID card</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-xs">4</span>
                          </div>
                          <span className="text-sm text-gray-400">Attend orientation program</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-xs">5</span>
                          </div>
                          <span className="text-sm text-gray-400">Join WhatsApp group</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Admit Card Tab */}
              <TabsContent value="admit-card" className="mt-8">
                <Card className="max-w-2xl mx-auto">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-[#008080]" />
                      Download Admit Card
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="regNo">Registration Number</Label>
                        <Input
                          id="regNo"
                          value={admitCardForm.regNo}
                          onChange={(e) => setAdmitCardForm(prev => ({ ...prev, regNo: e.target.value }))}
                          placeholder="Enter registration number"
                          className="border-gray-200"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={admitCardForm.email}
                          onChange={(e) => setAdmitCardForm(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="Enter email address"
                          className="border-gray-200"
                        />
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleAdmitCardDownload}
                      className="w-full bg-[#008080] text-white"
                      variant="hero"
                    >
                      <Search className="h-4 w-4 mr-2" />
                      Search & Download Admit Card
                    </Button>

                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-[#008080] mt-0.5" />
                        <div className="text-sm">
                          <p className="font-semibold mb-1">Important Instructions:</p>
                          <ul className="list-disc list-inside space-y-1 text-gray-400">
                            <li>Enter exact registration number as provided during admission</li>
                            <li>Use the same email ID used during registration</li>
                            <li>Print admit card on A4 size paper</li>
                            <li>Bring admit card and photo ID on exam day</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Result Tab */}
              <TabsContent value="result" className="mt-8">
                <Card className="max-w-2xl mx-auto">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-[#008080]" />
                      Download Result
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="course">Select Course</Label>
                        <Select onValueChange={(value) => setResultForm(prev => ({ ...prev, course: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose your course" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="diploma-amin">Diploma in Amin / Surveyor</SelectItem>
                            <SelectItem value="certificate-amin">Certificate Course in Amin</SelectItem>
                            <SelectItem value="advanced-diploma">Advanced Diploma in Land Surveyor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="session">Select Session</Label>
                        <Select onValueChange={(value) => setResultForm(prev => ({ ...prev, session: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose session" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2024-jan">January 2024</SelectItem>
                            <SelectItem value="2024-apr">April 2024</SelectItem>
                            <SelectItem value="2024-jul">July 2024</SelectItem>
                            <SelectItem value="2024-oct">October 2024</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleResultDownload}
                      className="w-full bg-[#008080] text-white"
                      variant="hero"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      View & Download Result
                    </Button>

                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-[#008080] mt-0.5" />
                        <div className="text-sm">
                          <p className="font-semibold mb-1">Result Information:</p>
                          <ul className="list-disc list-inside space-y-1 text-gray-400">
                            <li>Results are published session-wise</li>
                            <li>Minimum 40% marks required to pass</li>
                            <li>Detailed mark sheet available for download</li>
                            <li>For any discrepancy, contact within 7 days</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Certificate Tab */}
              <TabsContent value="certificate" className="mt-8">
                <Card className="max-w-2xl mx-auto">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-[#008080]" />
                      Download Certificate
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="certRegNo">Registration Number</Label>
                        <Input
                          id="certRegNo"
                          value={certificateForm.regNo}
                          onChange={(e) => setCertificateForm(prev => ({ ...prev, regNo: e.target.value }))}
                          placeholder="Enter registration number"
                          className="border-gray-200"
                        />
                      </div>
                      <div>
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input
                          id="dob"
                          type="date"
                          value={certificateForm.dob}
                          onChange={(e) => setCertificateForm(prev => ({ ...prev, dob: e.target.value }))}
                          className="border-gray-200"
                        />
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleCertificateDownload}
                      className="w-full bg-[#008080] text-white"
                      variant="hero"
                    >
                      <Award className="h-4 w-4 mr-2" />
                      Verify & Download Certificate
                    </Button>

                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-[#008080] mt-0.5" />
                        <div className="text-sm">
                          <p className="font-semibold mb-1">Certificate Guidelines:</p>
                          <ul className="list-disc list-inside space-y-1 text-gray-400">
                            <li>Certificates issued only after course completion</li>
                            <li>Minimum attendance and passing marks required</li>
                            <li>Digital certificates are verifiable online</li>
                            <li>Physical certificates available on request</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StudentZone;