import { forwardRef } from "react";
import clsx from "clsx";
import Anchor from "@ui/anchor";
import { ImageType } from "@utils/types";

export type ImageBoxProps = {
    image: ImageType;
    title: string;
    description: string;
    path: string;
    pathText: string;
    className?: string;
};

const ImageBox = forwardRef<HTMLDivElement, ImageBoxProps>(
    ({ image, title, description, path, pathText, className }, ref) => {
        return (
            <div
                ref={ref}
                className={clsx(
                    "image-box tw-relative tw-text-center tw-group tw-bg-white tw-pt-10 tw-pb-7.5 tw-px-5 tw-rounded",
                    "before:tw-absolute before:tw-content-[''] before:tw-z-1 before:tw-inset-0 before:tw-shadow-lg before:tw-shadow-heading/10 before:tw-rounded-b before:tw-transition-opacity before:tw-opacity-0",
                    "hover:before:tw-opacity-100",
                    className
                )}
            >
                {image?.src && (
                    <img
                        src={image.src}
                        alt={image?.alt || title}
                        className="tw-mb-6 tw-mx-auto"
                    />
                )}
                <h3 className="tw-text-secondary tw-leading-normal tw-text-xl tw-m-0">
                    {title}
                </h3>
                <p className="tw-leading-relaxed tw-mt-2.5 tw-mb-[34px]">
                    {description}
                </p>
                <span className="tw-text-md tw-font-bold tw-leading-none tw-inline-flex tw-items-center tw-py-[5px] tw-text-secondary-light tw-transition-colors tw-duration-300 group-hover:tw-text-primary">
                    {pathText}{" "}
                    <i className="far fa-long-arrow-right tw-ml-3.5 tw-text-[16px]" />
                </span>
                <Anchor className="link-overlay" path={path}>
                    {title}
                </Anchor>
            </div>
        );
    }
);

ImageBox.displayName = "ImageBox";

export default ImageBox;
