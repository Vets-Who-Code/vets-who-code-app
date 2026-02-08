import BottomShapeSVG from "@assets/svgs/bottom-shape.svg";
import clsx from "clsx";

type TProps = {
    className?: string;
    color?: string;
};

const BottomShape = ({ className, color }: TProps) => {
    return (
        <div
            className={clsx(
                "tw-absolute -tw-bottom-px tw-left-0 tw-z-1 tw-h-[70px] tw-w-full tw-rotate-180 bottom-shape",
                className
            )}
        >
            <BottomShapeSVG className={clsx("tw-h-full tw-w-full", color)} />
        </div>
    );
};

BottomShape.defaultProps = {
    color: "tw-fill-white",
};

export default BottomShape;
