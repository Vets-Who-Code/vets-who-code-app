import Anchor from "@ui/anchor";
import { ICourse } from "@utils/types";
import { scrollUpVariants } from "@utils/variants";
import clsx from "clsx";
import { motion } from "motion/react";
import { forwardRef } from "react";

type TProps = Pick<ICourse, "thumbnail" | "title" | "path"> & {
    className?: string;
};

const CourseCard02 = forwardRef<HTMLDivElement, TProps>(
    ({ className, thumbnail, title, path }, ref) => {
        return (
            <motion.div
                className={clsx(
                    "course tw-relative tw-h-full tw-bg-white tw-transition-all tw-duration-300",
                    className
                )}
                style={{
                    border: "1px solid rgba(185, 214, 242, 0.08)",
                    borderRadius: 0,
                }}
                whileHover={{
                    y: -2,
                    borderTopWidth: "2px",
                    borderTopColor: "var(--red, #c5203e)",
                }}
                ref={ref}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.2 }}
                variants={scrollUpVariants}
            >
                <figure className="tw-relative">
                    {thumbnail?.src && (
                        <img
                            className="tw-w-full"
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
                    <h3
                        className="tw-mb-0 tw-leading-normal"
                        style={{
                            fontFamily: "var(--font-headline, HashFlag, sans-serif)",
                            fontWeight: 700,
                            fontSize: "17px",
                            textTransform: "none",
                            letterSpacing: "0",
                        }}
                    >
                        <Anchor path={path}>{title}</Anchor>
                    </h3>
                </div>
            </motion.div>
        );
    }
);

export default CourseCard02;
