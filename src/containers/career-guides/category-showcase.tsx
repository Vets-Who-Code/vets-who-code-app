import clsx from "clsx";
import type { Family, GuideEntry } from "./types";

interface Props {
    guides: GuideEntry[];
    onPick: (family: Family) => void;
}

const FEATURED_FAMILIES: Array<{
    family: Family;
    number: string;
    blurb: string;
}> = [
    {
        family: "Cyber",
        number: "/ 01",
        blurb: "Signal warfare and cryptologic operators translate directly to security engineering.",
    },
    {
        family: "IT / Comms",
        number: "/ 02",
        blurb: "Network and signal techs become DevOps, SRE, and platform engineers.",
    },
    {
        family: "Aviation",
        number: "/ 03",
        blurb: "Avionics and aircrew specialties bridge to embedded systems and aerospace software.",
    },
    {
        family: "Intelligence",
        number: "/ 04",
        blurb: "Intel analysts move into data engineering, threat hunting, and ML for defense.",
    },
];

const medianSalary = (rows: GuideEntry[]): string => {
    if (rows.length === 0) return "—";
    const lows = rows.map((r) => r.salaryLow).sort((a, b) => a - b);
    const highs = rows.map((r) => r.salaryHigh).sort((a, b) => a - b);
    const lo = lows[Math.floor(lows.length / 2)];
    const hi = highs[Math.floor(highs.length / 2)];
    return `$${lo}–${hi}K typical`;
};

const CategoryShowcase = ({ guides, onPick }: Props) => {
    return (
        <section className="tw-bg-secondary tw-py-16 md:tw-py-20">
            <div className="tw-container">
                <div className="tw-mb-10 tw-flex tw-items-center tw-gap-3">
                    <span className="tw-inline-block tw-h-[2px] tw-w-4 tw-bg-primary" />
                    <span className="tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.14em] tw-text-[#8590a6]">
                        Pathways that ship in civilian roles
                    </span>
                </div>

                <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-4 tw-border-t tw-border-cream/10">
                    {FEATURED_FAMILIES.map(({ family, number, blurb }, idx) => {
                        const rows = guides.filter((g) => g.family === family);
                        return (
                            <button
                                type="button"
                                key={family}
                                onClick={() => onPick(family)}
                                className={clsx(
                                    "tw-group tw-flex tw-flex-col tw-gap-5 tw-px-6 tw-py-8 tw-text-left tw-transition-colors tw-duration-150",
                                    "hover:tw-bg-[#0c2549]",
                                    idx > 0 && "lg:tw-border-l lg:tw-border-cream/10",
                                    idx > 0 && idx < FEATURED_FAMILIES.length && "sm:tw-border-l sm:tw-border-cream/10",
                                )}
                            >
                                <span className="tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.14em] tw-text-[#5a6478] group-hover:tw-text-accent">
                                    {number}
                                </span>
                                <span className="tw-font-heading tw-text-[22px] tw-font-medium tw-uppercase tw-text-cream [letter-spacing:-0.01em]">
                                    {family}
                                </span>
                                <span className="tw-font-body tw-text-[14px] tw-leading-[1.55] tw-text-[#c4cad6]">
                                    {blurb}
                                </span>
                                <span className="tw-mt-auto tw-flex tw-flex-col tw-gap-1 tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.08em] tw-text-[#8590a6]">
                                    <span>
                                        <span className="tw-text-cream">{rows.length.toLocaleString()}</span>{" "}
                                        guides
                                    </span>
                                    <span>{medianSalary(rows)}</span>
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CategoryShowcase;
