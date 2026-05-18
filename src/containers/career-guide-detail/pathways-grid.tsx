import { DemandBars, SectionHeader, demandLevel } from "./section-helpers";
import type { PathwayEntry } from "./types";

interface Props {
    pathways: PathwayEntry[];
}

const matchClass = (m: string) => {
    const l = m.toLowerCase();
    if (l.includes("high")) return "#7ad395";
    if (l.includes("good")) return "#5b87c4";
    return "#c4cad6";
};

const formatSalary = (n: number) => `$${Math.round(n / 1000)}K`;

const PathwaysGrid = ({ pathways }: Props) => {
    if (pathways.length === 0) return null;

    return (
        <section
            id="sec-pathways"
            className="tw-border-t tw-border-cream/10 tw-bg-secondary tw-py-20 md:tw-py-24"
        >
            <div className="tw-container tw-flex tw-flex-col tw-gap-10">
                <SectionHeader
                    number="/ 03"
                    eyebrow="Civilian Pathways"
                    title="Where your code lands."
                    meta={`SOURCE · LIGHTCAST + CURATED\nPATHWAYS · ${pathways.length}`}
                />

                <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-5 tw-border-t tw-border-l tw-border-cream/10">
                    {pathways.map((p, idx) => (
                        <article
                            key={p.role}
                            className="tw-flex tw-flex-col tw-gap-4 tw-border-b tw-border-r tw-border-cream/10 tw-p-6 tw-min-h-[290px]"
                        >
                            <span className="tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.1em] tw-text-[#8590a6]">
                                P.{String(idx + 1).padStart(2, "0")}
                            </span>
                            <h3 className="tw-font-heading tw-text-[21px] tw-font-medium tw-uppercase tw-leading-[1.2] tw-text-cream [letter-spacing:-0.01em]">
                                {p.role}
                            </h3>
                            <span className="tw-font-mono tw-text-[18px] tw-text-cream">
                                {formatSalary(p.avgSalary)}
                            </span>
                            <div className="tw-flex tw-flex-col tw-gap-2 tw-font-mono tw-text-[10.5px] tw-uppercase tw-tracking-[0.1em] tw-text-[#8590a6]">
                                <span className="tw-flex tw-items-center tw-gap-2 tw-text-[#c4cad6]">
                                    <span
                                        aria-hidden
                                        className="tw-h-2 tw-w-2"
                                        style={{ backgroundColor: matchClass(p.matchLevel) }}
                                    />
                                    {p.matchLevel}
                                </span>
                                <span className="tw-flex tw-items-center tw-gap-2 tw-text-[#c4cad6]">
                                    <DemandBars level={demandLevel(p.demand)} />
                                    {p.demand}
                                </span>
                            </div>
                            {p.skillsToClose && p.skillsToClose.length > 0 && (
                                <div className="tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-border-t tw-border-dashed tw-border-cream/10 tw-pt-3">
                                    <span className="tw-font-mono tw-text-[10px] tw-uppercase tw-tracking-[0.14em] tw-text-[#8590a6]">
                                        Skills to develop
                                    </span>
                                    <ul className="tw-flex tw-flex-col tw-gap-1">
                                        {p.skillsToClose.slice(0, 3).map((s) => (
                                            <li
                                                key={s}
                                                className="tw-font-body tw-text-[11.5px] tw-leading-[1.4] tw-text-[#c4cad6]"
                                            >
                                                — {s}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PathwaysGrid;
