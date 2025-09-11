import * as z from "zod";

export const enrollmentSchema = z.object({
  // Personal Details
  fullName: z.string().min(2),
  dateOfBirth: z.string().min(1),
  gender: z.enum(["male", "female", "other"]),
  mobileNumber: z.string().regex(/^[6-9]\d{9}$/),
  email: z.string().email(),
  parentName: z.string().min(2),
  permanentAddress: z.string().min(10),
  city: z.string().min(2),
  state: z.string().min(1),
  pinCode: z.string().regex(/^\d{6}$/),

  // Identification Details
  aadhaarNumber: z.string().regex(/^\d{12}$/),
  panNumber: z.string().optional().nullable(),

  // Education Details
  highestQualification: z.string().min(1),
  institutionName: z.string().min(2),
  yearOfPassing: z.string().min(1),

  // Course Selection
  selectedCourse: z.string().min(1),
  learningMode: z.enum(["online", "offline"]),
  batchTime: z.string().min(1),
  hearAboutUs: z.string().min(1),

  // Payment Details
  paymentMode: z.string().min(1),
  transactionId: z.string().min(1),

  // Declarations (come from FormData as strings, so coerce)
  infoDeclaration: z.union([z.string(), z.boolean()]).transform(v => v === true || v === "true"),
  termsAccepted: z.union([z.string(), z.boolean()]).transform(v => v === true || v === "true"),
}).refine(v => v.infoDeclaration && v.termsAccepted, {
  message: "You must accept the declarations",
});

export type EnrollmentInput = z.infer<typeof enrollmentSchema>;
