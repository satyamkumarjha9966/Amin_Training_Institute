// app/api/enrollments/route.ts
import { NextRequest, NextResponse } from "next/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { randomUUID } from "crypto";

// ⬇️ Your own imports
import { Enrollment } from "../../../../models/Enrollment"; // Mongoose model
import { enrollmentSchema } from "@/lib/validators/enrollment"; // Zod schema

// ---- S3 (AWS SDK v3) ----
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const S3_REGION = process.env.S3_REGION!;
const S3_BUCKET = process.env.S3_BUCKET!;
// const S3_PUBLIC_BASE_URL = process.env.S3_PUBLIC_BASE_URL; // optional CDN/domain

const s3 = new S3Client({
  region: S3_REGION,
  credentials: {
    accessKeyId: process.env.S3AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3AWS_SECRET_ACCESS_KEY!,
  },
});

// ---- Upload constraints (kept same as your Cloudinary version) ----
const BASE_FOLDER = process.env.CLOUDINARY_FOLDER || "enrollments"; // just reusing the name
const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "application/pdf"]);

// Build a public URL if your bucket is public or fronted by CloudFront
function buildPublicUrl(key: string) {
  // if (S3_PUBLIC_BASE_URL) {
  //   return `${S3_PUBLIC_BASE_URL.replace(/\/+$/, "")}/${key}`;
  // }
  return `https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com/${key}`;
}

function pickExtByMime(mime: string) {
  switch (mime) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "application/pdf":
      return "pdf";
    default:
      return "bin";
  }
}

// Upload a File (from formData) to S3
async function uploadToS3(
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

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const safePrefix = String(publicIdPrefix || "candidate").replace(/\s+/g, "_");
  const ext = pickExtByMime(file.type);

  // Key example: enrollments/photo/John_Doe-<ts>-<uuid>.jpg
  const key = `${folder.replace(/\/+$/, "")}/${safePrefix}-${Date.now()}-${randomUUID()}.${ext}`;

  const put = new PutObjectCommand({
    Bucket: S3_BUCKET,
    Key: key,
    Body: buffer,
    ContentType: file.type,
    // If bucket uses ACLs and must be public, uncomment next line:
    // ACL: "public-read",
  });

  const result = await s3.send(put);

  return {
    url: buildPublicUrl(key), // Will work only if public/CF in front
    key,
    bucket: S3_BUCKET,
    etag: result.ETag,
    bytes: buffer.byteLength,
    mimeType: file.type,
  };
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

    // Next 15: formData() works on Node runtime
    const fd = await req.formData();

    // 1) Scalars (must match your frontend field names)
    const scalarKeys = [
      "fullName","dateOfBirth","gender","mobileNumber","email","parentName",
      "permanentAddress","city","state","pinCode","aadhaarNumber","panNumber",
      "highestQualification","institutionName","yearOfPassing",
      "selectedCourse","learningMode","batchTime","hearAboutUs",
      "paymentMode","transactionId","infoDeclaration","termsAccepted",
    ] as const;

    const raw: Record<string, any> = {};
    scalarKeys.forEach((k) => (raw[k] = fd.get(k)));

    // 2) Validate with Zod (your schema should coerce booleans etc.)
    const parsed = enrollmentSchema.parse(raw);

    // 3) Files (names must match your <input name="...">)
    const files = {
      aadhaarCard: fd.get("aadhaarCard") as File | null,
      photograph: fd.get("photograph") as File | null,
      signature: fd.get("signature") as File | null,
      marksheet: fd.get("marksheet") as File | null,
      paymentReceipt: fd.get("paymentReceipt") as File | null,
    };

    // 4) Upload all in parallel
    const safeName = String(parsed.fullName || "candidate").replace(/\s+/g, "_");

    const [aadhaarRes, photoRes, signRes, marksheetRes, receiptRes] =
      await Promise.all([
        uploadToS3(files.aadhaarCard, `${BASE_FOLDER}/aadhaar`, safeName),
        uploadToS3(files.photograph, `${BASE_FOLDER}/photo`, safeName),
        uploadToS3(files.signature, `${BASE_FOLDER}/signature`, safeName),
        uploadToS3(files.marksheet, `${BASE_FOLDER}/marksheet`, safeName),
        uploadToS3(files.paymentReceipt, `${BASE_FOLDER}/payment`, safeName),
      ]);

    // 5) Persist to Mongo
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
    // Zod error shape
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
