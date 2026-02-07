import { ImageType } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";
import clsx from "clsx";
import { motion } from "motion/react";
import { forwardRef } from "react";

type TProps = {
    className?: string;
    thumbnail: ImageType;
    title: string;
    headline?: string;
};

export const VWCGridCard = forwardRef<HTMLDivElement, TProps>(
    ({ className, thumbnail, title, headline }, ref) => {
        return (
            <motion.div
                className={clsx(
                    "course tw-relative tw-h-full tw-rounded tw-bg-white",
                    "before:tw-absolute before:tw-inset-0 before:-tw-z-1 before:tw-rounded-b before:tw-opacity-0 before:tw-shadow-4md before:tw-shadow-black/[0.12] before:tw-transition-opacity before:tw-content-['']",
                    "hover:before:tw-opacity-100",
                    className
                )}
                ref={ref}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.2 }}
                variants={scrollUpVariants}
            >
                <figure className="tw-relative">
                    {thumbnail?.src && (
                        <img
                            className="tw-w-full tw-rounded-t"
                            src={thumbnail.src}
                            alt={thumbnail?.alt || "Course"}
                            width={thumbnail?.width || 370}
                            height={thumbnail?.height || 229}
                            loading={thumbnail?.loading || "lazy"}
                            draggable="false"
                        />
                    )}
                </figure>
                <div className="info tw-p-[30px]">
                    <h3 className="tw-mb-0 tw-text-left tw-text-xl tw-leading-normal">{title}</h3>
                    {headline && (
                        <h5 className="tw-mb-0 tw-text-left tw-text-md tw-leading-normal tw-text-primary">
                            {headline}
                        </h5>
                    )}
                </div>
            </motion.div>
        );
    }
);

export default VWCGridCard;
