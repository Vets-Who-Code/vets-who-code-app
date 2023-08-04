import clsx from "clsx";
import BottomShapeSVG from "@assets/svgs/bottom-shape-5.svg";

type TProps = {
    className?: string;
    color?: string;
};

const BottomShape = ({ className, color }: TProps) => {
    return (
        <div
            className={clsx(
                "tw-absolute tw-z-1 -tw-bottom-px tw-left-0 tw-w-[calc(100%_+_1.3px)] tw-h-20 md:tw-h-[600px] tw-rotate-180 tw-overflow-hidden",
                className
            )}
        >
            <BottomShapeSVG
                className={clsx(
                    "tw-w-full tw-h-full tw-block tw-relative tw-left-1/2 tw-rotate-y-180-translate-x-half",
                    color
                )}
            />
        </div>
    );
};

BottomShape.defaultProps = {
    color: "tw-fill-white/5",
};

export default BottomShape;
