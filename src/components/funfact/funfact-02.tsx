import { forwardRef, useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { motion, animate } from "framer-motion";

type TProps = {
    counter: number;
    title: string;
    suffix?: string;
    description?: string;
    className?: string;
};

const FunFact = forwardRef<HTMLDivElement, TProps>(
    ({ counter, suffix, title, description, className }, continerRef) => {
        const [inView, setInView] = useState(false);

        const viewPortHandler = () => {
            if (inView) return;
            setInView(true);
        };

        const nodeRef = useRef<HTMLSpanElement>(null);

        useEffect(() => {
            if (!inView) return;
            const node = nodeRef.current;
            if (!node) return;

            const controls = animate(0, counter, {
                duration: 1,
                onUpdate(value) {
                    node.textContent = value.toFixed(3).replace(/[.,]000$/, "");
                },
            });

            return () => controls.stop();
        }, [counter, inView]);

        return (
            <div
                className={clsx("funfact tw-text-center", className)}
                ref={continerRef}
            >
                <h3 className="tw-max-w-[180px] tw-text-h3 tw-leading-snug tw-text-secondary tw-mx-auto">
                    {title}
                </h3>
                <motion.div
                    className="tw-text-5xl md:tw-text-[64px] tw-font-extrabold tw-leading-none tw-text-primary"
                    onViewportEnter={viewPortHandler}
                >
                    <span ref={nodeRef} />
                    {suffix}
                </motion.div>
                {description && (
                    <h4 className="tw-text-body tw-mt-3.5 tw-mb-0 -tw-tracking-tightest tw-up-leading-none tw-uppercase tw-text-h6">
                        {description}
                    </h4>
                )}
            </div>
        );
    }
);

export default FunFact;
