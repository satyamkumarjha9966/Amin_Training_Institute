"use client";

interface FileRenderProps {
  file: File | null | string;
}

export function FileRender({ file }: FileRenderProps) {
  // If no file provided, render nothing
  if (!file) return null;

  return (
    <div className="mt-2 relative w-32 h-32 border rounded-lg overflow-hidden">
      {(() => {
        // determine source and whether it's a PDF
        const src =
          file instanceof File ? URL.createObjectURL(file) : (file as string);
        const isPdf =
          file instanceof File
            ? file.type === "application/pdf"
            : typeof file === "string" &&
              (file as string).toLowerCase().endsWith(".pdf");

        if (isPdf) {
          // Render a PDF viewer using <object> with a fallback link.
          return (
            <object
              data={src}
              type="application/pdf"
              className="w-full h-full"
              aria-label="PDF preview"
              onLoad={(e: any) => {
                // attempt to revoke created object URL when possible
                if (file instanceof File) {
                  try {
                    URL.revokeObjectURL(src);
                  } catch (err) {}
                }
              }}
            >
              <div className="p-2 text-xs text-center">
                <p>PDF preview not supported in this browser.</p>
                <a
                  href={src}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-600 underline"
                >
                  Open PDF
                </a>
              </div>
            </object>
          );
        }

        // default: render image preview
        return (
          <img
            src={src}
            alt="Photo preview"
            className="w-full h-full object-contain"
            onLoad={(e) => {
              // Clean up object URL after image loads to avoid memory leaks
              if (file instanceof File) {
                const target = e.target as HTMLImageElement;
                try {
                  URL.revokeObjectURL(target.src);
                } catch (err) {}
              }
            }}
          />
        );
      })()}
    </div>
  );
}
