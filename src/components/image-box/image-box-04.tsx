import clsx from "clsx";
import { forwardRef } from "react";
import { ImageType } from "@utils/types";

export type ImageBoxProps = {
    image: ImageType;
    title: string;
    description: string;
    className?: string;
};

const ImageBox = forwardRef<HTMLDivElement, ImageBoxProps>(
    ({ image, title, description, className }, ref) => {
        return (
            <div
                ref={ref}
                className={clsx(
                    "image-box tw-relative tw-pt-[35px] tw-px-[24px] tw-bg-white tw-shadow-lg tw-shadow-heading/10 tw-bg-no-repeat",
                    className
                )}
                style={{ backgroundImage: `url(${image?.src})` }}
            >
                <h3 className="tw-text-lg md:tw-text-xl tw-leading-normal tw-text-secondary tw-mb-0">
                    {title}
                </h3>
                <p className="tw-mt-[5px]">{description}</p>
            </div>
        );
    }
);

ImageBox.displayName = "ImageBox";

export default ImageBox;
