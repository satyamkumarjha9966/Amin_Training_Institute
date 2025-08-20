'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  MessageSquare,
  Send,
  Navigation
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent Successfully!",
      description: "Thank you for your inquiry. We will get back to you within 24 hours.",
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      details: [
        "Amin Training Institute",
        "123, Survey Bhawan,",
        "Sector 15, Gurgaon,",
        "Haryana - 122001"
      ]
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: [
        "+91 98765 43210",
        "+91 11 2234 5678",
        "Toll Free: 1800 123 4567"
      ]
    },
    {
      icon: Mail,
      title: "Email Addresses",
      details: [
        "info@amintraining.com",
        "admission@amintraining.com",
        "placement@amintraining.com"
      ]
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: [
        "Monday - Saturday",
        "9:00 AM - 6:00 PM",
        "Sunday: Closed"
      ]
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
              Contact Us
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed">
              Get in touch with us for admissions, course information, or any other inquiries. 
              We're here to help you with your career journey.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-[#0fa7a7]">
                <CardContent className="pt-8">
                  <info.icon className="h-12 w-12 text-[#008080] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-4">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-gray-400 text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Map and Contact Form */}
      <section className="py-16 bg-[#FBFCFC]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Google Map */}
            <div>
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Navigation className="h-5 w-5 text-[#008080]" />
                    Find Us on Map
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 bg-[#E9F4F4]">
                  <div className="relative h-96 bg-muted rounded-b-lg overflow-hidden">
                    {/* Placeholder for Google Map */}
                    <div className="absolute inset-0 flex items-center justify-center bg-elm/10">
                      <div className="text-center">
                        <MapPin className="h-16 w-16 text-[#008080] mx-auto mb-4" />
                        <p className="text-lg font-semibold text-elm">Google Map</p>
                        <p className="text-gray-400">Interactive map will be embedded here</p>
                      </div>
                    </div>
                    
                    {/* Map overlay with address */}
                    <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-elm mt-0.5" />
                        <div>
                          <h4 className="font-semibold">Amin Training Institute</h4>
                          <p className="text-sm text-gray-400">
                            123, Survey Bhawan, Sector 15, Gurgaon, Haryana - 122001
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Contact */}
              <Card className="mt-6 border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-[#008080]" />
                    Quick Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="flex items-center gap-2 border-gray-200 cursor-pointer">
                      <Phone className="h-4 w-4" />
                      Call Now
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2 border-gray-200 cursor-pointer">
                      <MessageSquare className="h-4 w-4" />
                      WhatsApp
                    </Button>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-400 mb-2">
                      For immediate assistance, call us at:
                    </p>
                    <p className="text-lg font-semibold text-[#008080]">+91 98765 43210</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Send className="h-5 w-5 text-[#008080]" />
                    Send us a Message
                  </CardTitle>
                  <p className="text-gray-400">
                    Fill out the form below and we'll get back to you within 24 hours
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input id="firstName" placeholder="Enter first name" className="border-gray-200" required />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input id="lastName" placeholder="Enter last name" className="border-gray-200" required />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input id="email" type="email" placeholder="Enter email address" className="border-gray-200" required />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input id="phone" type="tel" placeholder="Enter phone number" className="border-gray-200" required />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input id="subject" placeholder="What is this regarding?" className="border-gray-200" required />
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Write your message here..."
                        className="border-gray-200"
                        rows={4}
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="course">Interested Course</Label>
                        <Input id="course" placeholder="e.g., Diploma in Amin" className="border-gray-200" />
                      </div>
                      <div>
                        <Label htmlFor="location">Your Location</Label>
                        <Input id="location" placeholder="City, State" className="border-gray-200" />
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-[#008080] text-white hover:bg-[#0eb1b1] cursor-pointer" variant="hero" size="lg">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>

                    <p className="text-center text-sm text-gray-400">
                      By submitting this form, you agree to be contacted by our team regarding your inquiry.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Directions Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="text-center">How to Reach Us</CardTitle>
                <p className="text-center text-gray-400">
                  Multiple transportation options to reach our institute
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#E9F4F4] rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🚌</span>
                    </div>
                    <h4 className="font-semibold mb-2">By Bus</h4>
                    <p className="text-sm text-gray-400">
                      Take bus route 101, 205, or 307. Get down at Survey Bhawan stop.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#E9F4F4] rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🚇</span>
                    </div>
                    <h4 className="font-semibold mb-2">By Metro</h4>
                    <p className="text-sm text-gray-400">
                      Nearest metro station: Sector City Centre. Take auto/cab for 2km.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#E9F4F4] rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🚗</span>
                    </div>
                    <h4 className="font-semibold mb-2">By Car</h4>
                    <p className="text-sm text-gray-400">
                      Take NH-8, exit at Sector 15. Parking available on premises.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;