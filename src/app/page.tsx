import CoursesPreview from "@/components/CoursesPreview";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Toaster />
      <Sonner />
      <Header />
      <Hero />
      <CoursesPreview />
      <WhyChooseUs />
      <Testimonials />
      <Footer />
    </div>
  );
}
