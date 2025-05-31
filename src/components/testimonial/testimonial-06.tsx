import clsx from "clsx";
import StarRating from "@ui/star-rating";
import { ImageType } from "@utils/types";

type TProps = {
    name: string;
    designation: string;
    review: string;
    image: ImageType;
    rating: number;
    className?: string;
};

const Testimonial = ({ name, designation, review, image, rating, className }: TProps) => {
    return (
        <div
            className={clsx(
                "testimonial tw-flex tw-h-full tw-flex-wrap tw-rounded tw-bg-white tw-px-[50px] tw-pb-[47px] tw-pt-[31px] tw-shadow-2sm tw-shadow-dark/10",
                className
            )}
        >
            <div className="tw-mb-5 tw-flex tw-items-center">
                {image?.src && (
                    <figure className="image tw-w-[90px] tw-flex-auto0">
                        <img
                            src={image.src}
                            alt={image?.alt || name}
                            width={image?.width || 90}
                            height={image?.height || 90}
                            loading={image?.loading || "lazy"}
                            className="tw-rounded-full"
                        />
                    </figure>
                )}
                <div className="tw-pl-7.5">
                    <StarRating rating={rating} align="left" className="tw-mb-[11px]" />
                    <h3 className="tw-mb-0 tw-inline-block tw-text-h6 tw-uppercase tw-tracking-wider">
                        {name}
                    </h3>
                    <span className="tw-ml-3.5 tw-inline-block tw-text-md tw-text-gray-300">
                        / {designation}
                    </span>
                </div>
            </div>

            <p className="tw-mb-6 tw-text-lg tw-font-medium tw-leading-relaxed md:tw-mb-[34px]">
                {review}
            </p>
        </div>
    );
};

export default Testimonial;
