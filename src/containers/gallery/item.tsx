import { forwardRef, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { ImageType } from "@utils/types";

type TProps = {
    image: ImageType;
    name: string;
    designation: string;
};

const Item = forwardRef<HTMLDivElement, TProps>(
    ({ image, name, designation }, ref) => {
        const [elWidth, setElWidth] = useState(0);
        const imgRef = useRef<HTMLImageElement>(null);
        useEffect(() => {
            const el = imgRef.current as HTMLImageElement;
            setElWidth(el.naturalWidth);
        }, []);

        return (
            <div
                className={clsx(
                    "tw-relative tw-group",
                    elWidth > 500 &&
                        elWidth < 600 &&
                        "lg:tw-col-span-1 xl:tw-col-span-2",
                    elWidth > 600 && "lg:tw-col-span-2 xl:tw-col-span-3"
                )}
                ref={ref}
            >
                {image?.src && (
                    <div className="tw-relative tw-w-full tw-h-full before:tw-absolute before:tw-content-[''] before:tw-z-1 before:tw-inset-0 before:tw-transition-all before:tw-duration-500 before:tw-bg-black/50 before:tw-opacity-0 group-hover:before:tw-opacity-100">
                        <img
                            src={image.src}
                            alt=""
                            className="tw-w-full tw-h-full tw-object-cover"
                            ref={imgRef}
                        />
                    </div>
                )}
                <div className="tw-absolute tw-z-10 tw-top-1/2 tw-left-0 tw-w-full tw-p-5 tw-transition-all tw-duration-500 tw-text-center tw-opacity-0 group-hover:tw-opacity-100 group-hover:-tw-translate-y-1/2">
                    <h3 className="tw-text-[34px] tw-text-white tw-mb-0">
                        {name}
                    </h3>
                    <p className="tw-text-white">{designation}</p>
                </div>
            </div>
        );
    }
);

export default Item;
