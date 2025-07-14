import { forwardRef } from "react";
import clsx from "clsx";
import { ImageType } from "@utils/types";
import { motion } from "motion/react";
import { scrollUpVariants } from "@utils/variants";

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
                    "course tw:relative tw:h-full tw:rounded-sm tw:bg-white",
                    "tw:before:absolute tw:before:inset-0 tw:before:-z-1 tw:before:rounded-b tw:before:opacity-0 tw:before:shadow-4md tw:before:shadow-black/12 tw:before:transition-opacity tw:before:content-['']",
                    "tw:hover:before:opacity-100 tw:hover:cursor-pointer",
                    className
                )}
                ref={ref}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.2 }}
                variants={scrollUpVariants}
            >
                <figure className="tw:relative">
                    {thumbnail?.src && (
                        <img
                            className="tw:w-full tw:rounded-t"
                            src={thumbnail.src}
                            alt={thumbnail?.alt || "Course"}
                            width={thumbnail?.width || 370}
                            height={thumbnail?.height || 229}
                            loading={thumbnail?.loading || "lazy"}
                            draggable="false"
                        />
                    )}
                </figure>
                <div className="info tw:p-[30px]">
                    <h3 className="tw:mb-0 tw:text-left tw:text-xl tw:leading-normal">{title}</h3>
                    {headline && (
                        <h5 className="tw:mb-0 tw:text-left tw:text-md tw:leading-normal tw:text-primary">
                            {headline}
                        </h5>
                    )}
                </div>
            </motion.div>
        );
    }
);

export default VWCGridCard;
