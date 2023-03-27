import { forwardRef } from "react";
import Anchor from "@ui/anchor";
import { ImageType } from "@utils/types";

export type ImageBoxProps = {
    image: ImageType;
    title: string;
    description: string;
    path: string;
    pathText: string;
};

const ImageBox = forwardRef<HTMLDivElement, ImageBoxProps>(
    ({ image, title, description, path, pathText }, ref) => {
        return (
            <div ref={ref} className="image-box tw-relative tw-group">
                {image?.src && (
                    <img
                        src={image.src}
                        alt={image?.alt || title}
                        className="tw-mb-6"
                    />
                )}
                <h3 className="tw-text-secondary tw-leading-normal tw-m-0">
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
