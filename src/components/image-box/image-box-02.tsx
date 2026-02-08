import Anchor from "@ui/anchor";
import { ImageType } from "@utils/types";
import clsx from "clsx";
import { forwardRef } from "react";

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
                    "image-box tw-group tw-relative tw-rounded tw-bg-white tw-px-5 tw-pb-7.5 tw-pt-10 tw-text-center",
                    "before:tw-absolute before:tw-inset-0 before:tw-z-1 before:tw-rounded-b before:tw-opacity-0 before:tw-shadow-lg before:tw-shadow-heading/10 before:tw-transition-opacity before:tw-content-['']",
                    "hover:before:tw-opacity-100",
                    className
                )}
            >
                {image?.src && (
                    <img src={image.src} alt={image?.alt || title} className="tw-mx-auto tw-mb-6" />
                )}
                <h3 className="tw-m-0 tw-text-xl tw-leading-normal tw-text-secondary">{title}</h3>
                <p className="tw-mb-[34px] tw-mt-2.5 tw-leading-relaxed">{description}</p>
                <span className="tw-inline-flex tw-items-center tw-py-[5px] tw-text-md tw-font-bold tw-leading-none tw-text-secondary-light tw-transition-colors tw-duration-300 group-hover:tw-text-primary">
                    {pathText} <i className="far fa-long-arrow-right tw-ml-3.5 tw-text-[16px]" />
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
