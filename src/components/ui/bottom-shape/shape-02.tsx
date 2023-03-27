import clsx from "clsx";
import BottomShapeSVG from "@assets/svgs/bottom-shape-2.svg";

type TProps = {
    className?: string;
    color?: string;
};

const BottomShape = ({ className, color }: TProps) => {
    return (
        <div
            className={clsx(
                "bottom-shape tw-absolute -tw-bottom-px tw-left-0 tw-w-full tw-h-[70px] tw-z-1",
                className
            )}
        >
            <BottomShapeSVG className={clsx("tw-w-full tw-h-full", color)} />
        </div>
    );
};

BottomShape.defaultProps = {
    color: "tw-fill-white",
};

export default BottomShape;
