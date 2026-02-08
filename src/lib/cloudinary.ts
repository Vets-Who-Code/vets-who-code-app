import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export interface UploadOptions {
    folder?: string;
    public_id?: string;
    transformation?: Array<{
        width?: number;
        height?: number;
        crop?: string;
        quality?: string | number;
    }>;
    resource_type?: "image" | "video" | "raw" | "auto";
    allowed_formats?: string[];
}

export interface UploadResult {
    public_id: string;
    version: number;
    signature: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
    created_at: string;
    bytes: number;
    type: string;
    url: string;
    secure_url: string;
}

/**
 * Upload an image to Cloudinary from a base64 string or file path
 * @param file - Base64 string or file path
 * @param options - Upload options including folder, transformations, etc.
 * @returns Upload result with secure URL
 */
export async function uploadImage(
    file: string,
    options: UploadOptions = {}
): Promise<UploadResult> {
    try {
        const defaultOptions = {
            folder: "vets-who-code",
            resource_type: "auto" as const,
            allowed_formats: ["jpg", "jpeg", "png", "gif", "webp", "svg"],
            ...options,
        };

        const result = await cloudinary.uploader.upload(file, defaultOptions);
        return result as UploadResult;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        throw new Error("Failed to upload image to Cloudinary");
    }
}

/**
 * Delete an image from Cloudinary
 * @param publicId - The public ID of the image to delete
 * @returns Deletion result
 */
export async function deleteImage(publicId: string): Promise<{ result: string }> {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        console.error("Error deleting from Cloudinary:", error);
        throw new Error("Failed to delete image from Cloudinary");
    }
}

/**
 * Get optimized image URL from Cloudinary
 * @param publicId - The public ID of the image
 * @param transformations - Image transformation options
 * @returns Optimized image URL
 */
export function getOptimizedImageUrl(
    publicId: string,
    transformations?: {
        width?: number;
        height?: number;
        crop?: string;
        quality?: string | number;
        format?: string;
    }
): string {
    return cloudinary.url(publicId, {
        secure: true,
        transformation: transformations
            ? [
                  {
                      ...transformations,
                      fetch_format: transformations.format || "auto",
                      quality: transformations.quality || "auto",
                  },
              ]
            : [],
    });
}

/**
 * Upload multiple images to Cloudinary
 * @param files - Array of base64 strings or file paths
 * @param options - Upload options
 * @returns Array of upload results
 */
export async function uploadMultipleImages(
    files: string[],
    options: UploadOptions = {}
): Promise<UploadResult[]> {
    try {
        const uploadPromises = files.map((file) => uploadImage(file, options));
        const results = await Promise.all(uploadPromises);
        return results;
    } catch (error) {
        console.error("Error uploading multiple images:", error);
        throw new Error("Failed to upload multiple images to Cloudinary");
    }
}

/**
 * Get a signature for client-side uploads
 * This is used for secure client-side uploads to Cloudinary
 * @param paramsToSign - Parameters to sign
 * @returns Signature and timestamp
 */
export function getUploadSignature(paramsToSign: Record<string, string | number>): {
    signature: string;
    timestamp: number;
} {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
        {
            timestamp,
            ...paramsToSign,
        },
        process.env.CLOUDINARY_API_SECRET as string
    );

    return { signature, timestamp };
}

export interface CloudinaryResource {
    asset_id: string;
    public_id: string;
    format: string;
    version: number;
    resource_type: string;
    type: string;
    created_at: string;
    bytes: number;
    width: number;
    height: number;
    url: string;
    secure_url: string;
    folder?: string;
    tags?: string[];
}

export interface ListImagesOptions {
    folder?: string;
    max_results?: number;
    next_cursor?: string;
    resource_type?: "image" | "video" | "raw";
    type?: "upload" | "private" | "authenticated";
    tags?: boolean;
}

export interface ListImagesResult {
    resources: CloudinaryResource[];
    next_cursor?: string;
    total_count?: number;
}

/**
 * List images from Cloudinary
 * @param options - Options for listing images
 * @returns List of images with pagination
 */
export async function listImages(options: ListImagesOptions = {}): Promise<ListImagesResult> {
    try {
        const defaultOptions = {
            resource_type: "image" as const,
            type: "upload" as const,
            max_results: 30,
            tags: true,
            ...options,
        };

        const result = await cloudinary.api.resources({
            ...defaultOptions,
            prefix: options.folder,
        });

        return {
            resources: result.resources,
            next_cursor: result.next_cursor,
            total_count: result.total_count,
        };
    } catch (error) {
        console.error("Error listing images from Cloudinary:", error);
        throw new Error("Failed to list images from Cloudinary");
    }
}

/**
 * Get images from a specific folder in Cloudinary
 * @param folder - Folder path
 * @param options - Additional options
 * @returns List of images in the folder
 */
export async function getImagesByFolder(
    folder: string,
    options: Omit<ListImagesOptions, "folder"> = {}
): Promise<ListImagesResult> {
    return listImages({ ...options, folder });
}

/**
 * Search for images in Cloudinary using the Search API
 * @param expression - Search expression (e.g., "folder:vets-who-code AND tags:profile")
 * @param options - Search options
 * @returns Search results
 */
export async function searchImages(
    expression: string,
    options: {
        max_results?: number;
        next_cursor?: string;
        sort_by?: Array<{ [key: string]: "asc" | "desc" }>;
    } = {}
): Promise<ListImagesResult> {
    try {
        const search = cloudinary.search
            .expression(expression)
            .max_results(options.max_results || 30);

        if (options.sort_by) {
            options.sort_by.forEach((sort) => {
                const [field, order] = Object.entries(sort)[0];
                search.sort_by(field, order);
            });
        }

        if (options.next_cursor) {
            search.next_cursor(options.next_cursor);
        }

        const result = await search.execute();

        return {
            resources: result.resources,
            next_cursor: result.next_cursor,
            total_count: result.total_count,
        };
    } catch (error) {
        console.error("Error searching images in Cloudinary:", error);
        throw new Error("Failed to search images in Cloudinary");
    }
}

/**
 * Get a single image resource by public ID
 * @param publicId - The public ID of the image
 * @returns Image resource details
 */
export async function getImageByPublicId(publicId: string): Promise<CloudinaryResource> {
    try {
        const result = await cloudinary.api.resource(publicId, {
            resource_type: "image",
        });
        return result as CloudinaryResource;
    } catch (error) {
        console.error("Error fetching image from Cloudinary:", error);
        throw new Error("Failed to fetch image from Cloudinary");
    }
}

/**
 * List all folders in Cloudinary
 * @returns List of folders
 */
export async function listFolders(): Promise<
    Array<{
        name: string;
        path: string;
    }>
> {
    try {
        const result = await cloudinary.api.root_folders();
        return result.folders;
    } catch (error) {
        console.error("Error listing folders from Cloudinary:", error);
        throw new Error("Failed to list folders from Cloudinary");
    }
}

/**
 * Get subfolders within a folder
 * @param folder - Parent folder path
 * @returns List of subfolders
 */
export async function getSubfolders(folder: string): Promise<
    Array<{
        name: string;
        path: string;
    }>
> {
    try {
        const result = await cloudinary.api.sub_folders(folder);
        return result.folders;
    } catch (error) {
        console.error("Error getting subfolders from Cloudinary:", error);
        throw new Error("Failed to get subfolders from Cloudinary");
    }
}

export default cloudinary;
