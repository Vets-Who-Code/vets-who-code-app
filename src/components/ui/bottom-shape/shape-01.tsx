import clsx from "clsx";
import BottomShapeSVG from "@assets/svgs/bottom-shape.svg";

type TProps = {
    className?: string;
    color?: string;
};

const BottomShape = ({ className, color }: TProps) => {
    return (
        <div
            className={clsx(
                "bottom-shape tw:absolute tw:-bottom-px tw:left-0 tw:z-1 tw:h-[70px] tw:w-full tw:rotate-180",
                className
            )}
        >
            <BottomShapeSVG className={clsx("tw:h-full tw:w-full", color)} />
        </div>
    );
};

BottomShape.defaultProps = {
    color: "tw:fill-white",
};

export default BottomShape;
