import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Upload, CheckCircle, User, Mail, Phone, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const StudentRegistration = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    dob: "",
    gender: "",
    email: "",
    mobile: "",
    address: "",
    course: "",
    photo: null as File | null,
    idProof: null as File | null,
    marksheet: null as File | null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationId, setRegistrationId] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      const regId = `ATI${Date.now().toString().slice(-6)}`;
      setRegistrationId(regId);
      setIsSubmitting(false);
      
      toast({
        title: "Registration Successful!",
        description: `Your registration ID is ${regId}. Please save it for future reference.`,
      });
    }, 2000);
  };

  if (registrationId) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="border-elm/20">
              <CardContent className="pt-12 pb-8">
                <CheckCircle className="h-16 w-16 text-elm mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-foreground mb-4">Registration Successful!</h1>
                <p className="text-muted-foreground mb-6">
                  Your application has been submitted successfully. Please save your registration ID for future reference.
                </p>
                <div className="bg-elm/10 p-6 rounded-lg mb-6">
                  <h2 className="text-xl font-semibold mb-2">Registration ID</h2>
                  <p className="text-2xl font-bold text-elm">{registrationId}</p>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground mb-6">
                  <p>• You will receive a confirmation email shortly</p>
                  <p>• Use your Registration ID to track application status</p>
                  <p>• Admission team will contact you within 2-3 working days</p>
                </div>
                <Button 
                  onClick={() => window.location.href = "/"} 
                  variant="hero"
                  size="lg"
                >
                  Back to Home
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-elm/10 to-elm/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Student Registration
            </h1>
            <p className="text-lg text-muted-foreground">
              Fill out the form below to register for our professional training programs
            </p>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-8">
                
                {/* Personal Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-elm" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange("fullName", e.target.value)}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="fatherName">Father's Name *</Label>
                        <Input
                          id="fatherName"
                          value={formData.fatherName}
                          onChange={(e) => handleInputChange("fatherName", e.target.value)}
                          placeholder="Enter father's name"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="dob">Date of Birth *</Label>
                        <Input
                          id="dob"
                          type="date"
                          value={formData.dob}
                          onChange={(e) => handleInputChange("dob", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="gender">Gender *</Label>
                        <Select onValueChange={(value) => handleInputChange("gender", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-elm" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="Enter email address"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="mobile">Mobile Number *</Label>
                        <Input
                          id="mobile"
                          type="tel"
                          value={formData.mobile}
                          onChange={(e) => handleInputChange("mobile", e.target.value)}
                          placeholder="Enter 10-digit mobile number"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">Full Address *</Label>
                      <Textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        placeholder="Enter complete address with city, state, pincode"
                        rows={3}
                        required
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Course Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-elm" />
                      Course Selection
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <Label htmlFor="course">Choose Course *</Label>
                      <Select onValueChange={(value) => handleInputChange("course", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your course" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="diploma-amin">Diploma in Amin / Surveyor (1 Year)</SelectItem>
                          <SelectItem value="certificate-amin">Certificate Course in Amin (6 Months)</SelectItem>
                          <SelectItem value="advanced-diploma">Advanced Diploma in Land Surveyor (18 Months)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Document Upload */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="h-5 w-5 text-elm" />
                      Document Upload
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="photo">Passport Photo *</Label>
                        <Input
                          id="photo"
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange("photo", e.target.files?.[0] || null)}
                          required
                        />
                        <p className="text-xs text-muted-foreground mt-1">Max size: 2MB, JPG/PNG</p>
                      </div>
                      
                      <div>
                        <Label htmlFor="idProof">ID Proof *</Label>
                        <Input
                          id="idProof"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileChange("idProof", e.target.files?.[0] || null)}
                          required
                        />
                        <p className="text-xs text-muted-foreground mt-1">Aadhar/Voter ID/DL</p>
                      </div>
                      
                      <div>
                        <Label htmlFor="marksheet">Last Marksheet *</Label>
                        <Input
                          id="marksheet"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileChange("marksheet", e.target.files?.[0] || null)}
                          required
                        />
                        <p className="text-xs text-muted-foreground mt-1">10th/12th Marksheet</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center space-y-4">
                      <Button 
                        type="submit" 
                        size="lg" 
                        variant="hero"
                        disabled={isSubmitting}
                        className="w-full md:w-auto px-12"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Registration"}
                      </Button>
                      <p className="text-sm text-muted-foreground">
                        By submitting this form, you agree to our terms and conditions.
                        Our admission team will contact you within 2-3 working days.
                      </p>
                    </div>
                  </CardContent>
                </Card>

              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StudentRegistration;