import { forwardRef } from "react";
import clsx from "clsx";
import Anchor from "@ui/anchor";
import { ICourse } from "@utils/types";
import { motion } from "motion/react";
import { scrollUpVariants } from "@utils/variants";

type TProps = Pick<ICourse, "thumbnail" | "title" | "path"> & {
    className?: string;
};

const CourseCard02 = forwardRef<HTMLDivElement, TProps>(
    ({ className, thumbnail, title, path }, ref) => {
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
                        />
                    )}

                    <Anchor className="link-overlay" path={path}>
                        {title}
                    </Anchor>
                </figure>
                <div className="info tw-p-[30px]">
                    <h3 className="tw-mb-0 tw-text-xl tw-leading-normal">
                        <Anchor path={path}>{title}</Anchor>
                    </h3>
                </div>
            </motion.div>
        );
    }
);

export default CourseCard02;
