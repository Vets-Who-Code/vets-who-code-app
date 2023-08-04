import clsx from "clsx";
import { TSection } from "@utils/types";

type TProps = Exclude<TSection, "titleSize"> & {
    children: React.ReactNode;
    style?: React.CSSProperties;
};

const Section = ({ space, bg, className, style, children }: TProps) => {
    return (
        <section
            className={clsx(
                className,
                space === "top-bottom" &&
                    "tw-py-15 md:tw-py-20 lg:tw-py-[100px]",
                space === "top-bottom-2" &&
                    "tw-py-15 md:tw-py-20 lg:tw-pt-[100px] lg:tw-pb-40",
                space === "top-bottom-3" &&
                    "tw-pt-[150px] tw-pb-15 md:tw-pt-[170px] md:tw-pb-20 lg:tw-pt-[190px] lg:tw-pb-[100px]",
                space === "top" && "tw-pt-15 md:tw-pt-20 lg:tw-pt-[100px]",
                space === "top-2" &&
                    "tw-pt-[150px] md:tw-pt-[170px] lg:tw-pt-[320px]",
                space === "bottom" && "tw-pb-15 md:tw-pb-20 lg:tw-pb-[100px]",
                space === "bottom-2" && "tw-mb-[70px]",
                space === "bottom-3" &&
                    "tw-pb-15 md:tw-pb-20 lg:tw-pb-[100px] xl:tw-pb-[160px]",
                bg
            )}
            style={style}
        >
            {children}
        </section>
    );
};

Section.defaultProps = {
    space: "top-bottom",
};

export default Section;
