import clsx from "clsx";
import BottomShapeSVG from "@assets/svgs/bottom-shape-4.svg";

type TProps = {
    className?: string;
    color?: string;
};

const BottomShape = ({ className, color }: TProps) => {
    return (
        <div
            className={clsx(
                "tw:absolute tw:-bottom-px tw:left-0 tw:z-1 tw:h-20 tw:w-[calc(100%+1.3px)] tw:rotate-180 tw:overflow-hidden tw:lg:h-[440px]",
                className
            )}
        >
            <BottomShapeSVG
                className={clsx(
                    "tw:rotate-y-180-translate-x-half tw:relative tw:left-1/2 tw:block tw:h-full tw:w-full",
                    color
                )}
            />
        </div>
    );
};

BottomShape.defaultProps = {
    color: "tw:fill-heading/5",
};

export default BottomShape;
