import { useCallback, useState } from "react";

interface UploadOptions {
    folder?: string;
    public_id?: string;
    maxSizeInMB?: number;
    allowedFormats?: string[];
}

interface UploadResult {
    url: string;
    public_id: string;
}

interface UseImageUploadReturn {
    upload: (file: File, options?: UploadOptions) => Promise<UploadResult>;
    uploadMultiple: (files: File[], options?: UploadOptions) => Promise<UploadResult[]>;
    uploading: boolean;
    error: string | null;
    progress: number;
    reset: () => void;
}

/**
 * Custom hook for uploading images to Cloudinary
 * @param defaultOptions - Default options for all uploads
 */
export function useImageUpload(defaultOptions?: UploadOptions): UseImageUploadReturn {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);

    const reset = useCallback(() => {
        setUploading(false);
        setError(null);
        setProgress(0);
    }, []);

    const validateFile = useCallback(
        (file: File, options?: UploadOptions): string | null => {
            const opts = { ...defaultOptions, ...options };

            // Check file size
            const maxSizeInBytes = (opts.maxSizeInMB || 10) * 1024 * 1024;
            if (file.size > maxSizeInBytes) {
                return `File size exceeds ${opts.maxSizeInMB || 10}MB limit`;
            }

            // Check file format
            const allowedFormats = opts.allowedFormats || [
                "image/jpeg",
                "image/jpg",
                "image/png",
                "image/gif",
                "image/webp",
                "image/svg+xml",
            ];
            if (!allowedFormats.includes(file.type)) {
                return `File format not allowed. Allowed formats: ${allowedFormats.join(", ")}`;
            }

            return null;
        },
        [defaultOptions]
    );

    const fileToBase64 = useCallback((file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    }, []);

    const upload = useCallback(
        async (file: File, options?: UploadOptions): Promise<UploadResult> => {
            setUploading(true);
            setError(null);
            setProgress(0);

            try {
                // Validate file
                const validationError = validateFile(file, options);
                if (validationError) {
                    throw new Error(validationError);
                }

                setProgress(30);

                // Convert file to base64
                const base64 = await fileToBase64(file);
                setProgress(50);

                // Upload to Cloudinary via API
                const response = await fetch("/api/upload/image", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        file: base64,
                        folder: options?.folder || defaultOptions?.folder,
                        public_id: options?.public_id || defaultOptions?.public_id,
                    }),
                });

                setProgress(80);

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || "Upload failed");
                }

                const data = await response.json();
                setProgress(100);

                if (!data.success || !data.url || !data.public_id) {
                    throw new Error("Invalid response from upload API");
                }

                setUploading(false);
                return {
                    url: data.url,
                    public_id: data.public_id,
                };
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "Upload failed";
                setError(errorMessage);
                setUploading(false);
                throw err;
            }
        },
        [defaultOptions, validateFile, fileToBase64]
    );

    const uploadMultiple = useCallback(
        async (files: File[], options?: UploadOptions): Promise<UploadResult[]> => {
            setUploading(true);
            setError(null);
            setProgress(0);

            try {
                // Validate all files
                for (const file of files) {
                    const validationError = validateFile(file, options);
                    if (validationError) {
                        throw new Error(`${file.name}: ${validationError}`);
                    }
                }

                setProgress(20);

                // Convert all files to base64
                const base64Files = await Promise.all(files.map((file) => fileToBase64(file)));
                setProgress(50);

                // Upload to Cloudinary via API
                const response = await fetch("/api/upload/image", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        files: base64Files,
                        folder: options?.folder || defaultOptions?.folder,
                    }),
                });

                setProgress(80);

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || "Upload failed");
                }

                const data = await response.json();
                setProgress(100);

                if (!data.success || !data.urls || !data.public_ids) {
                    throw new Error("Invalid response from upload API");
                }

                const results = data.urls.map((url: string, index: number) => ({
                    url,
                    public_id: data.public_ids[index],
                }));

                setUploading(false);
                return results;
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "Upload failed";
                setError(errorMessage);
                setUploading(false);
                throw err;
            }
        },
        [defaultOptions, validateFile, fileToBase64]
    );

    return {
        upload,
        uploadMultiple,
        uploading,
        error,
        progress,
        reset,
    };
}
