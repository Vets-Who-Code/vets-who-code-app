import clsx from "clsx";
import { TSection } from "@utils/types";

type TProps = Exclude<TSection, "titleSize"> & {
    children: React.ReactNode;
    style?: React.CSSProperties;
    id?: string; // Add id prop to type definition
};

const Section = ({ space, bg, className, style, children, id }: TProps) => {
    return (
        <section
            className={clsx(
                className,
                space === "top-bottom" && "tw-py-15 md:tw-py-20 lg:tw-py-[100px]",
                space === "top-bottom-2" && "tw-py-15 md:tw-py-20 lg:tw-pb-40 lg:tw-pt-[100px]",
                space === "top-bottom-3" &&
                    "tw-pb-15 tw-pt-[150px] md:tw-pb-20 md:tw-pt-[170px] lg:tw-pb-[100px] lg:tw-pt-[190px]",
                space === "top" && "tw-pt-15 md:tw-pt-20 lg:tw-pt-[100px]",
                space === "top-2" && "tw-pt-[150px] md:tw-pt-[170px] lg:tw-pt-[320px]",
                space === "bottom" && "tw-pb-15 md:tw-pb-20 lg:tw-pb-[100px]",
                space === "bottom-2" && "tw-mb-[70px]",
                space === "bottom-3" && "tw-pb-15 md:tw-pb-20 lg:tw-pb-[100px] xl:tw-pb-[160px]",
                bg
            )}
            style={style}
            id={id} // Pass the id prop to the section element
        >
            {children}
        </section>
    );
};

Section.defaultProps = {
    space: "top-bottom",
};

export default Section;
