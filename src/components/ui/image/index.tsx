import Image from "next/image";
import type { ImageProps } from "next/image";

const normalizeSrc = (src: string) => {
    return src.startsWith("/") ? src.slice(1) : src;
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

const myLoader = ({
    src,
    width,
    quality,
}: {
    src: string;
    width: number;
    quality?: number;
}) => {
    return `${src}?w=${width}&q=${quality || 75}`;
};

const MyImage = (props: ImageProps) => {
    return (
        <Image
            loader={
                process.env.NODE_ENV === "production"
                    ? cloudflareLoader
                    : myLoader
            }
            {...props}
        />
    );
};

export default MyImage;
