import clsx from "clsx";
import { motion } from "motion/react";
import BottomShape from "@components/ui/bottom-shape/shape-02";
import { useUI } from "@contexts/ui-context";

type TProps = {
    children: React.ReactNode;
    className?: string;
    showBalls?: boolean;
};

const Wrapper = ({ children, className, showBalls }: TProps) => {
    const { trans1, trans2 } = useUI();
    return (
        <div
            className={clsx("wrapper tw-relative tw-bg-transparent tw-bg-lightGradient", className)}
        >
            {children}
            {showBalls && (
                <>
                    <motion.div
                        className="tw-absolute tw-left-[70px] tw-top-[164px] tw-h-[35px] tw-w-[35px] tw-rounded-full tw-bg-red-signal/70"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    />
                    <motion.div
                        className="tw-absolute tw-right-32 tw-top-[70px] tw-h-9 tw-w-9 tw-rounded-full tw-bg-navy-sky/70"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    />
                    <motion.div
                        className="tw-absolute -tw-right-6 -tw-top-[120px] tw-h-[46px] tw-w-[46px] tw-rounded-full tw-bg-navy-sky"
                        animate={{
                            x: trans2().x,
                            y: trans2().y,
                        }}
                    />
                </>
            )}

            <BottomShape className="tw-hidden md:tw-block" />
        </div>
    );
};

Wrapper.defaultProps = {
    showBalls: true,
};

export default Wrapper;
