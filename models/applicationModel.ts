import mongoose from "mongoose";

const { Schema } = mongoose;

const ApplicationSchema = new Schema(
  {
    // Who is filling this form (your app's logged-in user)
    userId: {
      type: Schema.Types.ObjectId, // or String if you're not using ObjectId for users
      required: true,
      index: true,
    },

    // ---------------------------
    // STEP 1: Registration Details
    // ---------------------------
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
    },

    provisionalRegNo: {
      type: String,
      required: true,
      trim: true,
    },

    passwordHash: {
      // store hashed password, never plain
      type: String,
      required: true,
      trim: true,
    },

    // ---------------------------
    // STEP 2: Basic Details
    // ---------------------------

    fatherOrHusbandName: {
      type: String,
      required: true,
      trim: true,
    },

    dob: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },

    category: {
      // Reservation Category chosen by candidate
      type: String,
      required: true,
      enum: [
        "General (Unreserved)",
        "EBC (Economically Backward Class)",
        "BC (Backward Class)",
        "SC (अनुसूचित जाति)",
        "ST (अनुसूचित जनजाति)",
        "Female",
        "Divyang (Persons with Disability)",
        "Freedom Fighter Dependent / Ex-Servicemen",
      ],
    },

    domicileState: {
      type: String,
      required: true,
      trim: true,
    },

    permanentAddress: {
      type: String,
      required: true,
      trim: true,
    },

    correspondenceAddress: {
      type: String,
      required: true,
      trim: true,
    },

    sameAddress: {
      type: Boolean,
      default: false,
    },

    // ---------------------------
    // STEP 3: Educational Qualification
    // ---------------------------

    passed10Plus2: {
      // "yes" or "no"
      type: String,
      required: true,
      enum: ["yes", "no"],
    },

    boardName: {
      type: String,
      required: true,
      trim: true,
    },

    examType: {
      type: String,
      required: true,
      enum: ["Intermediate (10+2)", "Equivalent"],
    },

    rollNumber: {
      type: String,
      required: true,
      trim: true,
    },

    yearOfPassing: {
      type: String,
      required: true,
      trim: true,
    },

    marksObtained: {
      type: Number,
      required: true,
    },

    maxMarks: {
      type: Number,
      required: true,
    },

    percentage: {
      // we calculate and store to avoid recompute
      type: Number,
    },

    // ---------------------------
    // STEP 4: Work Experience
    // ---------------------------
    // We’ll allow multiple past experiences. Each row flattened into simple objects.
    experienceList: [
      {
        orgName: { type: String, trim: true },
        designation: { type: String, trim: true },
        natureOfWork: { type: String, trim: true },
        startDate: { type: String },
        endDate: { type: String },
        currentlyWorking: { type: Boolean, default: false },

        // Calculated label like "2 year(s) 3 month(s)"
        durationText: { type: String, trim: true },

        // "yes" / "no" — relevant to land/survey/revenue/govt
        relevant: {
          type: String,
          enum: ["yes", "no", ""],
          default: "",
        },
      },
    ],

    // Store derived score preview numbers to not recalc on list page
    totalRelevantExperienceYears: {
      type: Number,
      default: 0,
    },

    experienceScore: {
      // min(25, years * 5)
      type: Number,
      default: 0,
    },

    // ---------------------------
    // STEP 5: Uploads
    // ---------------------------
    // We only store file references (file names, S3 keys, URLs, etc.)

    photoFile: {
      type: String, // e.g. "photo_abc123.jpg"
      trim: true,
    },

    signatureFile: {
      type: String,
      trim: true,
    },

    marksheet10Plus2File: {
      type: String,
      trim: true,
    },

    categoryCertificateFile: {
      type: String,
      trim: true,
    },

    disabilityCertificateFile: {
      type: String,
      trim: true,
    },

    experienceProofFiles: [
      {
        type: String,
        trim: true,
      },
    ],

    otherDocumentFile: {
      type: String,
      trim: true,
    },

    // ---------------------------
    // STEP 6: Payment Info
    // ---------------------------

    paymentCategoryForFee: {
      // snapshot of category at payment time
      type: String,
      trim: true,
    },

    calculatedFee: {
      // 200 or 100
      type: Number,
      default: 0,
    },

    paymentMode: {
      type: String,
      enum: ["online", "offline", ""],
      default: "",
    },

    // You could also add transactionId, challanNo, etc. later if needed
    // transactionId: { type: String, trim: true },

    // ---------------------------
    // STEP 7: Declaration
    // ---------------------------

    confirmTruth: {
      type: Boolean,
      default: false,
    },

    confirmContactConsent: {
      type: Boolean,
      default: false,
    },

    // ---------------------------
    // FORM STATUS / META
    // ---------------------------

    currentStep: {
      // where the user last saved (1-7)
      type: Number,
      min: 1,
      max: 7,
      default: 1,
    },

    isFinalSubmitted: {
      // after they click Final Submit
      type: Boolean,
      default: false,
    },

    finalSubmittedAt: {
      type: Date,
    },

    applicationPdfUrl: {
      // after final submit, you may generate PDF & store
      type: String,
      trim: true,
    },

    clientIp: {
      type: String,
      trim: true,
    },

    userAgent: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

// helpful indexes
ApplicationSchema.index({ userId: 1 });
ApplicationSchema.index({ provisionalRegNo: 1 }, { unique: true });
ApplicationSchema.index({ email: 1 });
ApplicationSchema.index({ mobile: 1 });

const Application =
  mongoose.models.Application ||
  mongoose.model("Application", ApplicationSchema);

export default Application;