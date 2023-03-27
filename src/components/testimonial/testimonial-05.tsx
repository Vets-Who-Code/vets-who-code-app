import clsx from "clsx";
import { ImageType } from "@utils/types";

type TProps = {
    description: string;
    name: string;
    designation: string;
    image: ImageType;
    className?: string;
};

const Testimonial05 = ({
    description,
    name,
    designation,
    image,
    className,
}: TProps) => {
    return (
        <div
            className={clsx(
                "testimonial lg:tw-max-w-[1000px] tw-mx-auto tw-px-3.8 tw-relative tw-flex tw-flex-wrap tw-items-center",
                className
            )}
        >
            <figure className="tw-w-[140px] tw-h-[140px] xl:tw-w-[200px] xl:tw-h-[200px]">
                {image?.src && (
                    <img
                        src={image.src}
                        alt={image?.alt || name}
                        className="tw-w-full tw-h-full tw-rounded-full"
                        width={200}
                        height={200}
                        loading="lazy"
                    />
                )}
            </figure>
            <div className="tw-w-full tw-mt-5 md:tw-w-[calc(100%_-_140px)] xl:tw-w-[calc(100%_-_200px)] md:tw-mt-0 md:tw-pl-[50px] xl:tw-pl-[100px]">
                <h3 className="tw-text-2xl lg:tw-text-[34px] tw-font-medium tw-leading-[1.42] tw-mb-7 lg:tw-mb-10">
                    {description}
                </h3>
                <h4 className="tw-mb-0 tw-tracking-wider tw-uppercase tw-text-h6">
                    {name}
                </h4>
                <span className="tw-block tw-mt-2.5 tw-text-md tw-text-300">
                    / {designation}
                </span>
            </div>
        </div>
    );
};

export default Testimonial05;
