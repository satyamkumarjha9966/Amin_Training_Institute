import { NextRequest, NextResponse } from "next/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

// ⬇️ Your own imports (paths as you had them)
import { Enrollment } from "../../../../models/Enrollment"; // Mongoose model
import { enrollmentSchema } from "@/lib/validators/enrollment"; // Zod schema

// ---- Cloudinary config ----
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const CLOUD_FOLDER = process.env.CLOUDINARY_FOLDER || "enrollments";
const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "application/pdf"]);

// Upload a web File from formData to Cloudinary via Node stream (no streamifier)
async function uploadToCloudinary(
  file: File | null,
  folder: string,
  publicIdPrefix: string
) {
  if (!file) return null;

  if (!ALLOWED_MIME.has(file.type)) {
    throw new Error(`Unsupported file type: ${file.type}`);
  }
  if (file.size > MAX_FILE_BYTES) {
    throw new Error(
      `File too large: ${(file.size / 1024 / 1024).toFixed(1)}MB (max 5MB)`
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise<{ url: string; public_id: string; bytes: number; format?: string }>(
    (resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          folder,
          public_id: `${publicIdPrefix}-${Date.now()}`,
          resource_type: "auto", // image/pdf/etc
          overwrite: false,
        },
        (error, result) => {
          if (error || !result)
            return reject(error || new Error("Cloudinary upload failed"));
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
            bytes: result.bytes,
            format: result.format,
          });
        }
      );
      Readable.from(buffer).pipe(upload);
    }
  );
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { message: "Content-Type must be multipart/form-data" },
        { status: 400 }
      );
    }

    const fd = await req.formData();

    // 1) Extract scalar fields (MUST match your frontend keys)
    const scalarKeys = [
      "fullName","dateOfBirth","gender","mobileNumber","email","parentName",
      "permanentAddress","city","state","pinCode","aadhaarNumber","panNumber",
      "highestQualification","institutionName","yearOfPassing",
      "selectedCourse","learningMode","batchTime","hearAboutUs",
      "paymentMode","transactionId","infoDeclaration","termsAccepted",
    ] as const;

    const raw: Record<string, any> = {};
    scalarKeys.forEach((k) => (raw[k] = fd.get(k)));

    // 2) Validate with your existing Zod schema (which should coerce booleans)
    const parsed = enrollmentSchema.parse(raw);

    // 3) Extract files (names must match your input ids in the form)
    const files = {
      aadhaarCard: fd.get("aadhaarCard") as File | null,
      photograph: fd.get("photograph") as File | null,
      signature: fd.get("signature") as File | null,
      marksheet: fd.get("marksheet") as File | null,
      paymentReceipt: fd.get("paymentReceipt") as File | null,
    };

    // 5) Upload to Cloudinary in parallel (images + pdf supported)
    const safeName = String(parsed.fullName || "candidate").replace(/\s+/g, "_");

    const [aadhaarRes, photoRes, signRes, marksheetRes, receiptRes] =
      await Promise.all([
        uploadToCloudinary(files.aadhaarCard, `${CLOUD_FOLDER}/aadhaar`, safeName),
        uploadToCloudinary(files.photograph, `${CLOUD_FOLDER}/photo`, safeName),
        uploadToCloudinary(files.signature, `${CLOUD_FOLDER}/signature`, safeName),
        uploadToCloudinary(files.marksheet, `${CLOUD_FOLDER}/marksheet`, safeName),
        uploadToCloudinary(files.paymentReceipt, `${CLOUD_FOLDER}/payment`, safeName),
      ]);

    // 6) Persist
    const doc = await Enrollment.create({
      ...parsed,
      files: {
        aadhaarCard: aadhaarRes,
        photograph: photoRes,
        signature:   signRes,
        marksheet:   marksheetRes,
        paymentReceipt: receiptRes,
      },
    });

    return NextResponse.json(
      {
        message: "Enrollment created",
        enrollmentId: String(doc._id),
        createdAt: doc.createdAt,
      },
      { status: 201 }
    );
  } catch (err: any) {
    if (err?.issues?.length) {
      return NextResponse.json(
        { message: err.issues[0].message, issues: err.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: err?.message || "Something went wrong" },
      { status: 400 }
    );
  }
}
