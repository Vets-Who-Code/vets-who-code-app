import clsx from "clsx";
import { ImageType } from "@utils/types";

type TProps = {
    name: string;
    designation: string;
    review: string;
    image: ImageType;
    className?: string;
};

const Testimonial = ({
    name,
    designation,
    review,
    image,
    className,
}: TProps) => {
    return (
        <div
            className={clsx(
                "testimonial tw-flex tw-flex-wrap tw-h-full tw-py-8 tw-px-7 md:tw-py-10 tw-rounded tw-bg-white tw-shadow-md tw-shadow-dark/10",
                className
            )}
        >
            {image?.src && (
                <figure className="image tw-flex-auto0 tw-w-[70px]">
                    <img
                        src={image.src}
                        alt={image?.alt || name}
                        width={image?.width || 70}
                        height={image?.height || 70}
                        loading={image?.loading || "lazy"}
                        className="tw-rounded-full"
                    />
                </figure>
            )}

            <div className="content tw-flex-auto0 tw-w-full tw-pt-5 md:tw-pt-0 md:tw-pl-[30px] md:tw-w-[calc(100%_-_70px)]">
                <p className="tw-text-lg tw-font-medium tw-leading-relaxed tw-mb-6 md:tw-mb-[34px]">
                    {review}
                </p>
                <h3 className="tw-mb-0 tw-tracking-wider tw-uppercase tw-text-h6">
                    {name}
                </h3>
                <span className="tw-text-md tw-block tw-mt-2 md:tw-mt-[11px] tw-text-gray-300">
                    {designation}
                </span>
            </div>
        </div>
    );
};

export default Testimonial;
