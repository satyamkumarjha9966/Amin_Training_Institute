import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Clock, Users, Award, BookOpen, IndianRupee } from "lucide-react";

const Courses = () => {
  const courses = [
    {
      id: 1,
      title: "Diploma in Amin / Surveyor",
      duration: "1 Year",
      mode: "Offline + Practical",
      eligibility: "10th Pass / 12th Pass",
      fees: "₹25,000",
      modules: [
        "Land Survey Fundamentals",
        "Revenue Laws & Procedures",
        "GPS & Modern Survey Techniques",
        "Land Records Management",
        "Field Survey Practice",
        "Computer Applications in Survey"
      ],
      certification: "Government Recognized Diploma Certificate",
      description: "Comprehensive diploma program covering all aspects of land surveying and revenue administration."
    },
    {
      id: 2,
      title: "Certificate Course in Amin",
      duration: "6 Months",
      mode: "Offline + Online Support",
      eligibility: "8th Pass / 10th Pass",
      fees: "₹15,000",
      modules: [
        "Basic Revenue Administration",
        "Land Measurement Techniques",
        "Village Revenue Records",
        "Survey Settlement Process",
        "Legal Aspects of Land",
        "Practical Field Training"
      ],
      certification: "Institute Certificate",
      description: "Focused certificate program for aspiring revenue officials and land administrators."
    },
    {
      id: 3,
      title: "Advanced Diploma in Land Surveyor",
      duration: "18 Months",
      mode: "Offline + Industry Training",
      eligibility: "12th Pass with Science/Math",
      fees: "₹35,000",
      modules: [
        "Advanced Survey Techniques",
        "GIS & Remote Sensing",
        "Engineering Survey",
        "Topographical Survey",
        "Construction Survey",
        "Survey Project Management",
        "AutoCAD & Survey Software",
        "Professional Ethics & Practice"
      ],
      certification: "Advanced Diploma + Industry Certification",
      description: "Advanced program for professional land surveyors with industry-ready skills."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-[#EBF5F5] from-elm/10 to-elm/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Courses
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed">
              Professional training programs designed to build expertise in land surveying 
              and revenue administration with hands-on practical experience.
            </p>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8">
            {courses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-gray-300">
                <CardHeader className="bg-[#EBF5F5] from-elm/5 to-elm/10">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl text-[#1f9696] mb-2">{course.title}</CardTitle>
                      <p className="text-gray-400">{course.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="flex items-center gap-1 bg-[#F1F3F3]">
                        <Clock className="h-3 w-3" />
                        {course.duration}
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1 border-gray-300">
                        <IndianRupee className="h-3 w-3" />
                        {course.fees}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Course Details */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                          <Users className="h-4 w-4 text-[#008080]" />
                          Eligibility
                        </h4>
                        <p className="text-sm text-gray-400">{course.eligibility}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-[#008080]" />
                          Course Mode
                        </h4>
                        <p className="text-sm text-gray-400">{course.mode}</p>
                      </div>
                    </div>

                    {/* Course Modules */}
                    <div className="md:col-span-2">
                      <h4 className="font-semibold text-foreground mb-3">Course Modules</h4>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {course.modules.map((module, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#008080] mt-2 flex-shrink-0" />
                            <span className="text-sm text-gray-400">{module}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Certification & CTA */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                          <Award className="h-4 w-4 text-[#008080]" />
                          Certification
                        </h4>
                        <p className="text-sm text-gray-400">{course.certification}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <Button className="w-full bg-[#008080] text-white" variant="hero">
                          Apply Now
                        </Button>
                        <Button variant="outline" className="w-full">
                          Download Syllabus
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Courses */}
      <section className="py-16 bg-[#FBFCFC]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose Our Courses?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our comprehensive training programs are designed to provide you with the skills and knowledge needed for a successful career
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow border-gray-300 bg-white">
              <CardContent className="pt-8">
                <Award className="h-12 w-12 text-[#008080] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Industry-Relevant Curriculum</h3>
                <p className="text-gray-400">
                  Updated syllabus aligned with current industry requirements and government standards
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow border-gray-300 bg-white">
              <CardContent className="pt-8">
                <Users className="h-12 w-12 text-[#008080] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Expert Faculty</h3>
                <p className="text-gray-400">
                  Learn from experienced professionals with years of field experience
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow border-gray-300 bg-white">
              <CardContent className="pt-8">
                <BookOpen className="h-12 w-12 text-[#008080] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Practical Training</h3>
                <p className="text-gray-400">
                  Hands-on experience with real-world projects and modern survey equipment
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

export default Courses;