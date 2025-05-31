import clsx from "clsx";
import { ImageType } from "@utils/types";

type TProps = {
    description: string;
    name: string;
    designation: string;
    image: ImageType;
    className?: string;
};

const Testimonial05 = ({ description, name, designation, image, className }: TProps) => {
    return (
        <div
            className={clsx(
                "testimonial tw-relative tw-mx-auto tw-flex tw-flex-wrap tw-items-center tw-px-3.8 lg:tw-max-w-[1000px]",
                className
            )}
        >
            <figure className="tw-h-[140px] tw-w-[140px] xl:tw-h-[200px] xl:tw-w-[200px]">
                {image?.src && (
                    <img
                        src={image.src}
                        alt={image?.alt || name}
                        className="tw-h-full tw-w-full tw-rounded-full"
                        width={200}
                        height={200}
                        loading="lazy"
                    />
                )}
            </figure>
            <div className="tw-mt-5 tw-w-full md:tw-mt-0 md:tw-w-[calc(100%_-_140px)] md:tw-pl-[50px] xl:tw-w-[calc(100%_-_200px)] xl:tw-pl-[100px]">
                <h3 className="tw-mb-7 tw-text-2xl tw-font-medium tw-leading-[1.42] lg:tw-mb-10 lg:tw-text-[34px]">
                    {description}
                </h3>
                <h4 className="tw-mb-0 tw-text-h6 tw-uppercase tw-tracking-wider">{name}</h4>
                <span className="tw-text-300 tw-mt-2.5 tw-block tw-text-md">/ {designation}</span>
            </div>
        </div>
    );
};

export default Testimonial05;
