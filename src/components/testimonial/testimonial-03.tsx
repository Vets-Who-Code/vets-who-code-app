import clsx from "clsx";
import { ImageType, ItemType } from "@utils/types";

type TProps = Pick<ItemType, "description" | "name" | "designation"> & {
    image: ImageType;
    className?: string;
};

const Testimonial03 = ({
    description,
    name,
    designation,
    image,
    className,
}: TProps) => {
    return (
        <div
            className={clsx(
                "testimonial tw-py-11 tw-px-[26px] tw-bg-white tw-rounded tw-shadow-lg tw-shadow-heading/10 tw-text-center",
                className
            )}
        >
            {image?.src && (
                <div className="tw-mb-7.5 child:tw-mx-auto">
                    <img
                        src={image.src}
                        width={image?.width || 140}
                        height={image?.height || 140}
                        alt={image?.alt || name}
                    />
                </div>
            )}

            <p className="tw-mb-10 tw-text-lg tw-font-medium tw-text-secondary">
                {description}
            </p>
            <h3 className="tw-tracking-wider tw-uppercase tw-text-h6 tw-mb-2.5">
                {name}
            </h3>
            <span className="tw-text-gray-300">/ {designation}</span>
        </div>
    );
};

export default Testimonial03;
