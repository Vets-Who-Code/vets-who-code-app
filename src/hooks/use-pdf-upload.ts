import { useCallback, useState } from "react";

const MAX_SIZE_MB = 5;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

const ACCEPTED_TYPES = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

interface UsePdfUploadReturn {
    upload: (file: File) => Promise<string>;
    uploading: boolean;
    error: string | null;
    progress: number;
    fileName: string | null;
    reset: () => void;
}

export default function usePdfUpload(): UsePdfUploadReturn {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);
    const [fileName, setFileName] = useState<string | null>(null);

    const reset = useCallback(() => {
        setUploading(false);
        setError(null);
        setProgress(0);
        setFileName(null);
    }, []);

    const upload = useCallback(
        async (file: File): Promise<string> => {
            setUploading(true);
            setError(null);
            setProgress(0);
            setFileName(file.name);

            try {
                // Validate file type
                if (!ACCEPTED_TYPES.includes(file.type)) {
                    throw new Error(
                        "Please upload a PDF or DOCX file. Other formats are not supported."
                    );
                }

                // Validate file size
                if (file.size > MAX_SIZE_BYTES) {
                    throw new Error(
                        `File is too large. Maximum size is ${MAX_SIZE_MB}MB.`
                    );
                }

                setProgress(20);

                // Determine file type for the API
                const fileType = file.type === "application/pdf" ? "pdf" : "docx";

                // Convert to base64
                const base64 = await new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        const result = reader.result as string;
                        // Strip data URL prefix
                        const base64Data = result.split(",")[1];
                        resolve(base64Data);
                    };
                    reader.onerror = () =>
                        reject(new Error("Failed to read file"));
                    reader.readAsDataURL(file);
                });

                setProgress(50);

                // Send to API
                const response = await fetch(
                    "/api/military-resume/parse-pdf",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ pdf: base64, fileType }),
                    }
                );

                setProgress(80);

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.error || "Failed to parse file"
                    );
                }

                setProgress(100);
                setUploading(false);
                return data.text;
            } catch (err) {
                const message =
                    err instanceof Error ? err.message : "Failed to parse file";
                setError(message);
                setUploading(false);
                setFileName(null);
                throw err;
            }
        },
        []
    );

    return { upload, uploading, error, progress, fileName, reset };
}
