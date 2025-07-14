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
            <div ref={ref} className="image-box tw:group tw:relative tw:text-center">
                {image?.src && (
                    <img src={image.src} alt={image?.alt || title} className="tw:mx-auto tw:mb-6" />
                )}
                <h3 className="tw:m-0 tw:text-xl tw:leading-normal">{title}</h3>
                <p className="tw:mb-[34px] tw:mt-2.5 tw:leading-relaxed">{description}</p>
                <span className="tw:flex tw:min-h-[40px] tw:items-center tw:justify-center tw:rounded-sm tw:bg-transparent tw:px-5 tw:text-md tw:font-bold tw:leading-none tw:text-secondary-light tw:transition tw:group-hover:bg-light-100 tw:group-hover:text-primary">
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
