import clsx from "clsx";
import { ImageType } from "@utils/types";

type TProps = {
    name: string;
    designation: string;
    review: string;
    image: ImageType;
    className?: string;
};

const Testimonial = ({ name, designation, review, image, className }: TProps) => {
    return (
        <div
            className={clsx(
                "testimonial tw:flex tw:h-full tw:flex-wrap tw:rounded-sm tw:bg-white tw:px-7 tw:py-8 tw:shadow-md tw:shadow-dark/10 tw:md:py-10",
                className
            )}
        >
            {image?.src && (
                <figure className="image tw:w-[70px] tw:flex-auto0">
                    <img
                        src={image.src}
                        alt={image?.alt || name}
                        width={image?.width || 70}
                        height={image?.height || 70}
                        loading={image?.loading || "lazy"}
                        className="tw:rounded-full"
                    />
                </figure>
            )}

            <div className="content tw:w-full tw:flex-auto0 tw:pt-5 tw:md:w-[calc(100%-70px)] tw:md:pl-[30px] tw:md:pt-0">
                <p className="tw:mb-6 tw:text-lg tw:font-medium tw:leading-relaxed tw:md:mb-[34px]">
                    {review}
                </p>
                <h3 className="tw:mb-0 tw:text-h6 tw:uppercase tw:tracking-wider">{name}</h3>
                <span className="tw:mt-2 tw:block tw:text-md tw:text-gray-300 tw:md:mt-[11px]">
                    {designation}
                </span>
            </div>
        </div>
    );
};

export default Testimonial;
