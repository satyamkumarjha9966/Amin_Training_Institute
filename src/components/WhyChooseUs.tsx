import { Card, CardContent } from "@/components/ui/card";
import { 
  GraduationCap, 
  MapPin, 
  Users, 
  TrendingUp, 
  Award, 
  Clock,
  BookOpen,
  Target
} from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: GraduationCap,
      title: "Certified Faculty",
      description: "Learn from government-certified experts with 15+ years of field experience"
    },
    {
      icon: MapPin,
      title: "Practical Field Training", 
      description: "Hands-on training with real surveying equipment and live project work"
    },
    {
      icon: TrendingUp,
      title: "100% Placement Assistance",
      description: "Guaranteed job placement support with our industry partner network"
    },
    {
      icon: Award,
      title: "Affordable Fees",
      description: "Quality education at competitive fees with flexible payment options"
    },
    {
      icon: BookOpen,
      title: "Government Recognition",
      description: "All courses are recognized by relevant government authorities"
    },
    {
      icon: Target,
      title: "Modern Equipment",
      description: "Training on latest surveying instruments including GPS and digital tools"
    },
    {
      icon: Users,
      title: "Small Batch Size",
      description: "Maximum 20 students per batch for personalized attention"
    },
    {
      icon: Clock,
      title: "Flexible Timing",
      description: "Morning and evening batches available to suit your schedule"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Why Choose Our Institute?
          </h2>
          <p className="text-xl text-[#959295] max-w-3xl mx-auto">
            We are committed to providing the highest quality surveyor training 
            with practical skills that make you job-ready from day one.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-card border-border shadow-lg"
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 bg-[#e3fafa] rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-8 h-8 text-[#008080]" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#959295] text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Statistics Section */}
        <div className="mt-20 bg-[#eefcfc] rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#008080] mb-2">15+</div>
              <div className="text-foreground font-medium">Years of Excellence</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#008080] mb-2">1000+</div>
              <div className="text-foreground font-medium">Students Trained</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#008080] mb-2">95%</div>
              <div className="text-foreground font-medium">Placement Success</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#008080] mb-2">50+</div>
              <div className="text-foreground font-medium">Industry Partners</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;