import { Schema, model, models } from "mongoose";

const FileRefSchema = new Schema(
  {
    filename: String,
    url: String,        // S3/Cloud URL if uploaded
    mimeType: String,
    size: Number,
  },
  { _id: false }
);

const EnrollmentSchema = new Schema(
  {
    // Personal
    fullName: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    mobileNumber: { type: String, required: true },
    email: { type: String, required: true },
    parentName: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pinCode: { type: String, required: true },

    // IDs
    aadhaarNumber: { type: String, required: true },
    panNumber: { type: String },

    // Education
    highestQualification: { type: String, required: true },
    institutionName: { type: String, required: true },
    yearOfPassing: { type: String, required: true },

    // Course
    selectedCourse: { type: String, required: true },
    learningMode: { type: String, enum: ["online", "offline"], required: true },
    batchTime: { type: String, required: true },
    hearAboutUs: { type: String, required: true },

    // Payment
    paymentMode: { type: String, required: true },
    transactionId: { type: String, required: true },

    // Declarations
    infoDeclaration: { type: Boolean, required: true },
    termsAccepted: { type: Boolean, required: true },

    // Files (optional URLs/metadata)
    files: {
      aadhaarCard: FileRefSchema,
      photograph: FileRefSchema,
      signature: FileRefSchema,
      marksheet: FileRefSchema,
      paymentReceipt: FileRefSchema,
    },
  },
  { timestamps: true }
);

export const Enrollment = models.Enrollment || model("Enrollment", EnrollmentSchema);
