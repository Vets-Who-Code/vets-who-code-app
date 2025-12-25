import Image from "next/image";
import type { ImageProps } from "next/image";

const normalizeSrc = (src: string) => {
    return src.startsWith("/") ? src.slice(1) : src;
};

const isCloudinaryUrl = (src: string) => {
    return src.includes("cloudinary.com") || src.includes("res.cloudinary.com");
};

const cloudflareLoader = ({
    src,
    width,
    quality,
}: {
    src: string;
    width: number;
    quality?: number;
}) => {
    const params = [`width=${width}`];
    if (quality) {
        params.push(`quality=${quality}`);
    }
    const paramsString = params.join(",");
    return `/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}`;
};

const cloudinaryLoader = ({
    src,
    width,
    quality,
}: {
    src: string;
    width: number;
    quality?: number;
}) => {
    // If the URL already contains transformations, return as-is
    if (src.includes("/image/upload/")) {
        // Extract the base URL and public ID
        const parts = src.split("/upload/");
        if (parts.length === 2) {
            const [baseUrl, publicId] = parts;
            // Insert transformations after /upload/
            const transformations = `w_${width},q_${quality || "auto"},f_auto`;
            return `${baseUrl}/upload/${transformations}/${publicId}`;
        }
    }
    // If it's a complete Cloudinary URL without transformations, return with query params
    return `${src}?w=${width}&q=${quality || "auto"}`;
};

const myLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
};

const MyImage = (props: ImageProps) => {
    // Determine which loader to use based on the image source
    let loader = process.env.NODE_ENV === "production" ? cloudflareLoader : myLoader;

    // Use Cloudinary loader if the source is a Cloudinary URL
    if (props.src && typeof props.src === "string" && isCloudinaryUrl(props.src)) {
        loader = cloudinaryLoader;
    }

    return (
        <Image
            loader={loader}
            {...props}
        />
    );
};

export default MyImage;
