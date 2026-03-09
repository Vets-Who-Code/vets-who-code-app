import { animate, motion } from "motion/react";
import { forwardRef, useEffect, useRef, useState } from "react";

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
        <div
            className="funfact tw-text-center"
            ref={continerRef}
            style={{
                background: "var(--navy, #091f40)",
                padding: "40px 28px",
                transition: "background 0.3s ease",
            }}
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "var(--navy-deep, #003559)";
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "var(--navy, #091f40)";
            }}
        >
            <motion.div
                style={{
                    fontFamily: "var(--font-headline, HashFlag, sans-serif)",
                    fontWeight: 900,
                    fontSize: "clamp(48px, 6vw, 64px)",
                    color: "var(--gold, #FDB330)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                }}
                onViewportEnter={viewPortHandler}
            >
                <span ref={nodeRef} />
                {suffix}
            </motion.div>
            <h3
                style={{
                    fontFamily: "var(--font-headline, HashFlag, sans-serif)",
                    fontSize: "14px",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#FFFFFF",
                    fontWeight: 600,
                    marginTop: "16px",
                    marginBottom: 0,
                }}
            >
                {title}
            </h3>
        </div>
    );
});

export default FunFact;
