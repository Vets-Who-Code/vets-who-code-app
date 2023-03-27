import { ImageType } from "@utils/types";

type TProps = {
    data: {
        images?: ImageType[];
    };
};

const HeroImageArea = ({ data: { images } }: TProps) => (
    <div className="hero-image-section md:tw-mb-[240px]">
        {images?.[0]?.src && (
            <div className="tw-relative tw-z-10 tw-max-w-[970px] tw-mx-auto tw-rounded child:tw-mx-auto md:-tw-mt-[240px] md:-tw-bottom-[240px]">
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
