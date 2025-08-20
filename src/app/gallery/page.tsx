'use client'

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Camera, X, ChevronLeft, ChevronRight } from "lucide-react";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const categories = [
    { id: "all", label: "All Photos", count: 24 },
    { id: "campus", label: "Campus Life", count: 8 },
    { id: "survey", label: "Survey Practice", count: 10 },
    { id: "events", label: "Events", count: 6 }
  ];

  const galleryImages = [
    { id: 1, category: "campus", title: "Modern Classroom", description: "Air-conditioned classroom with latest teaching aids", image: "/placeholder.svg" },
    { id: 2, category: "survey", title: "GPS Training", description: "Students learning GPS survey techniques", image: "/placeholder.svg" },
    { id: 3, category: "events", title: "Annual Function", description: "Certificate distribution ceremony", image: "/placeholder.svg" },
    { id: 4, category: "campus", title: "Computer Lab", description: "Students working with survey software", image: "/placeholder.svg" },
    { id: 5, category: "survey", title: "Field Survey", description: "Practical field training session", image: "/placeholder.svg" },
    { id: 6, category: "events", title: "Guest Lecture", description: "Industry expert sharing insights", image: "/placeholder.svg" },
    { id: 7, category: "survey", title: "Total Station", description: "Learning advanced survey instruments", image: "/placeholder.svg" },
    { id: 8, category: "campus", title: "Library", description: "Well-equipped library with reference books", image: "/placeholder.svg" },
    { id: 9, category: "events", title: "Cultural Program", description: "Students celebrating festivals", image: "/placeholder.svg" },
    { id: 10, category: "survey", title: "Land Measurement", description: "Practical land measurement training", image: "/placeholder.svg" },
    { id: 11, category: "campus", title: "Faculty Room", description: "Experienced faculty members", image: "/placeholder.svg" },
    { id: 12, category: "survey", title: "Survey Equipment", description: "Latest surveying instruments", image: "/placeholder.svg" },
    { id: 13, category: "events", title: "Placement Drive", description: "Companies visiting for recruitment", image: "/placeholder.svg" },
    { id: 14, category: "campus", title: "Reception Area", description: "Institute reception and inquiry desk", image: "/placeholder.svg" },
    { id: 15, category: "survey", title: "Theodolite Training", description: "Students using theodolite instruments", image: "/placeholder.svg" },
    { id: 16, category: "events", title: "Sports Day", description: "Annual sports competition", image: "/placeholder.svg" },
    { id: 17, category: "campus", title: "Seminar Hall", description: "Large seminar hall for events", image: "/placeholder.svg" },
    { id: 18, category: "survey", title: "Chain Survey", description: "Traditional chain survey methods", image: "/placeholder.svg" },
    { id: 19, category: "events", title: "Workshop", description: "Technical workshop session", image: "/placeholder.svg" },
    { id: 20, category: "campus", title: "Cafeteria", description: "Student cafeteria and break area", image: "/placeholder.svg" },
    { id: 21, category: "survey", title: "Compass Survey", description: "Learning compass survey techniques", image: "/placeholder.svg" },
    { id: 22, category: "events", title: "Alumni Meet", description: "Successful alumni sharing experiences", image: "/placeholder.svg" },
    { id: 23, category: "campus", title: "Director's Office", description: "Institute director's office", image: "/placeholder.svg" },
    { id: 24, category: "survey", title: "Plane Table Survey", description: "Traditional plane table survey methods", image: "/placeholder.svg" }
  ];

  const filteredImages = activeFilter === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const newIndex = direction === 'prev' 
      ? (selectedImage - 1 + filteredImages.length) % filteredImages.length
      : (selectedImage + 1) % filteredImages.length;
    
    setSelectedImage(newIndex);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-[#E9F4F4] from-elm/10 to-elm/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Photo Gallery
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed">
              Take a visual journey through our institute - from modern classrooms to practical 
              field training sessions and memorable events.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className="flex items-center gap-2 border-gray-200"
                style={{backgroundColor: activeFilter === category.id ? "#008080" : "white"}}
              >
                <Camera className="h-4 w-4" />
                {category.label}
                <Badge className="ml-1" style={{backgroundColor: activeFilter === category.id ? "white" : "#EAEAEA"}}>
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <Card 
                key={image.id} 
                className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border-gray-300"
                onClick={() => openLightbox(index)}
              >
                <div className="relative">
                  <img 
                    src={image.image} 
                    alt={image.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <Camera className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-2">{image.title}</h3>
                  <p className="text-sm text-gray-400">{image.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-6xl max-h-full">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white"
              onClick={closeLightbox}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white"
              onClick={() => navigateLightbox('prev')}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white"
              onClick={() => navigateLightbox('next')}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Image */}
            <img 
              src={filteredImages[selectedImage].image}
              alt={filteredImages[selectedImage].title}
              className="max-w-full max-h-[80vh] object-contain"
            />

            {/* Image Info */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">{filteredImages[selectedImage].title}</h3>
              <p className="text-gray-300">{filteredImages[selectedImage].description}</p>
              <div className="flex items-center justify-between mt-2">
                <Badge variant="secondary">
                  {categories.find(cat => cat.id === filteredImages[selectedImage].category)?.label}
                </Badge>
                <span className="text-sm text-gray-400">
                  {selectedImage + 1} of {filteredImages.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;