import { scrollUpVariants } from "@utils/variants";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

const PHASES = [
    { x: 100, label: "INPUTS", sub: "who + what", ring: "#C5203E", fill: "#C5203E" },
    {
        x: 330,
        label: "ACTIVITIES",
        sub: "17-week program",
        ring: "#DBB42C",
        fill: "#DBB42C",
    },
    {
        x: 560,
        label: "OUTPUTS",
        sub: "skills + portfolio",
        ring: "#0353A4",
        fill: "#0353A4",
    },
    {
        x: 790,
        label: "OUTCOMES",
        sub: "6–12 months",
        ring: "#A51C30",
        fill: "#A51C30",
    },
    {
        x: 1020,
        label: "IMPACT",
        sub: "long-term",
        ring: "#C9A227",
        fill: "#C9A227",
    },
];

const Y = 180;

const PipelineDiagram = () => {
    const ref = useRef<SVGSVGElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.3 });
    const reduced = useReducedMotion();
    const play = inView || reduced;
    const lastX = PHASES[PHASES.length - 1].x;
    const arrowX = lastX + 60;

    return (
        <svg
            ref={ref}
            viewBox="0 0 1140 360"
            preserveAspectRatio="xMidYMid meet"
            className="tw-block tw-h-auto tw-w-full"
        >
            {/* Spine */}
            <line
                x1={PHASES[0].x}
                y1={Y}
                x2={lastX}
                y2={Y}
                stroke="rgba(9,31,64,0.18)"
                strokeWidth={1}
            />
            {/* Red accent line that grows on reveal */}
            <motion.line
                x1={PHASES[0].x}
                y1={Y}
                x2={lastX}
                y2={Y}
                stroke="#C5203E"
                strokeWidth={2}
                initial={{ pathLength: 0 }}
                animate={play ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{
                    duration: reduced ? 0 : 1.6,
                    ease: [0.19, 1, 0.22, 1],
                }}
            />

            {PHASES.map((p, i) => (
                <g key={p.label}>
                    <line
                        x1={p.x}
                        y1={Y - 16}
                        x2={p.x}
                        y2={Y - 30}
                        stroke="rgba(9,31,64,0.25)"
                        strokeWidth={1}
                    />
                    <text
                        x={p.x}
                        y={Y - 50}
                        textAnchor="middle"
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 10,
                            fill: "#6C757D",
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                        }}
                    >
                        phase-{String(i + 1).padStart(2, "0")}
                    </text>
                    <circle cx={p.x} cy={Y} r={16} fill="#fff" stroke={p.ring} strokeWidth={2.5} />
                    <circle cx={p.x} cy={Y} r={6} fill={p.fill} />
                    <text
                        x={p.x}
                        y={Y + 50}
                        textAnchor="middle"
                        style={{
                            fontFamily: "var(--font-headline)",
                            fontSize: 13,
                            fontWeight: 700,
                            fill: "#091F40",
                            letterSpacing: "0.06em",
                        }}
                    >
                        {p.label}
                    </text>
                    <text
                        x={p.x}
                        y={Y + 72}
                        textAnchor="middle"
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 10,
                            fill: "#6C757D",
                            letterSpacing: "0.12em",
                        }}
                    >
                        {p.sub}
                    </text>
                </g>
            ))}

            {/* Arrow + trailing label */}
            <motion.g
                initial={{ opacity: 0 }}
                animate={play ? { opacity: 1 } : { opacity: 0 }}
                transition={{
                    duration: reduced ? 0 : 0.4,
                    delay: reduced ? 0 : 1.4,
                }}
            >
                <path
                    d={`M ${arrowX - 20} ${Y} L ${arrowX} ${Y} M ${arrowX - 8} ${Y - 6} L ${arrowX} ${Y} L ${arrowX - 8} ${Y + 6}`}
                    stroke="#C5203E"
                    strokeWidth={2}
                    fill="none"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                />
                <text
                    x={arrowX + 12}
                    y={Y + 5}
                    style={{
                        fontFamily: "var(--font-headline)",
                        fontSize: 13,
                        fontWeight: 700,
                        fill: "#C5203E",
                        letterSpacing: "0.06em",
                    }}
                >
                    → shipped
                </text>
            </motion.g>
        </svg>
    );
};

const Pipeline = () => {
    return (
        <section className="tw-bg-[#F8F9FA] tw-py-[120px]" aria-labelledby="toc-pipeline-headline">
            <div className="tw-mx-auto tw-max-w-[1230px] tw-px-5 md:tw-px-10">
                <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={scrollUpVariants}
                    className="tw-mb-12 tw-flex tw-flex-wrap tw-items-end tw-justify-between tw-gap-6"
                >
                    <h2
                        id="toc-pipeline-headline"
                        className="tw-m-0 tw-font-heading tw-uppercase tw-text-navy"
                        style={{
                            fontWeight: 900,
                            fontSize: "clamp(28px, 4vw, 44px)",
                            letterSpacing: "-0.02em",
                            lineHeight: 1.05,
                        }}
                    >
                        The five-phase pipeline.
                    </h2>
                    <div
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 12,
                            letterSpacing: "0.12em",
                            color: "#495057",
                        }}
                    >
                        <span className="tw-text-red">$</span> git log{" "}
                        <span style={{ color: "#0353A4" }}>--graph --all --decorate</span>
                    </div>
                </motion.div>

                <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={scrollUpVariants}
                    className="tw-bg-white"
                    style={{
                        border: "1px solid var(--silver)",
                        padding: "56px 40px 40px",
                    }}
                >
                    <PipelineDiagram />
                </motion.div>
            </div>
        </section>
    );
};

export default Pipeline;
