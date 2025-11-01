
// ---- S3 (AWS SDK v3) ----
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

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
export async function uploadToS3(
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