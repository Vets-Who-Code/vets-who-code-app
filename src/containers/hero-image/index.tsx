import { ImageType } from "@utils/types";
import Image from "next/image";

type TProps = {
    data: {
        images?: ImageType[];
    };
};

const HeroImageArea = ({ data: { images } }: TProps) => (
    <div className="hero-image-section md:tw-mb-[240px]">
        {images?.[0]?.src && (
            <div className="tw-relative tw-z-10 tw-mx-auto tw-max-w-[970px] tw-rounded child:tw-mx-auto md:-tw-bottom-[240px] md:-tw-mt-[240px]">
                <Image
                    className="image"
                    src={images[0].src}
                    alt={images[0]?.alt || ""}
                    width={837}
                    height={522}
                    priority={true}
                    sizes="(max-width: 837px) 100vw, 837px"
                />
            </div>
        )}
    </div>
);

export default HeroImageArea;
