"use client";
import React, { useEffect, useState } from "react";

type Registration = {
  userId: string;
  fullName: string;
  email: string;
  mobile: string;
  provisionalRegNo: string;
  passwordHash: string;
};

type BasicDetails = {
  userId: string;
  fatherOrHusbandName: string;
  dob: string;
  gender: string;
  category: string;
  domicileState: string;
  permanentAddress: string;
  correspondenceAddress: string;
  sameAddress: boolean;
};

type Education = {
  userId: string;
  passed10Plus2: string;
  boardName: string;
  examType: string;
  rollNumber: string;
  yearOfPassing: string;
  marksObtained: string;
  maxMarks: string;
  percentage: string;
};

type ExperienceItem = {
  userId: string;
  orgName: string;
  designation: string;
  natureOfWork: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  durationText: string;
  relevant: string;
};

type Uploads = {
  userId: string;
  photo: File | null;
  signature: File | null;
  marksheet10Plus2: File | null;
  categoryCertificate: File | null;
  disabilityCertificate: File | null;
  experienceProofs: File[];
  otherDocument: File | null;
};

type Payment = {
  userId: string;
  categoryForFee: string;
  calculatedFee: number;
  paymentMode: string;
};

type Declaration = {
  userId: string;
  confirmTruth: boolean;
  confirmContactConsent: boolean;
};

// Module-scope stable helpers to avoid remounts when ApplicationForm re-renders
const SectionWrapper: React.FC<
  React.PropsWithChildren<{ title: string; subtitle?: string }>
> = ({ title, subtitle, children }) => (
  <section className="mb-10">
    <div className="mb-4">
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      {subtitle && (
        <p className="text-xs text-gray-500 leading-relaxed">{subtitle}</p>
      )}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 gap-4">
      {children}
    </div>
  </section>
);

const Required: React.FC = () => <span className="text-red-500">*</span>;

const ApplicationForm: React.FC = () => {
  // -----------------------
  // STEP CONTROL
  // -----------------------
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const userId = "64b05344e7f1907f34c25151";

  // -----------------------
  // FORM STATE
  // -----------------------

  // Step 1: Registration Details
  const [registration, setRegistration] = useState<Registration>({
    userId: userId,
    fullName: "",
    email: "",
    mobile: "",
    provisionalRegNo: "AUTO-GENERATED",
    passwordHash: "",
  });

  // Step 2: Basic Details
  const [basicDetails, setBasicDetails] = useState<BasicDetails>({
    userId: userId,
    fatherOrHusbandName: "",
    dob: "",
    gender: "",
    category: "",
    domicileState: "",
    permanentAddress: "",
    correspondenceAddress: "",
    sameAddress: false,
  });

  // Step 3: Education
  const [education, setEducation] = useState<Education>({
    userId: userId,
    passed10Plus2: "", // "yes" or "no"
    boardName: "",
    examType: "Intermediate (10+2)",
    rollNumber: "",
    yearOfPassing: "",
    marksObtained: "",
    maxMarks: "",
    percentage: "",
  });

  // Step 4: Experience (list)
  const [experienceList, setExperienceList] = useState<ExperienceItem[]>([
    {
      userId: userId,
      orgName: "",
      designation: "",
      natureOfWork: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      durationText: "", // auto
      relevant: "", // "yes" / "no"
    },
  ]);

  // Step 5: Uploads
  const [uploads, setUploads] = useState<Uploads>({
    userId: userId,
    photo: null,
    signature: null,
    marksheet10Plus2: null,
    categoryCertificate: null,
    disabilityCertificate: null,
    experienceProofs: [],
    otherDocument: null,
  });

  // Step 6: Payment
  const [payment, setPayment] = useState<Payment>({
    userId: userId,
    categoryForFee: "", // derived from basicDetails.category
    calculatedFee: 0,
    paymentMode: "", // "online" | "offline"
  });

  // Step 7: Declaration
  const [declaration, setDeclaration] = useState<Declaration>({
    userId: userId,
    confirmTruth: false,
    confirmContactConsent: false,
  });

  // Global errors for validation summary (like blocking final submit)
  const [formErrors, setFormErrors] = useState<string[]>([]);

  // -----------------------
  // HELPERS
  // -----------------------

  // Simple validators
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const isValidIndianMobile = (m: string) => /^[6-9]\d{9}$/.test(m.trim());

  // Auto-fill correspondence address if sameAddress checked
  const handleSameAddressToggle = (checked: boolean) => {
    setBasicDetails((prev) => ({
      ...prev,
      sameAddress: checked,
      correspondenceAddress: checked
        ? prev.permanentAddress
        : prev.correspondenceAddress,
    }));
  };

  // Recalculate % when marks change
  const calculatePercentage = (marksObtained: string, maxMarks: string) => {
    const mo = parseFloat(marksObtained);
    const mm = parseFloat(maxMarks);
    if (!isNaN(mo) && !isNaN(mm) && mm > 0) {
      const pct = (mo / mm) * 100;
      return pct.toFixed(2);
    }
    return "";
  };

  const handleEducationChange = (field: keyof Education, value: string) => {
    // If marksObtained or maxMarks changes, recompute %
    if (field === "marksObtained" || field === "maxMarks") {
      const newEdu = {
        ...education,
        [field]: value,
      };
      newEdu.percentage = calculatePercentage(
        field === "marksObtained" ? value : newEdu.marksObtained,
        field === "maxMarks" ? value : newEdu.maxMarks
      );
      setEducation(newEdu);
    } else {
      setEducation((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  // Duration calc for experience
  const getDurationText = (
    startDate: string,
    endDate: string,
    currentlyWorking: boolean
  ) => {
    if (!startDate) return "";
    const start = new Date(startDate);
    const end = currentlyWorking || !endDate ? new Date() : new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return "";
    let diffMonths =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());

    // round rough years/months
    const years = Math.floor(diffMonths / 12);
    const months = diffMonths % 12;
    return `${years} year(s) ${months} month(s)`;
  };

  // Recalculate experience row
  const handleExperienceChange = (
    idx: number,
    field: keyof ExperienceItem,
    value: any
  ) => {
    setExperienceList((prev) => {
      const updated = [...prev];
      updated[idx] = {
        ...updated[idx],
        [field]: value,
      } as ExperienceItem;

      // keep durationText synced
      updated[idx].durationText = getDurationText(
        updated[idx].startDate,
        updated[idx].endDate,
        updated[idx].currentlyWorking
      );
      return updated;
    });
  };

  // Add new experience row
  const handleAddExperienceRow = () => {
    if (experienceList.length > 0) {
      setExperienceList((prev) => [
        ...prev,
        {
          userId: userId,
          orgName: "",
          designation: "",
          natureOfWork: "",
          startDate: "",
          endDate: "",
          currentlyWorking: false,
          durationText: "",
          relevant: "",
        },
      ]);
    } else {
      setExperienceList((prev) => [
        {
          userId: userId,
          orgName: "",
          designation: "",
          natureOfWork: "",
          startDate: "",
          endDate: "",
          currentlyWorking: false,
          durationText: "",
          relevant: "",
        },
      ]);
    }
  };

  // Calculate score preview:
  // We approximate "years_of_experience" from durationText across all rows.
  // Rule in ad: per year (>=6 months continuous in calendar year) = 5 marks,
  // max = 25.
  const calculateExperienceScore = (): {
    totalYears: number;
    score: number;
  } => {
    // We'll approximate: if months >=6 in a row, count that year.
    // We'll parse durationText for each row, sum years, and if months >=6 add +1.
    let totalYears = 0;

    if (experienceList.length > 0) {
      experienceList?.forEach((item) => {
        const match = item.durationText.match(
          /(\d+)\s+year\(s\)\s+(\d+)\s+month\(s\)/
        );
        if (match) {
          const years = parseInt(match[1], 10);
          const months = parseInt(match[2], 10);
          let rowYears = years;
          if (months >= 6) {
            rowYears += 1;
          }
          // only count if relevant === "yes"
          if (item.relevant === "yes") {
            totalYears += rowYears;
          }
        }
      });
    }

    const score = Math.min(25, totalYears * 5);
    return { totalYears, score };
  };

  const { totalYears, score } = calculateExperienceScore();

  // File change handler for uploads
  const handleFileChange = (
    field: keyof Uploads,
    files: FileList | null,
    allowMultiple = false
  ) => {
    setUploads((prev) => {
      if (allowMultiple) {
        const list: File[] = files ? Array.from(files) : [];
        return {
          ...prev,
          [field]: list,
        } as Uploads;
      }
      return {
        ...prev,
        [field]: files && files[0] ? files[0] : null,
      } as Uploads;
    });
  };

  // Fee calculation from category
  const getFeeForCategory = (cat: string, genderGuess?: string) => {
    // Based on ad:
    // General / EBC / BC / UR male: ₹200
    // General / EBC / BC / UR female: ₹100
    // SC / ST / Divyang all genders: ₹100
    // We'll approximate "UR" with General.
    const lower = cat.toLowerCase();
    if (
      lower.includes("sc") ||
      lower.includes("st") ||
      lower.includes("divyang")
    ) {
      return 100;
    }
    if (genderGuess && genderGuess.toLowerCase() === "female") {
      return 100;
    }
    return 200;
  };

  // -----------------------
  // VALIDATION
  // -----------------------

  const validateStep = (currentStep: number) => {
    const errors = [];

    if (currentStep === 1) {
      if (!registration.fullName.trim()) {
        errors.push("Full Name is required.");
      }
      if (!registration.email.trim() || !isValidEmail(registration.email)) {
        errors.push("Valid Email ID is required.");
      }
      if (
        !registration.mobile.trim() ||
        !isValidIndianMobile(registration.mobile)
      ) {
        errors.push("Valid 10-digit Mobile Number is required.");
      }
      if (!registration.provisionalRegNo.trim()) {
        errors.push("Provisional Registration Number is required.");
      }
      if (!registration.passwordHash.trim()) {
        errors.push("Password is required.");
      }
    }

    if (currentStep === 2) {
      if (!basicDetails.fatherOrHusbandName.trim()) {
        errors.push("Father’s / Husband’s Name is required.");
      }
      if (!basicDetails.dob.trim()) {
        errors.push("Date of Birth is required.");
      }
      if (!basicDetails.gender.trim()) {
        errors.push("Gender is required.");
      }
      if (!basicDetails.category.trim()) {
        errors.push("Category / Reservation is required.");
      }
      if (!basicDetails.domicileState.trim()) {
        errors.push("Domicile State is required.");
      }
      if (!basicDetails.permanentAddress.trim()) {
        errors.push("Permanent Address is required.");
      }
      if (!basicDetails.correspondenceAddress.trim()) {
        errors.push("Correspondence Address is required.");
      }
    }

    if (currentStep === 3) {
      if (!education.passed10Plus2) {
        errors.push("Please confirm 10+2 qualification.");
      } else if (education.passed10Plus2 === "no") {
        errors.push(
          "You are not eligible to apply. Intermediate (10+2) is required."
        );
      }
      if (!education.boardName.trim()) {
        errors.push("Board / University Name is required.");
      }
      if (!education.examType.trim()) {
        errors.push("Examination Type is required.");
      }
      if (!education.rollNumber.trim()) {
        errors.push("Roll Number / Registration Number is required.");
      }
      if (!education.yearOfPassing.trim()) {
        errors.push("Year of Passing is required.");
      }
      if (!education.marksObtained) {
        errors.push("Marks Obtained is required.");
      }
      if (!education.maxMarks) {
        errors.push("Maximum Marks is required.");
      }
    }

    if (currentStep === 4) {
      experienceList.forEach((exp, idx) => {
        if (!exp.relevant) {
          errors.push(
            `Please specify if experience row ${
              idx + 1
            } is relevant to land/revenue/survey/etc.`
          );
        }
      });
      // not all fields strictly required by ad, but we warn if fully empty row
    }

    if (currentStep === 5) {
      if (!uploads.photo) {
        errors.push("Please upload Photograph.");
      }
      if (!uploads.signature) {
        errors.push("Please upload Signature.");
      }
      if (!uploads.marksheet10Plus2) {
        errors.push("Please upload 10+2 Marksheet.");
      }

      // Conditional: category certificate
      if (
        basicDetails.category &&
        basicDetails.category.toLowerCase() !== "general (unreserved)" &&
        basicDetails.category.toLowerCase() !== "general" &&
        !uploads.categoryCertificate
      ) {
        errors.push(
          "Please upload Category / Reservation Certificate for your selected category."
        );
      }

      // Conditional: disability certificate
      if (
        basicDetails.category.toLowerCase().includes("divyang") &&
        !uploads.disabilityCertificate
      ) {
        errors.push("Please upload Disability Certificate for Divyang quota.");
      }
    }

    if (currentStep === 6) {
      if (!payment.paymentMode) {
        errors.push("Please choose a Payment Mode (Online / Offline).");
      }
    }

    if (currentStep === 7) {
      if (!declaration.confirmTruth) {
        errors.push("You must declare that all information is true and final.");
      }
      if (!declaration.confirmContactConsent) {
        errors.push(
          "You must agree to receive communication on your registered email/mobile."
        );
      }
      // Also block if education says not passed 10+2
      if (education.passed10Plus2 === "no") {
        errors.push(
          "Not eligible. Minimum qualification is 10+2 (Intermediate)."
        );
      }
    }

    setFormErrors(errors as string[]);
    return errors.length === 0;
  };

  useEffect(() => {
    (async () => {
      try {
        setLoad(true);
        const res = await fetch(`/api/application/me/${userId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          alert(err?.message || "Failed to fetch user! login first.");
        }
        const data = await res.json();
        setRegistration((prev) => ({ ...prev, ...data.application }));
        setBasicDetails((prev) => ({ ...prev, ...data.application }));
        setEducation((prev) => ({ ...prev, ...data.application }));
        setExperienceList((prev) => ({ ...prev, ...data.application }));
        setUploads((prev) => ({ ...prev, ...data.application }));
        setPayment((prev) => ({ ...prev, ...data.application }));
        setDeclaration((prev) => ({ ...prev, ...data.application }));
        setStep(data.application.currentStep);
        setLoad(false);
      } catch (error: any) {
        setLoad(false);
        alert("Failed to fetch user! login first.");
      }
    })();
  }, []);

  console.log("====================================");
  console.log(experienceList);
  console.log("====================================");

  // Validate and move forward
  const handleNext = async () => {
    if (validateStep(step)) {
      // special: when moving past step 2, sync fee info
      //   if (step === 2) {
      //     const newFee = getFeeForCategory(
      //       basicDetails.category || "",
      //       basicDetails.gender || ""
      //     );
      //     setPayment((prev) => ({
      //       ...prev,
      //       categoryForFee: basicDetails.category,
      //       calculatedFee: newFee,
      //     }));
      //   }

      setLoading(true);

      let data;

      switch (step) {
        case 1:
          data = registration;
          break;
        case 2:
          data = basicDetails;
          break;
        case 3:
          data = education;
          break;
        case 4:
          data = {
            userId,
            experienceList,
            totalRelevantExperienceYears: totalYears,
            experienceScore: score,
          };
          break;
        case 5:
          data = {};
          break;
        case 6:
          data = payment;
          break;
        case 7:
          data = declaration;
          break;
        default:
          data = {};
          break;
      }

      try {
        const res = await fetch(`/api/application/step${step}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          alert(err?.message || "Failed to submit application");
        } else {
          setStep((prev) => prev + 1);
        }
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        alert("Failed to submit! try again.");
      }
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  // Final submit
  const handleSubmit = () => {
    if (validateStep(7)) {
      const finalData = {
        registration,
        basicDetails,
        education,
        experienceList,
        uploads: {
          // We can't serialize File objects nicely here, but we include names
          photo: uploads.photo ? uploads.photo.name : null,
          signature: uploads.signature ? uploads.signature.name : null,
          marksheet10Plus2: uploads.marksheet10Plus2
            ? uploads.marksheet10Plus2.name
            : null,
          categoryCertificate: uploads.categoryCertificate
            ? uploads.categoryCertificate.name
            : null,
          disabilityCertificate: uploads.disabilityCertificate
            ? uploads.disabilityCertificate.name
            : null,
          experienceProofs: uploads.experienceProofs.map((f) => f.name),
          otherDocument: uploads.otherDocument
            ? uploads.otherDocument.name
            : null,
        },
        payment,
        declaration,
      };

      console.log("FINAL SUBMISSION DATA:", finalData);
      alert("Form submitted");
    }
  };

  // -----------------------
  // RENDER HELPERS
  // -----------------------

  const renderErrorSummary = () => {
    if (!formErrors.length) return null;
    return (
      <div className="bg-red-50 border border-red-400 text-red-700 rounded-lg p-4 mb-6">
        <h2 className="font-semibold text-red-700 mb-2">
          Please fix the following:
        </h2>
        <ul className="list-disc list-inside text-sm space-y-1">
          {formErrors.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
      </div>
    );
  };

  // -----------------------
  // SECTIONS
  // -----------------------

  // STEP 1: Registration
  const StepOne = () => (
    <>
      <SectionWrapper
        title="Step 1: Registration Details"
        subtitle='Use your own active email and mobile. "Registration details must be kept secure."'
      >
        {/* Full Name */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            Full Name <Required />
          </label>
          <input
            className="block w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={registration.fullName}
            onChange={(e) =>
              setRegistration((prev) => ({ ...prev, fullName: e.target.value }))
            }
            placeholder="Enter your full name"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            Email ID <Required />
          </label>
          <input
            type="email"
            className="block w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={registration.email}
            onChange={(e) =>
              setRegistration((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder="example@email.com"
          />
          <p className="text-[11px] text-gray-500 mt-1">
            Use your own active email. All communication will be sent here.
          </p>
        </div>

        {/* Mobile */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            Mobile Number <Required />
          </label>
          <input
            type="tel"
            className="block w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={registration.mobile}
            onChange={(e) =>
              setRegistration((prev) => ({ ...prev, mobile: e.target.value }))
            }
            placeholder="10-digit mobile"
          />
          <p className="text-[11px] text-gray-500 mt-1">
            Use your own active mobile number. OTP / Password will be sent here.
          </p>
        </div>

        {/* Provisional Reg No */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            Provisional Registration Number <Required />
          </label>
          <input
            className="block w-full border border-gray-300 bg-gray-100 text-gray-600 rounded-lg p-2 text-sm focus:outline-none"
            value={registration.provisionalRegNo}
            onChange={(e) =>
              setRegistration((prev) => ({
                ...prev,
                provisionalRegNo: e.target.value,
              }))
            }
            readOnly
          />
          <p className="text-[11px] text-gray-500 mt-1">
            AUTO-GENERATED and cannot be changed after registration.
          </p>
        </div>

        {/* Password */}
        <div className="flex flex-col md:col-span-2">
          <label className="text-sm font-medium text-gray-700">
            Password <Required />
          </label>
          <input
            type="password"
            className="block w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={registration.passwordHash}
            onChange={(e) =>
              setRegistration((prev) => ({
                ...prev,
                passwordHash: e.target.value,
              }))
            }
            placeholder="Choose a strong password"
          />
          <p className="text-[11px] text-gray-500 mt-1">
            Please remember this password for future login.
          </p>

          <div className="bg-yellow-50 border border-yellow-300 text-yellow-700 rounded-lg p-3 text-xs mt-4">
            Registration details (email, mobile number, provisional registration
            number, password) must be kept secure by the applicant. They are
            required for login and cannot be shared.
          </div>
        </div>
      </SectionWrapper>

      <div className="flex justify-end gap-3">
        <button
          onClick={handleNext}
          className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 text-sm font-medium"
        >
          {loading ? "Loading...." : "Save & Next"}
        </button>
      </div>
    </>
  );

  // STEP 2: Basic Details
  const StepTwo = () => (
    <>
      <SectionWrapper
        title="Step 2: Basic Details"
        subtitle="Reservation / relaxation will be granted only if supporting certificates are uploaded and valid."
      >
        {/* Father/Husband Name */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            Father’s / Husband’s Name <Required />
          </label>
          <input
            className="block w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={basicDetails.fatherOrHusbandName}
            onChange={(e) =>
              setBasicDetails((prev) => ({
                ...prev,
                fatherOrHusbandName: e.target.value,
              }))
            }
            placeholder="Enter father’s / husband’s name"
          />
        </div>

        {/* DOB */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            Date of Birth <Required />
          </label>
          <input
            type="date"
            className="block w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={basicDetails.dob}
            onChange={(e) =>
              setBasicDetails((prev) => ({ ...prev, dob: e.target.value }))
            }
          />
        </div>

        {/* Gender */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            Gender <Required />
          </label>
          <select
            className="block w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={basicDetails.gender}
            onChange={(e) =>
              setBasicDetails((prev) => ({ ...prev, gender: e.target.value }))
            }
          >
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            Category / Reservation Category <Required />
          </label>
          <select
            className="block w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={basicDetails.category}
            onChange={(e) =>
              setBasicDetails((prev) => ({ ...prev, category: e.target.value }))
            }
          >
            <option value="">Select</option>
            <option>General (Unreserved)</option>
            <option>EBC (Economically Backward Class)</option>
            <option>BC (Backward Class)</option>
            <option>SC (अनुसूचित जाति)</option>
            <option>ST (अनुसूचित जनजाति)</option>
            <option>Female</option>
            <option>Divyang (Persons with Disability)</option>
            <option>Freedom Fighter Dependent / Ex-Servicemen</option>
          </select>
          <p className="text-[11px] text-gray-500 mt-1">
            Reservation / relaxation will be granted only if supporting
            certificates are uploaded and valid.
          </p>
        </div>

        {/* Domicile */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            Domicile State <Required />
          </label>
          <input
            className="block w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={basicDetails.domicileState}
            onChange={(e) =>
              setBasicDetails((prev) => ({
                ...prev,
                domicileState: e.target.value,
              }))
            }
            placeholder="e.g. Bihar"
          />
        </div>

        {/* Permanent Address */}
        <div className="flex flex-col md:col-span-2">
          <label className="text-sm font-medium text-gray-700">
            Permanent Address <Required />
          </label>
          <textarea
            className="block w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={3}
            value={basicDetails.permanentAddress}
            onChange={(e) => {
              const newVal = e.target.value;
              setBasicDetails((prev) => ({
                ...prev,
                permanentAddress: newVal,
                correspondenceAddress: prev.sameAddress
                  ? newVal
                  : prev.correspondenceAddress,
              }));
            }}
            placeholder="Full permanent address"
          />
        </div>

        {/* Correspondence Address */}
        <div className="flex flex-col md:col-span-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700">
                Communication / Correspondence Address <Required />
              </label>
            </div>
            <div className="flex items-center text-xs text-gray-600">
              <input
                type="checkbox"
                className="mr-2"
                checked={basicDetails.sameAddress}
                onChange={(e) => handleSameAddressToggle(e.target.checked)}
              />
              <span>Same as Permanent</span>
            </div>
          </div>

          <textarea
            className="block w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-2"
            rows={3}
            value={basicDetails.correspondenceAddress}
            onChange={(e) =>
              setBasicDetails((prev) => ({
                ...prev,
                correspondenceAddress: e.target.value,
              }))
            }
            placeholder="Mailing / correspondence address"
          />
        </div>
      </SectionWrapper>

      <div className="flex justify-between gap-3">
        <button
          onClick={handleBack}
          className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2 hover:bg-gray-300 text-sm font-medium"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 text-sm font-medium"
        >
          {loading ? "Loading...." : "Save & Next"}
        </button>
      </div>
    </>
  );

  // STEP 3: Education
  const StepThree = () => (
    <>
      <SectionWrapper
        title="Step 3: Educational Qualification"
        subtitle="Minimum qualification is Intermediate (10+2) or equivalent. Upload marksheet in Uploads section."
      >
        {/* Passed 10+2 */}
        <div className="flex flex-col md:col-span-2">
          <label className="text-sm font-medium text-gray-700">
            Have you passed Intermediate (10+2) or equivalent? <Required />
          </label>
          <div className="flex items-center gap-4 mt-2 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="passed10Plus2"
                value="yes"
                checked={education.passed10Plus2 === "yes"}
                onChange={(e) =>
                  handleEducationChange("passed10Plus2", e.target.value)
                }
              />
              <span>Yes</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="passed10Plus2"
                value="no"
                checked={education.passed10Plus2 === "no"}
                onChange={(e) =>
                  handleEducationChange("passed10Plus2", e.target.value)
                }
              />
              <span>No</span>
            </label>
          </div>
          {education.passed10Plus2 === "no" && (
            <p className="text-red-500 text-xs mt-2">
              You are not eligible to apply. Intermediate (10+2) is required.
            </p>
          )}
        </div>

        {/* Board / University Name */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            Board / University Name <Required />
          </label>
          <input
            className="block w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={education.boardName}
            onChange={(e) => handleEducationChange("boardName", e.target.value)}
            placeholder="e.g. BSEB / CBSE / ICSE"
          />
        </div>

        {/* Exam Type */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            Examination Type <Required />
          </label>
          <select
            className="block w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={education.examType}
            onChange={(e) => handleEducationChange("examType", e.target.value)}
          >
            <option>Intermediate (10+2)</option>
            <option>Equivalent</option>
          </select>
        </div>

        {/* Roll Number */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            Roll Number / Registration Number <Required />
          </label>
          <input
            className="block w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={education.rollNumber}
            onChange={(e) =>
              handleEducationChange("rollNumber", e.target.value)
            }
            placeholder="Enter your roll / reg no."
          />
        </div>

        {/* Year of Passing */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            Year of Passing <Required />
          </label>
          <input
            type="number"
            className="block w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={education.yearOfPassing}
            onChange={(e) =>
              handleEducationChange("yearOfPassing", e.target.value)
            }
            placeholder="YYYY"
          />
        </div>

        {/* Marks Obtained */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            Marks Obtained <Required />
          </label>
          <input
            type="number"
            className="block w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={education.marksObtained}
            onChange={(e) =>
              handleEducationChange("marksObtained", e.target.value)
            }
            placeholder="e.g. 340"
          />
        </div>

        {/* Max Marks */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            Maximum Marks <Required />
          </label>
          <input
            type="number"
            className="block w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={education.maxMarks}
            onChange={(e) => handleEducationChange("maxMarks", e.target.value)}
            placeholder="e.g. 500"
          />
        </div>

        {/* Percentage */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            Percentage / CGPA (auto)
          </label>
          <input
            className="block w-full border border-gray-300 bg-gray-100 text-gray-600 rounded-lg p-2 text-sm focus:outline-none"
            value={education.percentage}
            readOnly
            placeholder="Auto-calculated"
          />
          <p className="text-[11px] text-gray-500 mt-1">
            Upload your Intermediate (10+2) Marksheet in the Upload section. You
            may be shortlisted for CBT based on marks and experience score.
          </p>
        </div>
      </SectionWrapper>

      <div className="flex justify-between gap-3">
        <button
          onClick={handleBack}
          className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2 hover:bg-gray-300 text-sm font-medium"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 text-sm font-medium"
        >
          {loading ? "Loading...." : "Save & Next"}
        </button>
      </div>
    </>
  );

  // STEP 4: Work Experience
  const StepFour = () => {
    return (
      <>
        <SectionWrapper
          title="Step 4: Work Experience"
          subtitle="Experience will be verified. False information may lead to disqualification and legal action."
        >
          {experienceList.length > 0 &&
            experienceList.map((exp, idx) => (
              <div
                key={idx}
                className="md:col-span-2 border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Org Name */}
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">
                      Organization / Department Name
                    </label>
                    <input
                      className="block w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={exp.orgName}
                      onChange={(e) =>
                        handleExperienceChange(idx, "orgName", e.target.value)
                      }
                    />
                  </div>

                  {/* Designation */}
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">
                      Designation / Role
                    </label>
                    <input
                      className="block w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={exp.designation}
                      onChange={(e) =>
                        handleExperienceChange(
                          idx,
                          "designation",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  {/* Nature of Work */}
                  <div className="flex flex-col md:col-span-2">
                    <label className="text-sm font-medium text-gray-700">
                      Nature of Work / Responsibilities
                    </label>
                    <textarea
                      className="block w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      rows={3}
                      value={exp.natureOfWork}
                      onChange={(e) =>
                        handleExperienceChange(
                          idx,
                          "natureOfWork",
                          e.target.value
                        )
                      }
                      placeholder="Describe duties related to land records / survey / revenue / govt field work"
                    />
                  </div>

                  {/* Start Date */}
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="block w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={exp.startDate}
                      onChange={(e) =>
                        handleExperienceChange(idx, "startDate", e.target.value)
                      }
                    />
                  </div>

                  {/* End Date / Currently Working */}
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">
                      End Date
                    </label>
                    <input
                      type="date"
                      className={`block w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        exp.currentlyWorking ? "bg-gray-100 text-gray-500" : ""
                      }`}
                      value={exp.currentlyWorking ? "" : exp.endDate}
                      disabled={exp.currentlyWorking}
                      onChange={(e) =>
                        handleExperienceChange(idx, "endDate", e.target.value)
                      }
                    />
                    <div className="flex items-center gap-2 text-xs text-gray-600 mt-2">
                      <input
                        type="checkbox"
                        checked={exp.currentlyWorking}
                        onChange={(e) =>
                          handleExperienceChange(
                            idx,
                            "currentlyWorking",
                            e.target.checked
                          )
                        }
                      />
                      <span>Currently Working</span>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">
                      Total Duration (auto)
                    </label>
                    <input
                      className="block w-full border border-gray-300 bg-gray-100 text-gray-600 rounded-lg p-2 text-sm focus:outline-none"
                      value={exp.durationText}
                      readOnly
                      placeholder="e.g. 2 year(s) 3 month(s)"
                    />
                    <p className="text-[11px] text-gray-500 mt-1">
                      Only service ≥6 months in a calendar year counts as 1 full
                      year. Less than 6 months is ignored.
                    </p>
                  </div>

                  {/* Relevant? */}
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">
                      Relevant to land records / revenue / survey / land
                      acquisition / govt field work? <Required />
                    </label>
                    <select
                      className="block w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={exp.relevant}
                      onChange={(e) =>
                        handleExperienceChange(idx, "relevant", e.target.value)
                      }
                    >
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}

          <div className="md:col-span-2">
            <button
              type="button"
              onClick={handleAddExperienceRow}
              className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2 hover:bg-gray-300 text-sm font-medium"
            >
              + Add another experience
            </button>
          </div>

          <div className="md:col-span-2 bg-white border border-gray-200 rounded-lg p-4 shadow-sm text-sm">
            <div className="font-medium text-gray-800 mb-1">
              Experience Score Preview
            </div>
            <div className="text-gray-700">
              Total Relevant Years (approx):{" "}
              <span className="font-semibold">{totalYears}</span>
              <br />
              Score = min(25, years * 5):
              <span className="font-semibold ml-1">{score}</span>
            </div>
            <p className="text-[11px] text-gray-500 mt-2">
              Experience score = min(25, years_of_experience * 5). Only
              continuous work of ≥6 months per calendar year counts as 1 full
              year.
            </p>
          </div>
        </SectionWrapper>

        <div className="flex justify-between gap-3">
          <button
            onClick={handleBack}
            className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2 hover:bg-gray-300 text-sm font-medium"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 text-sm font-medium"
          >
            {loading ? "Loading...." : "Save & Next"}
          </button>
        </div>
      </>
    );
  };

  // STEP 5: Uploads
  const StepFive = () => (
    <>
      <SectionWrapper
        title="Step 5: Upload Photo, Signature & Documents"
        subtitle="Upload clear scanned copies. Max size ~2MB each. JPG or PDF where specified."
      >
        {/* Photo */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            Upload Photograph (Passport size, high contrast) <Required />
          </label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            className="block w-full text-sm"
            onChange={(e) => handleFileChange("photo", e.target.files, false)}
          />
          <p className="text-[11px] text-gray-500 mt-1">
            {uploads.photo ? uploads.photo.name : "No file chosen"} (Max 2MB)
          </p>
        </div>

        {/* Signature */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            Upload Signature <Required />
          </label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            className="block w-full text-sm"
            onChange={(e) =>
              handleFileChange("signature", e.target.files, false)
            }
          />
          <p className="text-[11px] text-gray-500 mt-1">
            {uploads.signature ? uploads.signature.name : "No file chosen"} (Max
            2MB)
          </p>
        </div>

        {/* Marksheet 10+2 */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            Upload 10+2 / Intermediate Marksheet <Required />
          </label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="block w-full text-sm"
            onChange={(e) =>
              handleFileChange("marksheet10Plus2", e.target.files, false)
            }
          />
          <p className="text-[11px] text-gray-500 mt-1">
            {uploads.marksheet10Plus2
              ? uploads.marksheet10Plus2.name
              : "No file chosen"}{" "}
            (PDF/JPG, Max 2MB)
          </p>
        </div>

        {/* Category Certificate */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            Category / Caste / Reservation Certificate{" "}
            {basicDetails.category &&
            basicDetails.category.toLowerCase() !== "general (unreserved)" &&
            basicDetails.category.toLowerCase() !== "general" ? (
              <Required />
            ) : null}
          </label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="block w-full text-sm"
            onChange={(e) =>
              handleFileChange("categoryCertificate", e.target.files, false)
            }
          />
          <p className="text-[11px] text-gray-500 mt-1">
            {uploads.categoryCertificate
              ? uploads.categoryCertificate.name
              : "No file chosen"}{" "}
            (PDF/JPG, Max 2MB)
          </p>
        </div>

        {/* Disability Cert */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            Disability Certificate (for Divyang quota){" "}
            {basicDetails.category.toLowerCase().includes("divyang") && (
              <Required />
            )}
          </label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="block w-full text-sm"
            onChange={(e) =>
              handleFileChange("disabilityCertificate", e.target.files, false)
            }
          />
          <p className="text-[11px] text-gray-500 mt-1">
            {uploads.disabilityCertificate
              ? uploads.disabilityCertificate.name
              : "No file chosen"}{" "}
            (PDF/JPG, Max 2MB)
          </p>
        </div>

        {/* Experience Proofs */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            Work Experience Proofs (if any, multiple files)
          </label>
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            className="block w-full text-sm"
            onChange={(e) =>
              handleFileChange("experienceProofs", e.target.files, true)
            }
          />
          <p className="text-[11px] text-gray-500 mt-1">
            {uploads.experienceProofs.length
              ? uploads.experienceProofs.map((f) => f.name).join(", ")
              : "No files selected"}{" "}
            (PDF/JPG, Max 2MB each)
          </p>
        </div>

        {/* Other Doc */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            Any Other Supporting Document (optional)
          </label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="block w-full text-sm"
            onChange={(e) =>
              handleFileChange("otherDocument", e.target.files, false)
            }
          />
          <p className="text-[11px] text-gray-500 mt-1">
            {uploads.otherDocument
              ? uploads.otherDocument.name
              : "No file chosen"}{" "}
            (PDF/JPG, Max 2MB)
          </p>
        </div>
      </SectionWrapper>

      <div className="flex justify-between gap-3">
        <button
          onClick={handleBack}
          className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2 hover:bg-gray-300 text-sm font-medium"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 text-sm font-medium"
        >
          {loading ? "Loading...." : "Save & Next"}
        </button>
      </div>
    </>
  );

  // STEP 6: Payment Preview
  const StepSix = () => (
    <>
      <SectionWrapper
        title="Step 6: Payment Information"
        subtitle="Exam fee is non-refundable. Keep your receipt safely."
      >
        {/* Category For Fee */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            Candidate Category (read-only)
          </label>
          <input
            className="block w-full border border-gray-300 bg-gray-100 text-gray-600 rounded-lg p-2 text-sm focus:outline-none"
            value={payment.categoryForFee}
            readOnly
          />
        </div>

        {/* Calculated Fee */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            Calculated Exam Fee Amount (₹)
          </label>
          <input
            className="block w-full border border-gray-300 bg-gray-100 text-gray-600 rounded-lg p-2 text-sm focus:outline-none"
            value={payment.calculatedFee}
            readOnly
          />
        </div>

        {/* Payment Mode */}
        <div className="flex flex-col md:col-span-2">
          <label className="text-sm font-medium text-gray-700">
            Choose Payment Mode <Required />
          </label>
          <div className="flex flex-col sm:flex-row gap-4 mt-2 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMode"
                value="online"
                checked={payment.paymentMode === "online"}
                onChange={(e) =>
                  setPayment((prev) => ({
                    ...prev,
                    paymentMode: e.target.value,
                  }))
                }
              />
              <span>Online (Card / NetBanking)</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMode"
                value="offline"
                checked={payment.paymentMode === "offline"}
                onChange={(e) =>
                  setPayment((prev) => ({
                    ...prev,
                    paymentMode: e.target.value,
                  }))
                }
              />
              <span>Offline (Challan / NEFT)</span>
            </label>
          </div>

          <div className="bg-blue-50 border border-blue-300 text-blue-700 rounded-lg p-3 text-xs mt-4 space-y-2">
            <div>
              <strong>Offline Challan:</strong> Download challan, deposit
              cash/NEFT in bank before last date, and keep the receipt.
            </div>
            <div>
              <strong>Online Payment:</strong> You will be redirected to
              card/debit/netbanking gateway and must pay the processing charges.
            </div>
            <div className="text-red-600 font-medium">
              Exam fee is non-refundable. Payment receipt must be kept safely.
              Delayed settlement or non-updated payment will not be entertained.
            </div>
          </div>
        </div>
      </SectionWrapper>

      <div className="flex justify-between gap-3">
        <button
          onClick={handleBack}
          className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2 hover:bg-gray-300 text-sm font-medium"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 text-sm font-medium"
        >
          {loading ? "Loading...." : "Save & Next"}
        </button>
      </div>
    </>
  );

  // STEP 7: Declaration & Final Submit
  const StepSeven = () => (
    <>
      <SectionWrapper
        title="Step 7: Declaration & Final Submit"
        subtitle="Please review your application before final submission. After final submit, it cannot be edited and fees are not refundable."
      >
        {/* Declaration checkbox 1 */}
        <div className="flex flex-col md:col-span-2">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Final Declaration <Required />
          </label>

          <label className="flex items-start gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={declaration.confirmTruth}
              onChange={(e) =>
                setDeclaration((prev) => ({
                  ...prev,
                  confirmTruth: e.target.checked,
                }))
              }
              className="mt-1"
            />
            <span className="leading-relaxed text-xs md:text-sm">
              I declare that all information provided is true and correct. I
              understand that once I finally submit the form, I cannot edit or
              withdraw the application, and the examination fee will not be
              refunded. I also understand that if any uploaded certificate or
              detail is found false, my candidature may be cancelled and legal
              action may be taken.
            </span>
          </label>
        </div>

        {/* Declaration checkbox 2 */}
        <div className="flex flex-col md:col-span-2">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Contact Consent <Required />
          </label>

          <label className="flex items-start gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={declaration.confirmContactConsent}
              onChange={(e) =>
                setDeclaration((prev) => ({
                  ...prev,
                  confirmContactConsent: e.target.checked,
                }))
              }
              className="mt-1"
            />
            <span className="leading-relaxed text-xs md:text-sm">
              I agree to receive communication on my registered email ID and
              mobile number.
            </span>
          </label>
        </div>

        {/* Preview & Submit */}
        <div className="flex flex-col md:col-span-2 gap-3 mt-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2 hover:bg-gray-300 text-sm font-medium w-full sm:w-auto"
              onClick={() => {
                console.log("PREVIEW DATA", {
                  registration,
                  basicDetails,
                  education,
                  experienceList,
                  uploads,
                  payment,
                  declaration,
                });
                alert("Preview Application - check console for data");
              }}
            >
              Preview Application
            </button>

            <button
              type="button"
              className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 text-sm font-medium w-full sm:w-auto"
              onClick={handleSubmit}
            >
              Final Submit & Generate Application PDF
            </button>
          </div>

          <p className="text-[11px] text-red-600">
            After Final Submit, application cannot be changed. Fees will not be
            refunded.
          </p>
        </div>
      </SectionWrapper>

      <div className="flex justify-start gap-3">
        <button
          onClick={handleBack}
          className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2 hover:bg-gray-300 text-sm font-medium"
        >
          Back
        </button>
      </div>
    </>
  );

  // -----------------------
  // PAGE WRAPPER
  // -----------------------

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10">
        {load ? (
          <div
            style={{
              height: "80vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h3 style={{ textAlign: "center" }}>Loading....</h3>
          </div>
        ) : (
          <>
            {/* Step indicator */}
            <div className="flex flex-wrap items-center justify-between mb-8">
              <div>
                <h1 className="text-xl font-semibold text-gray-800">
                  Bihar Revenue & Land Reforms Dept. – Amin Application
                </h1>
                <p className="text-xs text-gray-500">
                  Step {step} of 7 • Online Application & CBT Recruitment
                </p>
              </div>
              <div className="text-xs text-gray-500">
                All fields marked <span className="text-red-500">*</span> are
                mandatory.
              </div>
            </div>

            {renderErrorSummary()}

            {step === 1 && StepOne()}
            {step === 2 && StepTwo()}
            {step === 3 && StepThree()}
            {step === 4 && StepFour()}
            {step === 5 && StepFive()}
            {step === 6 && StepSix()}
            {step === 7 && StepSeven()}
          </>
        )}
      </div>
    </div>
  );
};

export default ApplicationForm;
