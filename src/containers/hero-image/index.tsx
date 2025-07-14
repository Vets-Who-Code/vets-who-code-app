import { ImageType } from "@utils/types";

type TProps = {
    data: {
        images?: ImageType[];
    };
};

const HeroImageArea = ({ data: { images } }: TProps) => (
    <div className="hero-image-section tw:md:mb-[240px]">
        {images?.[0]?.src && (
            <div className="tw:relative tw:z-10 tw:mx-auto tw:max-w-[970px] tw:rounded-sm tw:child:mx-auto tw:md:-bottom-[240px] tw:md:-mt-[240px]">
                <img
                    className="image"
                    src={images[0].src}
                    alt={images[0]?.alt || "Hero"}
                    width={837}
                    height={522}
                />
            </div>
        )}
    </div>
);

export default HeroImageArea;
