/**
 * Cloudinary Helper Functions
 * Utility functions to generate optimized Cloudinary URLs from public IDs
 */

export interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  crop?: 'fill' | 'fit' | 'scale' | 'limit' | 'pad' | 'crop' | 'thumb';
  quality?: 'auto' | 'auto:best' | 'auto:good' | 'auto:eco' | 'auto:low' | number;
  format?: 'auto' | 'webp' | 'jpg' | 'png' | 'avif';
  gravity?: 'auto' | 'center' | 'face' | 'faces' | 'north' | 'south' | 'east' | 'west';
  dpr?: 'auto' | number;
  flags?: string[];
}

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'vetswhocode';

/**
 * Generate an optimized Cloudinary URL from a public ID
 * @param publicId - The Cloudinary public ID (e.g., "blog_header_nmrhob" or "v1714768089/blog_header_nmrhob")
 * @param options - Transformation options
 * @returns Full Cloudinary URL with transformations
 */
export function getCloudinaryUrl(
  publicId: string,
  options: CloudinaryTransformOptions = {}
): string {
  if (!publicId) {
    return '';
  }

  // Default transformations - keep it simple to match original URLs
  const defaultOptions: CloudinaryTransformOptions = {
    format: 'auto',
    quality: 'auto',
    gravity: 'auto',
  };

  const mergedOptions = { ...defaultOptions, ...options };

  // Build transformation string
  const transformations: string[] = [];

  if (mergedOptions.width) {
    transformations.push(`w_${mergedOptions.width}`);
  }

  if (mergedOptions.height) {
    transformations.push(`h_${mergedOptions.height}`);
  }

  if (mergedOptions.crop) {
    transformations.push(`c_${mergedOptions.crop}`);
  }

  if (mergedOptions.quality) {
    transformations.push(`q_${mergedOptions.quality}`);
  }

  if (mergedOptions.format) {
    transformations.push(`f_${mergedOptions.format}`);
  }

  if (mergedOptions.gravity) {
    transformations.push(`g_${mergedOptions.gravity}`);
  }

  if (mergedOptions.dpr) {
    transformations.push(`dpr_${mergedOptions.dpr}`);
  }

  if (mergedOptions.flags && mergedOptions.flags.length > 0) {
    mergedOptions.flags.forEach((flag) => {
      transformations.push(`fl_${flag}`);
    });
  }

  const transformString = transformations.join(',');

  // Clean up the public ID (remove leading slashes)
  const cleanPublicId = publicId.trim();

  // Build the URL
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformString}/${cleanPublicId}`;
}

/**
 * Generate a blog header image URL with standard transformations
 * @param imageSource - The Cloudinary public ID or full URL
 * @returns Optimized blog header URL
 */
export function getBlogHeaderUrl(imageSource: string): string {
  if (!imageSource) {
    return '';
  }

  // If it's already a full URL, return it as-is
  if (imageSource.startsWith('http://') || imageSource.startsWith('https://')) {
    return imageSource;
  }

  // Otherwise, treat it as a public ID and generate the URL with blog header optimizations
  return getCloudinaryUrl(imageSource, {
    width: 1200,
    crop: 'limit',
    quality: 'auto',
    format: 'auto',
    gravity: 'auto',
  });
}

/**
 * Generate a blog thumbnail image URL with standard transformations
 * @param publicId - The Cloudinary public ID
 * @returns Optimized blog thumbnail URL
 */
export function getBlogThumbnailUrl(publicId: string): string {
  return getCloudinaryUrl(publicId, {
    width: 400,
    height: 300,
    crop: 'fill',
    quality: 'auto',
    format: 'auto',
    gravity: 'auto',
  });
}

/**
 * Extract public ID from a Cloudinary URL
 * @param url - Full Cloudinary URL
 * @returns Public ID or null if not a valid Cloudinary URL
 */
export function extractPublicIdFromUrl(url: string): string | null {
  if (!url || !url.includes('cloudinary.com')) {
    return null;
  }

  try {
    // Match pattern: /upload/[transformations]/[version]/[public_id].[extension]
    // or: /upload/[version]/[public_id].[extension]
    const match = url.match(/\/upload\/(?:.*?\/)?(v\d+\/)?(.+?)(?:\.[^.]+)?$/);

    if (match) {
      // Combine version and public_id if version exists
      const version = match[1] || '';
      const publicId = match[2];
      return version + publicId;
    }

    return null;
  } catch (error) {
    console.error('Error extracting public ID from URL:', error);
    return null;
  }
}

/**
 * Check if a URL is a Cloudinary URL
 * @param url - URL to check
 * @returns True if URL is from Cloudinary
 */
export function isCloudinaryUrl(url: string): boolean {
  return url.includes('cloudinary.com') || url.includes('res.cloudinary.com');
}

/**
 * Get image URL - accepts either a public ID or a full URL
 * If it's already a URL, return it as-is
 * If it's a public ID, generate the Cloudinary URL
 * @param imageSource - Either a public ID or full URL
 * @param options - Transformation options (only used if imageSource is a public ID)
 * @returns Image URL
 */
export function getImageUrl(
  imageSource: string,
  options?: CloudinaryTransformOptions
): string {
  if (!imageSource) {
    return '';
  }

  // If it's already a full URL, return it
  if (imageSource.startsWith('http://') || imageSource.startsWith('https://')) {
    return imageSource;
  }

  // Otherwise, treat it as a public ID and generate the URL
  return getCloudinaryUrl(imageSource, options);
}
