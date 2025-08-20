import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  TrendingUp, 
  Building2, 
  Users, 
  Star,
  MapPin,
  Calendar,
  Briefcase
} from "lucide-react";

const Placement = () => {
  const placementStats = [
    { label: "Students Placed", value: "500+", icon: Users },
    { label: "Placement Rate", value: "95%", icon: TrendingUp },
    { label: "Company Partners", value: "50+", icon: Building2 },
    { label: "Average Package", value: "₹3.5L", icon: Briefcase }
  ];

  const companies = [
    "Survey of India", "Revenue Department", "NHAI", "Railways",
    "PWD", "Urban Development", "Mining Companies", "Real Estate",
    "Construction Firms", "Consulting Companies", "Private Surveyors", "Engineering Firms"
  ];

  const successStories = [
    {
      id: 1,
      name: "Rajesh Kumar",
      course: "Diploma in Amin",
      company: "Survey of India",
      package: "₹4.2L",
      image: "/placeholder.svg",
      testimonial: "The practical training at Amin Training Institute helped me secure this government position."
    },
    {
      id: 2,
      name: "Priya Sharma",
      course: "Advanced Diploma",
      company: "NHAI",
      package: "₹3.8L",
      image: "/placeholder.svg",
      testimonial: "Great faculty and industry exposure made all the difference in my career."
    },
    {
      id: 3,
      name: "Amit Singh",
      course: "Certificate Course",
      company: "Revenue Department",
      package: "₹2.8L",
      image: "/placeholder.svg",
      testimonial: "Within 3 months of course completion, I got placed in a government department."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-[#E9F4F4] from-elm/10 to-elm/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Placement Assistance
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed">
              100% placement assistance with top government departments and private companies. 
              Your success is our commitment.
            </p>
          </div>
        </div>
      </section>

      {/* Placement Statistics */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Placement Record</h2>
            <p className="text-gray-400">Impressive numbers that speak for our quality training</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {placementStats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-[#76cccc]">
                <CardContent className="pt-8">
                  <stat.icon className="h-12 w-12 text-[#008080] mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-[#008080] mb-2">{stat.value}</h3>
                  <p className="text-gray-400">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Partners */}
      <section className="py-16 bg-[#FBFCFC]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Recruitment Partners</h2>
            <p className="text-gray-400">Leading organizations that trust our graduates</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {companies.map((company, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-gray-200">
                <CardContent className="p-4">
                  <Building2 className="h-8 w-8 text-[#008080] mx-auto mb-2" />
                  <p className="text-sm font-semibold">{company}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Success Stories</h2>
            <p className="text-gray-400">Meet our successful alumni who are making a difference</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story) => (
              <Card key={story.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-gray-200">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <img 
                      src={story.image} 
                      alt={story.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-[#aae4e4]"
                    />
                    <h3 className="text-xl font-semibold mb-1">{story.name}</h3>
                    <p className="text-sm text-gray-400 mb-2">{story.course}</p>
                    <div className="flex items-center justify-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Building2 className="h-4 w-4 text-[#008080]" />
                        <span>{story.company}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4 text-[#008080]" />
                        <span className="font-semibold text-[#008080]">{story.package}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex justify-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-[#008080] text-[#008080]" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-400 italic">
                      "{story.testimonial}"
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Placement Process */}
      <section className="py-16 bg-[#FBFCFC]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Placement Process</h2>
            <p className="text-gray-400">Step-by-step support for your career journey</p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <Card className="border-gray-300 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#008080]" />
                  Pre-Placement Activities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#008080] mt-2" />
                  <span className="text-sm">Resume building workshops</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#008080] mt-2" />
                  <span className="text-sm">Interview preparation sessions</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#008080] mt-2" />
                  <span className="text-sm">Group discussion training</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#008080] mt-2" />
                  <span className="text-sm">Aptitude test preparation</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#008080] mt-2" />
                  <span className="text-sm">Industry interaction sessions</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-300 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-[#008080]" />
                  Placement Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#008080] mt-2" />
                  <span className="text-sm">Direct company tie-ups</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#008080] mt-2" />
                  <span className="text-sm">On-campus recruitment drives</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#008080] mt-2" />
                  <span className="text-sm">Job referral assistance</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#008080] mt-2" />
                  <span className="text-sm">Government job notifications</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#008080] mt-2" />
                  <span className="text-sm">Lifetime placement support</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Placement Application Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="border-gray-200 shadow-md">
              <CardHeader>
                <CardTitle className="text-center">Apply for Placement Assistance</CardTitle>
                <p className="text-center text-gray-400">
                  Fill out this form to get personalized placement support from our team
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" placeholder="Enter your full name" className="border-gray-200" required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" placeholder="Enter email address" className="border-gray-200" required />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Mobile Number *</Label>
                    <Input id="phone" type="tel" placeholder="Enter mobile number" className="border-gray-200" required />
                  </div>
                  <div>
                    <Label htmlFor="course">Course Completed *</Label>
                    <Input id="course" placeholder="e.g., Diploma in Amin" className="border-gray-200" required />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="passout">Pass Out Year *</Label>
                    <Input id="passout" placeholder="e.g., 2024" className="border-gray-200" required />
                  </div>
                  <div>
                    <Label htmlFor="location">Preferred Location</Label>
                    <Input id="location" placeholder="e.g., Delhi, Mumbai" className="border-gray-200" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="experience">Work Experience (if any)</Label>
                  <Textarea 
                    id="experience" 
                    placeholder="Describe your work experience, if any..."
                    className="border-gray-200"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="requirements">Special Requirements</Label>
                  <Textarea 
                    id="requirements" 
                    placeholder="Any specific requirements or preferences..."
                    className="border-gray-200"
                    rows={3}
                  />
                </div>

                <Button className="w-full bg-[#008080] text-white cursor-pointer hover:bg-[#05a1a1]" variant="hero" size="lg">
                  Submit Application
                </Button>

                <p className="text-center text-sm text-gray-400">
                  Our placement team will contact you within 24 hours
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Placement;