import { UpdateQuery } from "mongoose";
import Application from "../../../../../models/applicationModel";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { log } from "console";
import { uploadToS3 } from "@/utils/fileUpload";

const BASE_FOLDER = "applications";

async function upsertByUserId(
  userId: string,
  dataToSet: UpdateQuery<any>
): Promise<any> {
  const doc = await Application.findOneAndUpdate(
    { userId },
    { $set: dataToSet },
    { new: true, upsert: true }
  );
  return doc;
};

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.formData();

    const userId = (body.get("userId") as string) || "";

    // Extract files or existing URLs (FormData may contain File objects OR strings with previously uploaded URLs)
    const photoRaw = body.get("photo");
    const signatureRaw = body.get("signature");
    const marksheet10Plus2Raw = body.get("marksheet10Plus2");
    const categoryCertificateRaw = body.get("categoryCertificate");
    const disabilityCertificateRaw = body.get("disabilityCertificate");
    const experienceProofsRaw = body.getAll("experienceProofs");
    const otherDocumentRaw = body.get("otherDocument");

    // Helper: given a FormData entry which may be a File or a URL string, return a Promise that
    // - uploads the File via uploadToS3 (resolves to upload info object)
    // - or resolves to an object with { url: existingUrl } when a URL string is provided
    // - or resolves to null when nothing to do
    const makeUploadOrUseUrl = (val: any, folder: string, filename: string) => {
      if (!val) return Promise.resolve(null);
      // In Node's FormData polyfill, File is instance of global File; in runtime check instanceof File
      if (val instanceof File) {
        return uploadToS3(val, folder, filename);
      }
      // If it's a string and looks like a URL, treat it as an existing uploaded URL
      if (typeof val === "string") {
        const text = val.trim();
        if (text.startsWith("http://") || text.startsWith("https://") || text.startsWith("/")) {
          return Promise.resolve({ url: text });
        }
      }
      return Promise.resolve(null);
    };

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User not found with this userId!! First login" },
        { status: 400 }
      );
    }

    // Create a safe prefix for uploaded filenames to avoid collisions
    const safeName = `${userId}_${Date.now()}`;

    // Prepare upload/use-URL promises — handle absent values gracefully
    const photoPromise = makeUploadOrUseUrl(photoRaw, `${BASE_FOLDER}/photo`, `${safeName}_photo`);
    const signaturePromise = makeUploadOrUseUrl(signatureRaw, `${BASE_FOLDER}/signature`, `${safeName}_signature`);
    const marksheetPromise = makeUploadOrUseUrl(marksheet10Plus2Raw, `${BASE_FOLDER}/marksheet10Plus2`, `${safeName}_marksheet`);
    const categoryPromise = makeUploadOrUseUrl(categoryCertificateRaw, `${BASE_FOLDER}/categoryCertificate`, `${safeName}_category`);
    const disabilityPromise = makeUploadOrUseUrl(disabilityCertificateRaw, `${BASE_FOLDER}/disabilityCertificate`, `${safeName}_disability`);

    // Multiple experience proof files — may contain Files or URL strings. Map each entry to a promise
    const experiencePromises = (experienceProofsRaw && experienceProofsRaw.length > 0)
      ? Promise.all(
          experienceProofsRaw
            .filter(Boolean)
            .map((f: any, idx: number) =>
              // reuse helper: if File -> upload, if URL string -> resolve with {url}
              makeUploadOrUseUrl(f, `${BASE_FOLDER}/experienceProofs`, `${safeName}_exp_${idx}`)
            )
        )
      : Promise.resolve([]);

    const otherDocPromise = makeUploadOrUseUrl(otherDocumentRaw, `${BASE_FOLDER}/otherDocument`, `${safeName}_other`);

    const [
      photoFile,
      signatureFile,
      marksheet10Plus2File,
      categoryCertificateFile,
      disabilityCertificateFile,
      experienceProofFiles,
      otherDocumentFile,
    ] = await Promise.all([
      photoPromise,
      signaturePromise,
      marksheetPromise,
      categoryPromise,
      disabilityPromise,
      experiencePromises,
      otherDocPromise,
    ]);

    // The upload helpers return objects with info (url, key, etc.).
    // The schema expects string references, so persist URLs (or keys) only.
    const pickUrlOrKey = (o: any) => {
      if (!o) return null;
      if (typeof o === "string") return o;
      // prefer url, fallback to key
      return (o.url as string) || (o.key as string) || null;
    };

    const dataToSet = {
      photoFile: pickUrlOrKey(photoFile),
      signatureFile: pickUrlOrKey(signatureFile),
      marksheet10Plus2File: pickUrlOrKey(marksheet10Plus2File),
      categoryCertificateFile: pickUrlOrKey(categoryCertificateFile),
      disabilityCertificateFile: pickUrlOrKey(disabilityCertificateFile),
      experienceProofFiles: Array.isArray(experienceProofFiles)
        ? experienceProofFiles.map((f: any) => pickUrlOrKey(f)).filter(Boolean)
        : [],
      otherDocumentFile: pickUrlOrKey(otherDocumentFile),
      currentStep: 5,
    };

    const doc = await upsertByUserId(userId, dataToSet);

    return NextResponse.json({ success: true, application: doc });
  } catch (err: any) {
    console.error("step5 error", err);
    return NextResponse.json(
      {
        success: false,
        message: "step5 failed",
        error: err.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}