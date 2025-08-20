'use client'

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      name: "Rajesh Kumar",
      position: "Government Surveyor",
      company: "Revenue Department, Haryana",
      rating: 5,
      text: "The practical training at Amin Training Institute was exceptional. The faculty's expertise and hands-on approach helped me secure a government position within 6 months of course completion.",
      image: "👨‍💼"
    },
    {
      name: "Priya Sharma", 
      position: "Land Surveyor",
      company: "Private Construction Firm",
      rating: 5,
      text: "I was impressed by the modern equipment and real-world projects we worked on. The placement assistance team was very supportive and helped me get my dream job.",
      image: "👩‍💼"
    },
    {
      name: "Mohammed Ali",
      position: "Survey Assistant",
      company: "Municipal Corporation",
      rating: 5,
      text: "The course content is very comprehensive and up-to-date with industry standards. The teachers are experienced professionals who share practical insights from their field work.",
      image: "👨‍🔬"
    },
    {
      name: "Anjali Singh",
      position: "GIS Specialist",
      company: "Tech Mapping Solutions",
      rating: 5,
      text: "Advanced Diploma course equipped me with modern GIS skills. The institute's industry connections helped me transition into the tech sector with confidence.",
      image: "👩‍💻"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-[#F1F3F3]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            What Our Students Say
          </h2>
          <p className="text-xl text-[#959295] max-w-3xl mx-auto">
            Success stories from our alumni who are now working in prestigious 
            positions across government and private sectors.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <Card className="bg-white shadow-xl border-none">
            <CardContent className="p-8 md:p-12">
              <div className="flex items-start mb-6">
                <Quote className="w-8 h-8 text-[#008080] mr-4 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-6 italic">
                    "{testimonials[currentSlide].text}"
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-2xl">
                        {testimonials[currentSlide].image}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-lg">
                          {testimonials[currentSlide].name}
                        </h4>
                        <p className="text-[#008080] font-semibold">
                          {testimonials[currentSlide].position}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {testimonials[currentSlide].company}
                        </p>
                      </div>
                    </div>

                    {/* Rating Stars */}
                    <div className="flex gap-1">
                      {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-[#008080] text-[#008080]" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background shadow-lg hover:shadow-2xl hover:cursor-pointer hover:bg-[#008080] hover:text-white border-none"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background shadow-lg hover:shadow-xl hover:cursor-pointer hover:bg-[#008080] hover:text-white border-none"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === index ? 'bg-[#008080]' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;