import clsx from "clsx";
import BottomShapeSVG from "@assets/svgs/bottom-shape-3.svg";

type TProps = {
    className?: string;
    color?: string;
};

const BottomShape = ({ className, color }: TProps) => {
    return (
        <div
            className={clsx(
                "bottom-shape tw-absolute -tw-bottom-px tw-left-0 tw-w-full tw-h-20 md:tw-h-[310px] -tw-z-1 tw-rotate-180",
                className
            )}
        >
            <BottomShapeSVG
                className={clsx("tw-w-full tw-h-full tw-rotate-y-180", color)}
            />
        </div>
    );
};

BottomShape.defaultProps = {
    color: "tw-fill-light-100",
};

export default BottomShape;
