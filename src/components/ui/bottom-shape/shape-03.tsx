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
                "bottom-shape tw-absolute -tw-bottom-px tw-left-0 -tw-z-1 tw-h-20 tw-w-full tw-rotate-180 md:tw-h-[310px]",
                className
            )}
        >
            <BottomShapeSVG className={clsx("tw-rotate-y-180 tw-h-full tw-w-full", color)} />
        </div>
    );
};

BottomShape.defaultProps = {
    color: "tw-fill-white",
};

export default BottomShape;
