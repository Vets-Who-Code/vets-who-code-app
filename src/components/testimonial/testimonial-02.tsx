import clsx from "clsx";
import { ImageType, ItemType } from "@utils/types";

type TProps = Pick<ItemType, "title" | "description" | "name" | "designation"> & {
    image: ImageType;
    className?: string;
};

const Testimonial = ({ title, description, name, designation, image, className }: TProps) => {
    return (
        <div
            className={clsx(
                "testimonial tw-h-full tw-rounded tw-bg-white tw-px-5 tw-py-7.5 md:tw-pb-9 md:tw-pl-[50px] md:tw-pr-7.5 md:tw-pt-[41px]",
                className
            )}
        >
            <h3 className="tw-mb-3.5 tw-text-xl tw-leading-relaxed">{title}</h3>
            <p className="tw-text-lg tw-font-medium tw-leading-relaxed">{description}</p>
            <div className="tw-inline-flex tw-flex-wrap tw-items-center tw-pt-1 md:tw-pt-6">
                {image?.src && (
                    <div className="tw-mr-5 tw-w-[70px] tw-shrink-0">
                        <img className="tw-rounded-full" src={image.src} alt={image?.alt || name} />
                    </div>
                )}

                <div className="cite">
                    <h4 className="tw-mb-1 tw-text-h6 tw-uppercase tw-leading-tight tw-tracking-wider">
                        {name}
                    </h4>
                    <span className="tw-mt-2.5 tw-text-md tw-text-gray-300">/ {designation}</span>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;
