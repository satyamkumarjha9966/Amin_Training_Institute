import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Award, Users, MapPin, Target, Eye, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-[#EBF5F5] from-elm/10 to-elm/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About Amin Training Institute
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed">
              Empowering the next generation of land surveyors and revenue officials through 
              comprehensive training and practical education since our establishment.
            </p>
          </div>
        </div>
      </section>

      {/* Institute Introduction */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Amin Training Institute has been at the forefront of providing quality education 
                in land surveying and revenue administration. Our institute was founded with the 
                vision to bridge the gap between theoretical knowledge and practical application 
                in the field of land management.
              </p>
              <p className="text-gray-400 mb-6 leading-relaxed">
                With years of experience and a commitment to excellence, we have trained hundreds 
                of professionals who are now successfully working in government departments, 
                private firms, and as independent consultants across the country.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="px-4 py-2 bg-[#F1F3F3]">Government Recognized</Badge>
                <Badge variant="secondary" className="px-4 py-2 bg-[#F1F3F3]">Industry Certified</Badge>
                <Badge variant="secondary" className="px-4 py-2 bg-[#F1F3F3]">100% Placement</Badge>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/placeholder.svg" 
                alt="Institute Building" 
                className="rounded-lg shadow-lg w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-[#FBFCFC]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-[#93e0e0] bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-[#1bc2c2]">
                  <Target className="h-6 w-6" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To provide comprehensive, practical, and industry-relevant training in land 
                  surveying and revenue administration, ensuring our students are well-equipped 
                  with both theoretical knowledge and hands-on experience to excel in their careers.
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#93e0e0] bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-[#1bc2c2]">
                  <Eye className="h-6 w-6" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To be the leading institute for land surveying and revenue administration 
                  education, recognized for our quality training, innovative teaching methods, 
                  and the professional success of our graduates.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Infrastructure Highlights</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our state-of-the-art facilities provide students with the best learning environment
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8">
                <MapPin className="h-12 w-12 text-[#1b9797] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Modern Classrooms</h3>
                <p className="text-gray-400">
                  Air-conditioned classrooms equipped with projectors and interactive boards
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8">
                <Award className="h-12 w-12 text-[#1b9797] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">GPS & Survey Tools</h3>
                <p className="text-gray-400">
                  Latest GPS equipment and surveying instruments for practical training
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8">
                <Users className="h-12 w-12 text-[#1b9797] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Computer Lab</h3>
                <p className="text-gray-400">
                  Fully equipped computer lab with surveying and mapping software
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Director's Message */}
      <section className="py-16 bg-[#FBFCFC]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-gray-200 bg-white">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  <div className="text-center">
                    <img 
                      src="/placeholder.svg" 
                      alt="Director" 
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-[#c8f7f7]"
                    />
                    <h3 className="text-xl font-semibold">Mr. Rajesh Kumar</h3>
                    <p className="text-[#179494]">Director & Founder</p>
                  </div>
                  <div className="md:col-span-2">
                    <Heart className="h-8 w-8 text-[#1b9797] mb-4" />
                    <h3 className="text-2xl font-bold mb-4">Director's Message</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      "At Amin Training Institute, we believe in nurturing talent and providing 
                      our students with the skills they need to succeed in the dynamic field of 
                      land surveying and revenue administration."
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      "Our commitment to excellence, combined with practical training and 
                      industry exposure, ensures that our graduates are ready to take on 
                      the challenges of their professional careers with confidence."
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

export default About;