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
                space === "top-bottom" && "tw:py-15 tw:md:py-20 tw:lg:py-[100px]",
                space === "top-bottom-2" && "tw:py-15 tw:md:py-20 tw:lg:pb-40 tw:lg:pt-[100px]",
                space === "top-bottom-3" &&
                    "tw:pb-15 tw:pt-[150px] tw:md:pb-20 tw:md:pt-[170px] tw:lg:pb-[100px] tw:lg:pt-[190px]",
                space === "top" && "tw:pt-15 tw:md:pt-20 tw:lg:pt-[100px]",
                space === "top-2" && "tw:pt-[150px] tw:md:pt-[170px] tw:lg:pt-[320px]",
                space === "bottom" && "tw:pb-15 tw:md:pb-20 tw:lg:pb-[100px]",
                space === "bottom-2" && "tw:mb-[70px]",
                space === "bottom-3" && "tw:pb-15 tw:md:pb-20 tw:lg:pb-[100px] tw:xl:pb-[160px]",
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
