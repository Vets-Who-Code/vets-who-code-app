import { motion } from "motion/react";
import { forwardRef, MutableRefObject, useEffect, useRef, useState } from "react";

type TProps = {
    counter: number;
    title: string;
    suffix?: string;
    prefix?: string;
    note?: string;
    index?: number;
};

const DURATION_MS = 2200;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const FunFact = forwardRef<HTMLDivElement, TProps>(
    ({ counter, suffix, prefix, title, note, index = 0 }, containerRef) => {
        const [hasRun, setHasRun] = useState(false);
        const localRef = useRef<HTMLDivElement | null>(null);
        const nodeRef = useRef<HTMLSpanElement>(null);

        useEffect(() => {
            if (hasRun) return;
            const el = localRef.current;
            if (!el) return;

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) return;
                        setHasRun(true);
                        observer.disconnect();
                    });
                },
                { threshold: 0, rootMargin: "0px 0px -10% 0px" }
            );
            observer.observe(el);
            return () => observer.disconnect();
        }, [hasRun]);

        useEffect(() => {
            if (!hasRun) return;
            const node = nodeRef.current;
            if (!node) return;

            let rafId = 0;
            const start = performance.now();

            const tick = (now: number) => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / DURATION_MS, 1);
                const value = Math.floor(easeOutCubic(progress) * counter);
                node.textContent = value.toLocaleString();
                if (progress < 1) {
                    rafId = requestAnimationFrame(tick);
                } else {
                    node.textContent = counter.toLocaleString();
                }
            };

            rafId = requestAnimationFrame(tick);
            return () => cancelAnimationFrame(rafId);
        }, [counter, hasRun]);

        const accentColor = index % 2 === 0 ? "var(--red, #c5203e)" : "var(--navy, #091f40)";

        return (
            <div
                className="funfact tw-text-center tw-relative"
                ref={(node) => {
                    localRef.current = node;
                    if (typeof containerRef === "function") {
                        containerRef(node);
                    } else if (containerRef) {
                        (containerRef as MutableRefObject<HTMLDivElement | null>).current = node;
                    }
                }}
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
                <span
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "48px",
                        height: "2px",
                        background: accentColor,
                        display: "block",
                    }}
                />
                <motion.div
                    style={{
                        fontFamily: "var(--font-headline)",
                        fontWeight: 900,
                        fontSize: "clamp(48px, 6vw, 64px)",
                        color: "var(--gold, #FDB330)",
                        letterSpacing: "-0.02em",
                        lineHeight: 1,
                    }}
                >
                    {prefix}
                    <span ref={nodeRef}>0</span>
                    {suffix}
                </motion.div>
                <h3
                    style={{
                        fontFamily: "var(--font-headline)",
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
                {note && (
                    <p
                        style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "12px",
                            color: "rgba(255, 255, 255, 0.65)",
                            marginTop: "6px",
                            marginBottom: 0,
                        }}
                    >
                        {note}
                    </p>
                )}
            </div>
        );
    }
);

FunFact.displayName = "FunFact";

export default FunFact;
