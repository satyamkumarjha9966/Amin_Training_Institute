import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  ExternalLink 
} from "lucide-react";
import instituteLogo from "@/assets/institute-logo.png";

const Footer = () => {
  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Courses", href: "/courses" },
    { name: "Admission", href: "/admission" },
    { name: "Student Zone", href: "/student-zone" },
    { name: "Placement", href: "/placement" },
    { name: "Gallery", href: "/gallery" },
  ];

  const courses = [
    { name: "Diploma in Amin / Surveyor", href: "/courses#diploma" },
    { name: "Certificate Course in Amin", href: "/courses#certificate" },
    { name: "Advanced Diploma in Land Surveyor", href: "/courses#advanced" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", name: "Facebook" },
    { icon: Twitter, href: "#", name: "Twitter" },
    { icon: Instagram, href: "#", name: "Instagram" },
    { icon: Youtube, href: "#", name: "YouTube" },
  ];

  return (
    <footer className="bg-[#141617] text-cod-gray-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Institute Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              {/* <img 
                src={instituteLogo} 
                alt="Amin Training Institute" 
                className="w-10 h-10"
              /> */}
              <div>
                <h3 className="text-xl font-bold text-white">Amin Training Institute</h3>
                <p className="text-sm text-gray-300">Professional Surveyor Training</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Leading institute for surveyor and amin training with 15+ years of excellence. 
              Government registered with 100% placement assistance and modern training facilities.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="icon"
                  className="bg-white/10 border-white/20 text-white hover:bg-[#008080] hover:border-[#008080]"
                  asChild
                >
                  <a href={social.href} aria-label={social.name}>
                    <social.icon className="w-4 h-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-[#008080] transition-colors flex items-center gap-2"
                  >
                    <ExternalLink className="w-3 h-3" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Our Courses</h3>
            <ul className="space-y-3">
              {courses.map((course, index) => (
                <li key={index}>
                  <a 
                    href={course.href}
                    className="text-gray-300 hover:text-[#008080] transition-colors text-sm leading-relaxed"
                  >
                    {course.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#008080] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    123, Institute Complex,<br />
                    Sector-15, Gurgaon,<br />
                    Haryana - 122001
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#008080]" />
                <div>
                  <p className="text-gray-300">+91 98765 43210</p>
                  <p className="text-gray-300">+91 98765 43211</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#008080]" />
                <p className="text-gray-300">info@amintraininginstitute.com</p>
              </div>
            </div>

            {/* Quick Contact Button */}
            <Button variant="cta" className="w-full mt-6 bg-[#00AEAE] cursor-pointer text-white">
              <Phone className="w-4 h-4 mr-2" />
              Call Now for Admission
            </Button>
          </div>
        </div>
      </div>

      <Separator className="bg-white/10" />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-gray-300 text-sm">
              © 2024 Amin Training Institute. All rights reserved.
            </p>
          </div>
          <div className="flex gap-6 text-sm">
            <a href="/privacy" className="text-gray-300 hover:text-[#008080] transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-gray-300 hover:text-[#008080] transition-colors">
              Terms of Use
            </a>
            <a href="/sitemap" className="text-gray-300 hover:text-[#008080] transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;