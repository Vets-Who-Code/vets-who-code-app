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
            <div ref={ref} className="image-box tw:group tw:relative">
                {image?.src && (
                    <img src={image.src} alt={image?.alt || title} className="tw:mb-6" />
                )}
                <h3 className="tw:m-0 tw:leading-normal tw:text-secondary">{title}</h3>
                <p className="tw:mb-[34px] tw:mt-2.5 tw:leading-relaxed">{description}</p>
                <span className="tw:inline-flex tw:items-center tw:py-[5px] tw:text-md tw:font-bold tw:leading-none tw:text-secondary-light tw:transition-colors tw:duration-300 tw:group-hover:text-primary">
                    {pathText} <i className="far fa-long-arrow-right tw:ml-3.5 tw:text-[16px]" />
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
