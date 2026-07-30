import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

interface Branch {
    id: "b1" | "b2" | "b3" | "b4" | "b5";
    name: string;
    label: string;
    commits: string[];
    y: number;
    hash: string;
    color: string;
}

const BRANCHES: Branch[] = [
    {
        id: "b1",
        name: "feat/inputs",
        label: "Inputs",
        commits: ["cohort", "platform", "mentors", "tooling"],
        y: 80,
        hash: "9a1c3f2",
        color: "#C5203E",
    },
    {
        id: "b2",
        name: "feat/activities",
        label: "Activities",
        commits: ["modules", "pairing", "open-src", "products", "career"],
        y: 180,
        hash: "3c47b08",
        color: "#FDB330",
    },
    {
        id: "b3",
        name: "build/outputs",
        label: "Outputs",
        commits: ["github", "projects", "skills", "network"],
        y: 280,
        hash: "f5d92ae",
        color: "#B9D6F2",
    },
    {
        id: "b4",
        name: "release/outcomes",
        label: "Outcomes",
        commits: ["hires", "alumni", "mobility", "impact"],
        y: 380,
        hash: "b27e914",
        color: "#F38375",
    },
    {
        id: "b5",
        name: "impact/long",
        label: "Impact",
        commits: ["ecosystem", "wealth", "narrative", "model", "diversity"],
        y: 480,
        hash: "0d8f1c6",
        color: "#FFE169",
    },
];

const HERO_W = 700;
const HERO_H = 560;
const FORK_X = 110;
const TRACK_START = 180;
const TRACK_END = 480;
const MERGE_X = 580;
const MAIN_Y = 280;
const INIT_X = 50;
const FINAL_X = 640;

const PHASE_COLS = [
    { x: 200, label: "T+0" },
    { x: 280, label: "T+04" },
    { x: 360, label: "T+09" },
    { x: 440, label: "T+12" },
    { x: 520, label: "T+24" },
];

const branchPath = (y: number) =>
    `M ${FORK_X} ${MAIN_Y} C ${FORK_X + 30} ${MAIN_Y}, ${FORK_X + 30} ${y}, ${FORK_X + 70} ${y} L ${MERGE_X - 70} ${y} C ${MERGE_X - 30} ${y}, ${MERGE_X - 30} ${MAIN_Y}, ${MERGE_X} ${MAIN_Y}`;

const commitX = (i: number, n: number) =>
    n === 1
        ? (TRACK_START + TRACK_END) / 2
        : TRACK_START + (i / (n - 1)) * (TRACK_END - TRACK_START);

const HeroGitGraph = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.2 });
    const reduced = useReducedMotion();
    const play = inView || reduced;

    return (
        <div ref={ref} className="tw-w-full">
            <svg
                viewBox={`0 0 ${HERO_W} ${HERO_H}`}
                preserveAspectRatio="xMidYMid meet"
                role="img"
                aria-label="Animated git graph: five branches forking from a service line and merging into a v1.0 engineer release."
                className="tw-block tw-h-auto tw-w-full"
            >
                {/* Faint main line — service to production */}
                <line
                    x1={INIT_X}
                    y1={MAIN_Y}
                    x2={FINAL_X}
                    y2={MAIN_Y}
                    stroke="#B9D6F2"
                    strokeOpacity={0.4}
                    strokeWidth={1.5}
                />

                {/* Phase column dashed guides */}
                {PHASE_COLS.map((c) => (
                    <g key={c.label}>
                        <line
                            x1={c.x}
                            y1={40}
                            x2={c.x}
                            y2={HERO_H - 20}
                            stroke="rgba(185,214,242,0.06)"
                            strokeDasharray="2 4"
                            strokeWidth={1}
                        />
                        <text
                            x={c.x}
                            y={HERO_H - 6}
                            textAnchor="middle"
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: 9.5,
                                fill: "rgba(185,214,242,0.5)",
                                letterSpacing: "0.08em",
                            }}
                        >
                            {c.label}
                        </text>
                    </g>
                ))}

                {/* Top label */}
                <text
                    x={INIT_X}
                    y={30}
                    style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        fill: "rgba(185,214,242,0.55)",
                        letterSpacing: "0.12em",
                    }}
                >
                    $ git log --graph --oneline --all
                </text>

                {/* INIT node */}
                <circle
                    cx={INIT_X}
                    cy={MAIN_Y}
                    r={8}
                    fill="none"
                    stroke="#B9D6F2"
                    strokeWidth={2}
                />
                <circle cx={INIT_X} cy={MAIN_Y} r={3} fill="#B9D6F2" />
                <text
                    x={INIT_X - 4}
                    y={MAIN_Y - 16}
                    style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        fill: "rgba(185,214,242,0.7)",
                        letterSpacing: "0.12em",
                    }}
                >
                    init: service
                </text>

                {/* Branches */}
                {BRANCHES.map((b, branchIdx) => (
                    <g key={b.id}>
                        <motion.path
                            d={branchPath(b.y)}
                            fill="none"
                            stroke={b.color}
                            strokeWidth={1.5}
                            initial={{ pathLength: 0 }}
                            animate={play ? { pathLength: 1 } : { pathLength: 0 }}
                            transition={{
                                duration: reduced ? 0 : 1.1,
                                delay: reduced ? 0 : 0.25 + branchIdx * 0.18,
                                ease: [0.19, 1, 0.22, 1],
                            }}
                        />
                        <text
                            x={FORK_X + 80}
                            y={b.y - 12}
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: 10,
                                fill: b.color,
                                letterSpacing: "0.12em",
                            }}
                        >
                            {b.label}
                        </text>

                        {/* Commits along the track */}
                        {b.commits.map((_, i) => {
                            const x = commitX(i, b.commits.length);
                            const delay = reduced ? 0 : 1.1 + branchIdx * 0.18 + i * 0.12;
                            return (
                                <motion.g
                                    key={`${b.id}-${i}`}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={
                                        play ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }
                                    }
                                    transition={{
                                        duration: reduced ? 0 : 0.28,
                                        delay,
                                        ease: "easeOut",
                                    }}
                                    style={{ transformOrigin: `${x}px ${b.y}px` }}
                                >
                                    <circle
                                        cx={x}
                                        cy={b.y}
                                        r={5}
                                        fill="none"
                                        stroke={b.color}
                                        strokeWidth={2}
                                    />
                                    <circle cx={x} cy={b.y} r={2} fill={b.color} />
                                </motion.g>
                            );
                        })}

                        {/* Hash label below the first commit */}
                        <motion.text
                            x={commitX(0, b.commits.length)}
                            y={b.y + 22}
                            textAnchor="middle"
                            initial={{ opacity: 0 }}
                            animate={play ? { opacity: 0.85 } : { opacity: 0 }}
                            transition={{
                                duration: reduced ? 0 : 0.4,
                                delay: reduced ? 0 : 1.1 + branchIdx * 0.18,
                            }}
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: 10,
                                fill: "rgba(185,214,242,0.55)",
                                letterSpacing: "0.1em",
                            }}
                        >
                            {b.hash}
                        </motion.text>
                    </g>
                ))}

                {/* FINAL release node + v1.0 tag */}
                <motion.g
                    initial={{ opacity: 0 }}
                    animate={play ? { opacity: 1 } : { opacity: 0 }}
                    transition={{
                        duration: reduced ? 0 : 0.5,
                        delay: reduced ? 0 : 2.7,
                    }}
                >
                    <circle
                        cx={FINAL_X}
                        cy={MAIN_Y}
                        r={11}
                        fill="none"
                        stroke="#C5203E"
                        strokeWidth={2.5}
                    />
                    <circle cx={FINAL_X} cy={MAIN_Y} r={5} fill="#C5203E" />
                    <line
                        x1={FINAL_X}
                        y1={MAIN_Y - 32}
                        x2={FINAL_X}
                        y2={MAIN_Y - 10}
                        stroke="#C5203E"
                        strokeWidth={1.5}
                    />
                    <rect x={FINAL_X - 80} y={MAIN_Y - 60} width={168} height={28} fill="#C5203E" />
                    <text
                        x={FINAL_X + 4}
                        y={MAIN_Y - 41}
                        textAnchor="middle"
                        style={{
                            fontFamily: "var(--font-headline)",
                            fontSize: 11,
                            fontWeight: 700,
                            fill: "#fff",
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                        }}
                    >
                        v1.0 — engineer
                    </text>
                </motion.g>
            </svg>
        </div>
    );
};

export default HeroGitGraph;
