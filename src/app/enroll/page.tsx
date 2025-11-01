"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import {
  Upload,
  FileText,
  User,
  GraduationCap,
  CreditCard,
  CheckCircle,
  MessageCircle,
  ArrowLeft,
  ArrowRight,
  Download,
  Share2,
  Check,
} from "lucide-react";
import { useRouter } from "next/navigation";

const enrollmentSchema = z.object({
  // Personal Details
  userId: z.string().optional(), // will be set in backend
  fullName: z.string().min(2, "Full name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select gender",
  }),
  mobileNumber: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
  email: z.string().email("Please enter a valid email address"),
  parentName: z.string().min(2, "Parent name is required"),
  permanentAddress: z.string().min(10, "Please enter complete address"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(1, "Please select state"),
  pinCode: z.string().regex(/^\d{6}$/, "Please enter a valid 6-digit PIN code"),

  // Identification Details
  aadhaarNumber: z
    .string()
    .regex(/^\d{12}$/, "Please enter a valid 12-digit Aadhaar number"),
  panNumber: z.string().optional(),

  // Education Details
  highestQualification: z.string().min(1, "Please select qualification"),
  institutionName: z.string().min(2, "Institution name is required"),
  yearOfPassing: z.string().min(1, "Year of passing is required"),

  // Course Selection
  selectedCourse: z.string().min(1, "Please select a course"),
  learningMode: z.enum(["online", "offline"], {
    required_error: "Please select learning mode",
  }),
  batchTime: z.string().min(1, "Please select batch time"),
  hearAboutUs: z.string().min(1, "Please tell us how you heard about us"),

  // Payment Details
  paymentMode: z.string().min(1, "Please select payment mode"),
  transactionId: z.string().min(1, "Transaction ID is required"),

  // Declarations
  infoDeclaration: z
    .boolean()
    .refine((val) => val === true, "Please confirm the declaration"),
  termsAccepted: z
    .boolean()
    .refine((val) => val === true, "Please accept terms and conditions"),
});

type EnrollmentFormData = z.infer<typeof enrollmentSchema>;

// Step configuration
const steps = [
  {
    id: 1,
    title: "Personal Details",
    icon: User,
    description: "Basic information about you",
  },
  {
    id: 2,
    title: "Identification",
    icon: FileText,
    description: "Upload your documents",
  },
  {
    id: 3,
    title: "Education",
    icon: GraduationCap,
    description: "Academic background",
  },
  {
    id: 4,
    title: "Course Selection",
    icon: CheckCircle,
    description: "Choose your program",
  },
  { id: 5, title: "Payment", icon: CreditCard, description: "Payment details" },
  {
    id: 6,
    title: "Declaration",
    icon: Check,
    description: "Terms and confirmation",
  },
];

const Enroll = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{
    [key: string]: File | null;
  }>({
    aadhaarCard: null,
    photograph: null,
    signature: null,
    marksheet: null,
    paymentReceipt: null,
  });

  // show server-known file names/urls for preview when fetching existing data
  const [uploadedFileNames, setUploadedFileNames] = useState<{
    [key: string]: string | null;
  }>({
    aadhaarCard: null,
    photograph: null,
    signature: null,
    marksheet: null,
    paymentReceipt: null,
  });

  // Use a sample userId like the application form does. Replace with auth when available.
  const userId = "64b05344e7f1907f34c25153";

  // SEO setup
  useEffect(() => {
    document.title =
      "Enroll in Government Certified Amin & Surveyor Courses - Amin Training Institute";

    // Create meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Join top industry-recognized courses with expert guidance, online & offline options, and 100% placement support. Apply now!"
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content =
        "Join top industry-recognized courses with expert guidance, online & offline options, and 100% placement support. Apply now!";
      document.head.appendChild(meta);
    }

    // Create canonical link
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute("href", `${window.location.origin}/enroll`);
    } else {
      const link = document.createElement("link");
      link.rel = "canonical";
      link.href = `${window.location.origin}/enroll`;
      document.head.appendChild(link);
    }
  }, []);

  // Prefill from server if user has saved enrollment
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/enroll/me/${userId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) {
          setLoading(false);
          return;
        }
        const data = await res.json();
        if (data?.enrollment) {
          // merge into form values (keys must match schema)
          form.reset(data.enrollment);

          // populate step
          if (data.enrollment.currentStep) {
            setCurrentStep(data.enrollment.currentStep);
          }

          // if server returns file names/urls, show them as previews
          setUploadedFileNames((prev) => ({ ...prev, ...data.enrollment }));
        }
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    })();
  }, []);

  const form = useForm<EnrollmentFormData>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: {
      gender: undefined,
      learningMode: undefined,
      infoDeclaration: false,
      termsAccepted: false,
    },
  });

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const courses = [
    "Diploma in Amin / Surveyor",
    "Certificate Course in Amin",
    "Advanced Diploma in Land Surveyor",
    "GST Certification Course",
    "Labour Law Certification",
    "Accounting & Taxation",
  ];

  const handleFileUpload = (fieldName: string, file: File | null) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [fieldName]: file,
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateCurrentStep = async () => {
    const fieldsToValidate: { [key: number]: (keyof EnrollmentFormData)[] } = {
      1: [
        "fullName",
        "dateOfBirth",
        "gender",
        "mobileNumber",
        "email",
        "parentName",
        "permanentAddress",
        "city",
        "state",
        "pinCode",
      ],
      2: ["aadhaarNumber"],
      3: ["highestQualification", "institutionName", "yearOfPassing"],
      4: ["selectedCourse", "learningMode", "batchTime", "hearAboutUs"],
      5: ["paymentMode", "transactionId"],
      6: ["infoDeclaration", "termsAccepted"],
    };

    const fields = fieldsToValidate[currentStep] || [];
    const isValid = await form.trigger(fields);

    if (isValid) {
      // save this step to server (per-step save)
      try {
           setLoading(true);
           const values = form.getValues();
           await saveStep(currentStep, values);
           nextStep();
      } catch (err: any) {
        alert(err?.message || "Failed to save step. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  // ...imports unchanged
  // add this helper (serialize + files)
  function buildFormData(
    data: EnrollmentFormData,
    files: Record<string, File | null>
  ) {
    const fd = new FormData();
    Object.entries(data).forEach(([k, v]) => {
      // z.boolean() come as booleans; send strings to keep things simple
      fd.append(k, typeof v === "boolean" ? String(v) : String(v ?? ""));
    });

    // append files if present
    Object.entries(files).forEach(([k, f]) => {
      if (f) fd.append(k, f, f.name);
    });

    return fd;
  }

  // Save a single step to the server. Sends FormData if files present for that step,
  // otherwise sends JSON. Includes userId.
  async function saveStep(step: number, allValues: EnrollmentFormData) {
    let payload: any = { userId };

    switch (step) {
      case 1:
        payload = {
          userId,
          ...pick(allValues, [
            "fullName",
            "dateOfBirth",
            "gender",
            "mobileNumber",
            "email",
            "parentName",
            "permanentAddress",
            "city",
            "state",
            "pinCode",
          ]),
        };
        break;
      case 2:
        payload = {
          userId,
          ...pick(allValues, ["aadhaarNumber", "panNumber"]),
        };
        break;
      case 3:
        payload = {
          userId,
          ...pick(allValues, [
            "highestQualification",
            "institutionName",
            "yearOfPassing",
          ]),
        };
        break;
      case 4:
        payload = {
          userId,
          ...pick(allValues, [
            "selectedCourse",
            "learningMode",
            "batchTime",
            "hearAboutUs",
          ]),
        };
        break;
      case 5:
        payload = {
          userId,
          ...pick(allValues, ["paymentMode", "transactionId"]),
        };
        break;
      case 6:
        payload = {
          userId,
          ...pick(allValues, ["infoDeclaration", "termsAccepted"]),
        };
        break;
      default:
        payload = { userId };
    }

    // Determine if there are files for this step
    const filesForStep: string[] =
      step === 2
        ? ["aadhaarCard", "photograph", "signature"]
        : step === 3
        ? ["marksheet"]
        : step === 5
        ? ["paymentReceipt"]
        : [];

    const hasFile = filesForStep.some((k) => !!uploadedFiles[k]);

    if (hasFile) {
      // build FormData with only relevant payload keys + all files
      const fd = new FormData();
      Object.entries(payload).forEach(([k, v]) =>
        fd.append(k, String(v ?? ""))
      );
      filesForStep.forEach((k) => {
        const f = uploadedFiles[k];
        if (f) fd.append(k, f, f.name);
      });

      const res = await fetch(`/api/enroll/step${step}`, {
        method: "POST",
        body: fd,
      });
      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(txt || "Failed to save step");
      }
    } else {
      const res = await fetch(`/api/enroll/step${step}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || "Failed to save step");
      }
    }
  }

  // small utility to pick keys from an object
  function pick<T extends Record<string, any>>(obj: T, keys: string[]) {
    const out: Partial<T> = {};
    keys.forEach((k) => {
      if (k in obj) out[k as keyof T] = obj[k as keyof T];
    });
    return out;
  }

  // in your component Enroll:
  const onSubmit = async (data: EnrollmentFormData) => {
    try {
      const fd = buildFormData(data, uploadedFiles);
      fd.append("userId", userId);

      const res = await fetch("/api/enroll", {
        method: "POST",
        body: fd, // multipart/form-data automatically set by the browser
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || "Failed to submit application");
      }

      setShowSuccessModal(true);
      toast({
        title: "Enrollment Submitted Successfully!",
        description: "We will contact you shortly with further details.",
      });

      // optionally reset
      form.reset();
      setUploadedFiles({
        aadhaarCard: null,
        photograph: null,
        signature: null,
        marksheet: null,
        paymentReceipt: null,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error?.message || "Failed to submit application. Please try again.",
        variant: "destructive",
      });
      alert("Error in applying!!");
    }
  };

  const onSubmitFinal = async (allValues: EnrollmentFormData) => {
    let payload: any = { userId };
    payload = {
      userId,
      ...pick(allValues, ["infoDeclaration", "termsAccepted"]),
    };
    const res = await fetch(`/api/enroll/step6`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || "Failed to save step");
      } else {
        setShowSuccessModal(true);
       // optionally reset
       form.reset();
       setUploadedFiles({
         aadhaarCard: null,
         photograph: null,
         signature: null,
         marksheet: null,
         paymentReceipt: null,
       });
       router.push("/");
       toast({
         title: "Enrollment Submitted Successfully!",
         description: "We will contact you shortly with further details.",
       }); 
      }
  };

  // const onSubmit = async (data: EnrollmentFormData) => {
  //   try {
  //     // Here you would typically send the data to your backend
  //     console.log("Form data:", data);
  //     console.log("Uploaded files:", uploadedFiles);

  //     // Simulate API call
  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     setShowSuccessModal(true);
  //     toast({
  //       title: "Application Submitted Successfully!",
  //       description: "We will contact you shortly with further details.",
  //     });
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "Failed to submit application. Please try again.",
  //       variant: "destructive",
  //     });
  //   }
  // };

  const handleWhatsAppShare = () => {
    const message =
      "I have successfully enrolled in Amin Training Institute! 🎓";
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleDownloadPDF = () => {
    // Implement PDF download logic here
    toast({
      title: "PDF Generated",
      description: "Your enrollment confirmation has been downloaded.",
    });
  };

  const FileUploadField = ({
    fieldName,
    label,
    accept = "image/jpeg,image/png,application/pdf",
    showPreview = false,
  }: {
    fieldName: string;
    label: string;
    accept?: string;
    showPreview?: boolean;
  }) => (
    <div className="space-y-2">
      <label className="text-base font-medium text-foreground">{label}</label>
      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-[#B99671]/50 transition-colors">
        <input
          type="file"
          accept={accept}
          onChange={(e) =>
            handleFileUpload(fieldName, e.target.files?.[0] || null)
          }
          className="hidden"
          id={fieldName}
        />
        <label htmlFor={fieldName} className="cursor-pointer">
          <Upload className="mx-auto h-10 w-10 text-[#B99671] mb-3" />
          <p className="text-base text-foreground font-medium">
            {uploadedFiles[fieldName]?.name ||
              uploadedFileNames[fieldName] ||
              "Click to upload or drag and drop"}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            JPG, PNG or PDF (Max 5MB)
          </p>
        </label>
      </div>
      {showPreview &&
        uploadedFiles[fieldName] &&
        uploadedFiles[fieldName]?.type.startsWith("image/") && (
          <div className="mt-3 flex justify-center">
            <img
              src={URL.createObjectURL(uploadedFiles[fieldName]!)}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg border-2 border-[#B99671]/20"
            />
          </div>
        )}
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-[#B99671]/10 to-transparent">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="w-10 h-10 rounded-full bg-[#B99671] flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                Personal Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        Full Name *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your full name"
                          className="h-12 text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        Date of Birth *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          className="h-12 text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      Gender *
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex gap-8 mt-3"
                      >
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem
                            value="male"
                            id="male"
                            className="w-5 h-5"
                          />
                          <label
                            htmlFor="male"
                            className="text-base cursor-pointer"
                          >
                            Male
                          </label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem
                            value="female"
                            id="female"
                            className="w-5 h-5"
                          />
                          <label
                            htmlFor="female"
                            className="text-base cursor-pointer"
                          >
                            Female
                          </label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem
                            value="other"
                            id="other"
                            className="w-5 h-5"
                          />
                          <label
                            htmlFor="other"
                            className="text-base cursor-pointer"
                          >
                            Other
                          </label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="mobileNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        Mobile Number *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="10-digit mobile number"
                          className="h-12 text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        Email Address *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your.email@example.com"
                          className="h-12 text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="parentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      Father's / Mother's Name *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter parent's name"
                        className="h-12 text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="permanentAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      Permanent Address *
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter complete address"
                        className="min-h-[100px] text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        City / District *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter city"
                          className="h-12 text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        State *
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 text-base">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {indianStates.map((state) => (
                            <SelectItem
                              key={state}
                              value={state.toLowerCase().replace(/\s+/g, "-")}
                            >
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pinCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        PIN Code *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="6-digit PIN"
                          className="h-12 text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-[#B99671]/10 to-transparent">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="w-10 h-10 rounded-full bg-[#B99671] flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                Identification Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="aadhaarNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        Aadhaar Number *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="12-digit Aadhaar number"
                          className="h-12 text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="panNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        PAN Card Number (Optional)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ABCDE1234F"
                          className="h-12 text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FileUploadField
                  fieldName="aadhaarCard"
                  label="Upload Aadhaar Card *"
                />
                <FileUploadField
                  fieldName="photograph"
                  label="Upload Passport-size Photograph *"
                  showPreview={true}
                />
              </div>

              <FileUploadField
                fieldName="signature"
                label="Upload Signature (Optional)"
                showPreview={true}
              />
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-[#B99671]/10 to-transparent">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="w-10 h-10 rounded-full bg-[#B99671] flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                Education Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="highestQualification"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        Highest Qualification *
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 text-base">
                            <SelectValue placeholder="Select qualification" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[
                            "10th",
                            "12th",
                            "Diploma",
                            "Graduation",
                            "Post Graduation",
                            "PhD",
                          ].map((qual) => (
                            <SelectItem key={qual} value={qual.toLowerCase()}>
                              {qual}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="yearOfPassing"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        Year of Passing *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="YYYY"
                          min="1950"
                          max="2024"
                          className="h-12 text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="institutionName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      Name of Institution *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter institution name"
                        className="h-12 text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FileUploadField
                fieldName="marksheet"
                label="Upload Marksheets or Certificate *"
              />
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-[#B99671]/10 to-transparent">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="w-10 h-10 rounded-full bg-[#B99671] flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                Course Selection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              <FormField
                control={form.control}
                name="selectedCourse"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      Select Course *
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 text-base">
                          <SelectValue placeholder="Choose your course" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem
                            key={course}
                            value={course.toLowerCase().replace(/\s+/g, "-")}
                          >
                            {course}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="learningMode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        Mode of Learning *
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex gap-8 mt-3"
                        >
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem
                              value="online"
                              id="online"
                              className="w-5 h-5"
                            />
                            <label
                              htmlFor="online"
                              className="text-base cursor-pointer"
                            >
                              Online
                            </label>
                          </div>
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem
                              value="offline"
                              id="offline"
                              className="w-5 h-5"
                            />
                            <label
                              htmlFor="offline"
                              className="text-base cursor-pointer"
                            >
                              Offline
                            </label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="batchTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        Preferred Batch Time *
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 text-base">
                            <SelectValue placeholder="Select timing" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="morning">
                            Morning (9:00 AM - 12:00 PM)
                          </SelectItem>
                          <SelectItem value="afternoon">
                            Afternoon (1:00 PM - 4:00 PM)
                          </SelectItem>
                          <SelectItem value="evening">
                            Evening (5:00 PM - 8:00 PM)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="hearAboutUs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      How did you hear about us? *
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 text-base">
                          <SelectValue placeholder="Select source" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="google">Google Search</SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="friend">Friend/Family</SelectItem>
                        <SelectItem value="newspaper">Newspaper</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-[#B99671]/10 to-transparent">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="w-10 h-10 rounded-full bg-[#B99671] flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="paymentMode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        Payment Mode *
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 text-base">
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="upi">UPI</SelectItem>
                          <SelectItem value="bank-transfer">
                            Bank Transfer
                          </SelectItem>
                          <SelectItem value="cash">Cash</SelectItem>
                          <SelectItem value="online">Online Gateway</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="transactionId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">
                        Transaction ID / Reference Number *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter transaction ID"
                          className="h-12 text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FileUploadField
                fieldName="paymentReceipt"
                label="Upload Payment Screenshot / Receipt *"
              />

              <div className="bg-[#B99671]/10 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <CheckCircle className="inline w-4 h-4 mr-2 text-[#B99671]" />
                  Please ensure you have paid the course fee before submitting
                  this form.
                </p>
              </div>
            </CardContent>
          </Card>
        );

      case 6:
        return (
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-[#B99671]/10 to-transparent">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="w-10 h-10 rounded-full bg-[#B99671] flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                Declarations & Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="infoDeclaration"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-1"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-base font-medium">
                          Information Declaration *
                        </FormLabel>
                        <p className="text-sm text-muted-foreground">
                          I declare that the information provided above is true
                          to the best of my knowledge and I understand that any
                          false information may result in the cancellation of my
                          enrollment.
                        </p>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="termsAccepted"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-1"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-base font-medium">
                          Terms and Conditions *
                        </FormLabel>
                        <p className="text-sm text-muted-foreground">
                          I agree to the terms and conditions of enrollment and
                          understand the course structure, fees, and policies of
                          Amin Training Institute.
                        </p>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">
                  Ready to Submit
                </h4>
                <p className="text-sm text-green-700">
                  Please review all the information you've provided before
                  submitting your enrollment application.
                </p>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary text-primary-glow py-12">
        <div className="container mx-auto px-4 text-white">
          <h1 className="text-4xl font-bold text-center mb-4">
            Enroll in Government Certified Courses
          </h1>
          <p className="text-xl text-center opacity-90">
            Amin & Surveyor Programs with 100% Placement Support
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Badge
              variant="secondary"
              className="px-4 py-2 bg-white/20 text-white border-white/30"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              100% Placement Assistance
            </Badge>
            <Badge
              variant="secondary"
              className="px-4 py-2 bg-white/20 text-white border-white/30"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Govt. Certified
            </Badge>
            <Badge
              variant="secondary"
              className="px-4 py-2 bg-white/20 text-white border-white/30"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              ISO Approved
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center mb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`
                    flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
                    ${
                      currentStep >= step.id
                        ? "bg-[#B99671] border-[#B99671] text-white"
                        : "border-muted-foreground/30 text-muted-foreground"
                    }
                  `}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`
                      w-5 md:w-20 h-0.5 transition-all duration-300
                      ${
                        currentStep > step.id
                          ? "bg-[#B99671]"
                          : "bg-muted-foreground/30"
                      }
                    `}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <Progress
                value={(currentStep / steps.length) * 100}
                className="h-2"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>
                  Step {currentStep} of {steps.length}
                </span>
                <span>
                  {Math.round((currentStep / steps.length) * 100)}% Complete
                </span>
              </div>
            </div>

            {/* Current Step Info */}
            <div className="text-center mt-6">
              <h2 className="text-2xl font-bold text-[#B99671] mb-2">
                {steps[currentStep - 1].title}
              </h2>
              <p className="text-muted-foreground">
                {steps[currentStep - 1].description}
              </p>
            </div>
          </div>

          <Form {...form}>
            {/* <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8"> */}
            <form onSubmit={form.handleSubmit(onSubmitFinal)} className="space-y-8">
              {/* Step Content */}
              <div className="transition-all duration-500 ease-in-out">
                {renderStepContent()}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2 px-6 py-3"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </Button>

                <div className="flex gap-3">
                  {currentStep < steps.length ? (
                    <Button
                      type="button"
                      onClick={validateCurrentStep}
                      className="flex items-center gap-2 px-6 py-3 bg-[#B99671] hover:bg-[#A08660]"
                    >
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700"
                    >
                      <Check className="w-4 h-4" />
                      Submit Enrollment
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="max-w-md">
          <DialogHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <DialogTitle className="text-2xl">
              Enrollment Successful!
            </DialogTitle>
            <DialogDescription className="text-base mt-2">
              Thank you for enrolling with Amin Training Institute. We will
              contact you shortly with further details about your course.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 mt-6">
            {/* <Button
              onClick={handleDownloadPDF}
              className="w-full flex items-center justify-center gap-2"
              variant="outline"
            >
              <Download className="w-4 h-4" />
              Download Application PDF
            </Button>

            <Button
              onClick={handleWhatsAppShare}
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700"
            >
              <Share2 className="w-4 h-4" />
              Share on WhatsApp
            </Button> */}

            <Button
              onClick={() => (window.location.href = "/")}
              className="w-full"
              variant="outline"
            >
              Back to Home
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => window.open("https://wa.me/1234567890", "_blank")}
          className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg"
          size="icon"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default Enroll;
