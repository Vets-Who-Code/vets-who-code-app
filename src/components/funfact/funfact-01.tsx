import { forwardRef, useState, useRef, useEffect } from "react";
import { motion, animate } from "motion/react";

type TProps = {
    counter: number;
    title: string;
    suffix?: string;
};

const FunFact = forwardRef<HTMLDivElement, TProps>(({ counter, suffix, title }, continerRef) => {
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
        <div className="funfact tw:text-center" ref={continerRef}>
            <motion.div
                className="tw:text-4xl tw:font-extrabold tw:leading-none tw:text-primary tw:md:text-5xl"
                onViewportEnter={viewPortHandler}
            >
                <span ref={nodeRef} />
                {suffix}
            </motion.div>
            <h3 className="tw:mb-0 tw:mt-2.5 tw:text-md tw:font-bold tw:uppercase tw:-tracking-tightest tw:text-secondary tw:md:mt-[14px] tw:md:text-base">
                {title}
            </h3>
        </div>
    );
});

export default FunFact;
