import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  FileText, 
  Calendar, 
  CheckCircle, 
  Upload, 
  CreditCard, 
  Phone,
  HelpCircle
} from "lucide-react";

const Admission = () => {
  const admissionSteps = [
    {
      step: 1,
      title: "Choose Your Course",
      description: "Select from our available courses based on your eligibility and career goals",
      icon: CheckCircle
    },
    {
      step: 2,
      title: "Fill Application Form",
      description: "Complete the online registration form with accurate personal and academic details",
      icon: FileText
    },
    {
      step: 3,
      title: "Upload Documents",
      description: "Submit required documents including certificates, ID proof, and passport photo",
      icon: Upload
    },
    {
      step: 4,
      title: "Pay Fees",
      description: "Make payment through online UPI, bank transfer, or visit our institute",
      icon: CreditCard
    },
    {
      step: 5,
      title: "Confirmation",
      description: "Receive admission confirmation and start your learning journey with us",
      icon: CheckCircle
    }
  ];

  const requiredDocuments = [
    "Passport size photograph (recent)",
    "10th class mark sheet and certificate",
    "12th class mark sheet and certificate (if applicable)",
    "Aadhar card / Voter ID / Driving license",
    "Caste certificate (if applicable)",
    "Migration certificate (if from other state)",
    "Character certificate from previous institution"
  ];

  const faqs = [
    {
      question: "What is the minimum eligibility for admission?",
      answer: "For Certificate Course: 8th Pass, For Diploma: 10th Pass, For Advanced Diploma: 12th Pass with Science/Math"
    },
    {
      question: "Is there any entrance exam?",
      answer: "No entrance exam required. Admission is based on eligibility criteria and document verification."
    },
    {
      question: "Can I pay fees in installments?",
      answer: "Yes, we offer flexible payment options. You can pay in 2-3 installments with prior arrangement."
    },
    {
      question: "What is the refund policy?",
      answer: "Fees are refundable within 7 days of admission if course is not started. 50% refund after course commencement."
    },
    {
      question: "Do you provide hostel facilities?",
      answer: "We don't have in-house hostel but can assist in finding nearby accommodation for outstation students."
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
              Admission Process
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed mb-8">
              Start your journey towards a successful career in land surveying and revenue administration
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="hero" className="bg-[#008080] text-white cursor-pointer">
                Apply Now
              </Button>
              <Button size="lg" variant="outline" className="border-none font-semibold cursor-pointer">
                Download Brochure
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Admission Schedule */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Admission Schedule 2024-25</h2>
            <p className="text-gray-400">Important dates for the current academic session</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="text-center border-[#71ebeb]">
              <CardContent className="pt-6">
                <Calendar className="h-8 w-8 text-[#008080] mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Application Start</h3>
                <p className="text-2xl font-bold text-[#008080]">15th Jan 2024</p>
              </CardContent>
            </Card>

            <Card className="text-center border-[#71ebeb]">
              <CardContent className="pt-6">
                <Calendar className="h-8 w-8 text-[#008080] mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Last Date</h3>
                <p className="text-2xl font-bold text-[#008080]">30th March 2024</p>
              </CardContent>
            </Card>

            <Card className="text-center border-[#71ebeb]">
              <CardContent className="pt-6">
                <Calendar className="h-8 w-8 text-[#008080] mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Session Starts</h3>
                <p className="text-2xl font-bold text-[#008080]">1st April 2024</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Step-by-Step Process */}
      <section className="py-16 bg-[#FBFCFC]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Admission Process</h2>
            <p className="text-gray-400">Follow these simple steps to secure your admission</p>
          </div>

          <div className="max-w-4xl mx-auto">
            {admissionSteps.map((step, index) => (
              <div key={step.step} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[#008080] text-white flex items-center justify-center font-bold text-lg">
                    {step.step}
                  </div>
                  {index < admissionSteps.length - 1 && (
                    <div className="w-0.5 h-16 bg-[#008080] mx-auto mt-4" />
                  )}
                </div>
                <Card className="flex-1 hover:shadow-lg transition-shadow border-gray-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <step.icon className="h-6 w-6 text-[#008080] mt-1" />
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-gray-400">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Required Documents</h2>
              <p className="text-gray-400 mb-8">
                Please ensure you have all the following documents ready before applying
              </p>
              
              <div className="space-y-3">
                {requiredDocuments.map((doc, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[#008080] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-400">{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* UPI Payment */}
            <div>
              <Card className="border-gray-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-[#008080]" />
                    Fee Payment Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <h3 className="font-semibold mb-4">UPI Payment (Instant)</h3>
                    <div className="w-48 h-48 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <span className="text-gray-400">QR Code</span>
                    </div>
                    <p className="text-sm text-gray-400">
                      Scan QR code or pay to: <strong>amin.institute@paytm</strong>
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold mb-2">Bank Transfer</h4>
                      <p className="text-sm text-gray-400">
                        Account: Amin Training Institute<br />
                        A/C No: 1234567890<br />
                        IFSC: SBIN0001234<br />
                        Bank: State Bank of India
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Cash Payment</h4>
                      <p className="text-sm text-gray-400">
                        Visit our institute during office hours (9 AM - 6 PM)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-[#FBFCFC]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400">Get answers to common admission queries</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-gray-300">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <HelpCircle className="h-5 w-5 text-[#008080] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">{faq.question}</h3>
                      <p className="text-gray-400">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Apply?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Don't wait! Secure your seat in our professional training programs and kickstart your career today.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="hero" className="bg-[#008080] text-white cursor-pointer">
              Start Application
            </Button>
            <Button size="lg" variant="outline" className="flex items-center gap-2 border-gray-200 cursor-pointer">
              <Phone className="h-4 w-4" />
              Call for Assistance
            </Button>
          </div>
          
          <p className="text-sm text-gray-400 mt-6">
            Need help? Call us at: <strong>+91 98765 43210</strong> | Email: <strong>admission@amintraining.com</strong>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Admission;