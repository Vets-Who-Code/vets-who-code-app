import clsx from "clsx";
import { motion } from "framer-motion";
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
            className={clsx(
                "wrapper tw-relative tw-bg-transparent tw-bg-lightGradient",
                className
            )}
        >
            {children}
            {showBalls && (
                <>
                    <motion.div
                        className="tw-w-[35px] tw-h-[35px] tw-bg-orange-100/70 tw-rounded-full tw-absolute tw-top-[164px] tw-left-[70px]"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    />
                    <motion.div
                        className="tw-w-9 tw-h-9 tw-bg-blue-100/70 tw-rounded-full tw-absolute tw-top-[70px] tw-right-32"
                        animate={{
                            x: trans1().x,
                            y: trans1().y,
                        }}
                    />
                    <motion.div
                        className="tw-w-[46px] tw-h-[46px] tw-bg-jagged tw-rounded-full tw-absolute -tw-top-[120px] -tw-right-6"
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
