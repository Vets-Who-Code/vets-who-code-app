import { getAllBlogs } from './blog';

export interface BlogImageInfo {
  blogTitle: string;
  blogSlug: string;
  imageUrl: string;
  isCloudinary: boolean;
  publicId?: string;
}

/**
 * Get all images used in blog posts
 * @returns Array of blog image information
 */
export function getAllBlogImages(): BlogImageInfo[] {
  const { blogs } = getAllBlogs(['title', 'slug', 'image']);

  return blogs
    .filter((blog) => blog.image?.src)
    .map((blog) => {
      const imageUrl = blog.image.src;
      const isCloudinary = imageUrl.includes('cloudinary.com');

      let publicId: string | undefined;
      if (isCloudinary) {
        // Extract public ID from Cloudinary URL
        // Format: https://res.cloudinary.com/vetswhocode/image/upload/v1234567890/folder/image.ext
        const match = imageUrl.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/);
        if (match) {
          publicId = match[1];
        }
      }

      return {
        blogTitle: blog.title,
        blogSlug: blog.slug,
        imageUrl,
        isCloudinary,
        publicId,
      };
    });
}

/**
 * Get blogs that don't use Cloudinary images
 * @returns Array of blogs using non-Cloudinary images
 */
export function getBlogsWithoutCloudinaryImages(): BlogImageInfo[] {
  const allImages = getAllBlogImages();
  return allImages.filter((img) => !img.isCloudinary);
}

/**
 * Get blogs that use Cloudinary images
 * @returns Array of blogs using Cloudinary images
 */
export function getBlogsWithCloudinaryImages(): BlogImageInfo[] {
  const allImages = getAllBlogImages();
  return allImages.filter((img) => img.isCloudinary);
}

/**
 * Get statistics about blog images
 * @returns Object with image statistics
 */
export function getBlogImageStats() {
  const allImages = getAllBlogImages();
  const cloudinaryImages = allImages.filter((img) => img.isCloudinary);
  const localImages = allImages.filter((img) => !img.isCloudinary);

  return {
    total: allImages.length,
    cloudinary: cloudinaryImages.length,
    local: localImages.length,
    cloudinaryPercentage: Math.round((cloudinaryImages.length / allImages.length) * 100),
  };
}

/**
 * Get unique Cloudinary public IDs used in blogs
 * @returns Array of unique public IDs
 */
export function getUniqueCloudinaryPublicIds(): string[] {
  const allImages = getAllBlogImages();
  const publicIds = allImages
    .filter((img) => img.isCloudinary && img.publicId)
    .map((img) => img.publicId as string);

  return Array.from(new Set(publicIds));
}
