import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Award, Users, BookOpen } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const trustBadges = [
    { icon: Award, text: "Govt. Registered" },
    { icon: CheckCircle, text: "ISO Certified" },
    { icon: Users, text: "1000+ Students Trained" },
    { icon: BookOpen, text: "Industry Expert Faculty" },
  ];

  return (
    <section 
      className="relative min-h-[80vh] flex items-center bg-[#465251] bg-center bg-no-repeat"
    //   style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-cod-gray/70"></div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Professional 
            <span className="text-[#008A8A] block mt-2">
              Surveyor Training Institute
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
            Master the art of land surveying with our comprehensive courses. 
            Get certified, gain practical experience, and secure your career 
            with 100% placement assistance.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {trustBadges.map((badge, index) => (
              <Badge 
                key={index}
                variant="secondary" 
                className="flex items-center gap-2 px-4 py-2 bg-white/20 text-white backdrop-blur-sm border-white/30 text-sm font-medium"
              >
                <badge.icon className="w-4 h-4" />
                {badge.text}
              </Badge>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              variant="hero" 
              size="lg"
              className="px-8 py-4 text-lg bg-[#008A8A]"
            >
              Apply Now - Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-4 text-lg bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm"
            >
              Call Now: +91 98765 43210
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#008A8A]">15+</div>
              <div className="text-sm text-gray-300">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#008A8A]">1000+</div>
              <div className="text-sm text-gray-300">Students Trained</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#008A8A]">95%</div>
              <div className="text-sm text-gray-300">Placement Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#008A8A]">3</div>
              <div className="text-sm text-gray-300">Courses Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;