"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail } from "lucide-react";
import instituteLogo from "@/assets/institute-logo.png";
import Link from "next/link";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Courses", href: "/courses" },
    { name: "Admission", href: "/admission" },
    { name: "Student Zone", href: "/student-zone" },
    { name: "Placement", href: "/placement" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#141617] text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4 header-left-section">
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              +91 98765 43210
            </span>
            <span className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              info@amintraininginstitute.com
            </span>
          </div>
          <div className="hidden md:block">
            <span>Govt. Registered Institute | ISO Certified</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-background shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              {/* <img 
                src={instituteLogo} 
                alt="Amin Training Institute Logo" 
                className="w-12 h-12"
              /> */}
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  Amin Training Institute
                </h1>
                <p className="text-sm text-[#B7BEC1]">
                  Professional Surveyor Training
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-[#00ACAC] transition-colors font-bold"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Button variant="outline" size="sm">
                Call Now
              </Button>
              <Button
                variant="cta"
                size="sm"
                className="bg-[#00ACAC] hover:bg-[#008A8A] hover:text-white"
              >
                <Link href="/enroll">Apply Now</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-background border-t border-border">
            <nav className="container mx-auto px-4 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-3 hover:text-[#00ACAC] hover:text-primary transition-colors font-semibold border-b border-border last:border-b-0"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex gap-3 mt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  Call Now
                </Button>
                <Button
                  variant="cta"
                  size="sm"
                  className="flex-1 bg-[#00ACAC] hover:bg-[#008A8A] hover:text-white"
                >
                  <Link href="/enroll">Apply Now</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;