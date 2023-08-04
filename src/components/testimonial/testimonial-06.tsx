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

const Testimonial = ({
    name,
    designation,
    review,
    image,
    rating,
    className,
}: TProps) => {
    return (
        <div
            className={clsx(
                "testimonial tw-flex tw-flex-wrap tw-h-full tw-pt-[31px] tw-pb-[47px] tw-px-[50px] tw-rounded tw-bg-white tw-shadow-2sm tw-shadow-dark/10",
                className
            )}
        >
            <div className="tw-flex tw-items-center tw-mb-5">
                {image?.src && (
                    <figure className="image tw-flex-auto0 tw-w-[90px]">
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
                    <StarRating
                        rating={rating}
                        align="left"
                        className="tw-mb-[11px]"
                    />
                    <h3 className="tw-mb-0 tw-tracking-wider tw-uppercase tw-inline-block tw-text-h6">
                        {name}
                    </h3>
                    <span className="tw-text-md tw-inline-block tw-text-gray-300 tw-ml-3.5">
                        / {designation}
                    </span>
                </div>
            </div>

            <p className="tw-text-lg tw-font-medium tw-leading-relaxed tw-mb-6 md:tw-mb-[34px]">
                {review}
            </p>
        </div>
    );
};

export default Testimonial;
