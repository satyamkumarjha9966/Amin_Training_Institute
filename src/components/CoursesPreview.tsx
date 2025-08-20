import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Award, ArrowRight } from "lucide-react";

const CoursesPreview = () => {
  const courses = [
    {
      title: "Diploma in Amin / Surveyor",
      duration: "1 Year",
      mode: "Offline/Online",
      fees: "₹25,000",
      description: "Comprehensive course covering land measurement, mapping, and surveying techniques with practical training.",
      modules: ["Basic Surveying", "Chain & Compass Survey", "Theodolite Operations", "GPS Technology"],
      eligibility: "10+2 or equivalent",
      featured: true
    },
    {
      title: "Certificate Course in Amin",
      duration: "6 Months",
      mode: "Offline",
      fees: "₹15,000",
      description: "Focused training on land records, revenue systems, and administrative procedures for Amin positions.",
      modules: ["Land Records", "Revenue System", "Legal Documentation", "Field Practice"],
      eligibility: "10th Pass",
      featured: false
    },
    {
      title: "Advanced Diploma in Land Surveyor",
      duration: "1.5 Years",
      mode: "Offline",
      fees: "₹35,000",
      description: "Advanced training with modern surveying equipment, GIS mapping, and digital land management.",
      modules: ["Advanced Surveying", "GIS Mapping", "Digital Tools", "Project Management"],
      eligibility: "Diploma or Graduate",
      featured: false
    }
  ];

  return (
    <section className="py-20 bg-[#F1F3F3]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Our Professional Courses
          </h2>
          <p className="text-xl text-[#959295] max-w-3xl mx-auto">
            Choose from our industry-leading courses designed to make you job-ready 
            with practical skills and government-recognized certifications.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {courses.map((course, index) => (
            <Card 
              key={index} 
              className={`h-full bg-[#FFFFFF] transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                course.featured ? 'ring-2 ring-primary ring-offset-2' : ''
              }`}
            >
              <CardHeader className="space-y-4">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl font-bold leading-tight">
                    {course.title}
                  </CardTitle>
                  {course.featured && (
                    <Badge variant="default" className="bg-[#008080] text-white">
                      Popular
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-base">
                  {course.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Course Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#008080]" />
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#008080]" />
                    <span className="font-medium">{course.mode}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#008080]" />
                    <span className="font-medium">{course.eligibility}</span>
                  </div>
                  <div className="text-2xl font-bold text-[#008080]">
                    {course.fees}
                  </div>
                </div>

                {/* Course Modules */}
                <div>
                  <h4 className="font-semibold mb-3 text-foreground">Key Modules:</h4>
                  <div className="flex flex-wrap gap-2">
                    {course.modules.map((module, idx) => (
                      <Badge 
                        key={idx} 
                        variant="secondary" 
                        className="text-xs bg-muted text-muted-foreground"
                      >
                        {module}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={course.featured ? "default" : "outline"}
                >
                  View Details
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* View All Courses Button */}
        <div className="text-center">
          <Button variant="cta" size="lg" className="px-8 bg-[#008080] text-white">
            View All Courses & Syllabus
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CoursesPreview;