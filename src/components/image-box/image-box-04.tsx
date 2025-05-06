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
                    "image-box tw-relative tw-bg-white tw-bg-no-repeat tw-px-[24px] tw-pt-[35px] tw-shadow-lg tw-shadow-heading/10",
                    className
                )}
                style={{ backgroundImage: `url(${image?.src})` }}
            >
                <h3 className="tw-mb-0 tw-text-lg tw-leading-normal tw-text-secondary md:tw-text-xl">
                    {title}
                </h3>
                <p className="tw-mt-[5px]">{description}</p>
            </div>
        );
    }
);

ImageBox.displayName = "ImageBox";

export default ImageBox;
