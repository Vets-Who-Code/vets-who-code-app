import clsx from "clsx";
import Link from "next/link";
import { type FamilyStat, facetHref } from "@/lib/career-guide-facets";
import type { Family } from "./types";

interface Props {
    stats: Record<Family, FamilyStat>;
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

const medianSalary = ({ count, medianLow, medianHigh }: FamilyStat): string =>
    count === 0 ? "—" : `$${medianLow}–${medianHigh}K typical`;

const CategoryShowcase = ({ stats }: Props) => {
    return (
        <section className="tw-bg-secondary tw-py-16 md:tw-py-20">
            <div className="tw-container">
                <div className="tw-mb-10 tw-flex tw-items-center tw-gap-3">
                    <span className="tw-inline-block tw-h-[2px] tw-w-4 tw-bg-primary" />
                    <span className="tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.14em] tw-text-[#DEE2E6]">
                        Pathways that ship in civilian roles
                    </span>
                </div>

                <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-4 tw-border-t tw-border-cream/10">
                    {FEATURED_FAMILIES.map(({ family, number, blurb }, idx) => {
                        const stat = stats[family];
                        return (
                            <Link
                                key={family}
                                href={facetHref({ kind: "family", value: family }, 1)}
                                prefetch={false}
                                className={clsx(
                                    "tw-group tw-flex tw-flex-col tw-gap-5 tw-px-6 tw-py-8 tw-text-left tw-transition-colors tw-duration-150",
                                    "hover:tw-bg-[#003559]",
                                    idx > 0 && "lg:tw-border-l lg:tw-border-cream/10",
                                    idx > 0 &&
                                        idx < FEATURED_FAMILIES.length &&
                                        "sm:tw-border-l sm:tw-border-cream/10"
                                )}
                            >
                                <span className="tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.14em] tw-text-[#DEE2E6] group-hover:tw-text-accent">
                                    {number}
                                </span>
                                <span className="tw-font-heading tw-text-[22px] tw-font-medium tw-uppercase tw-text-cream [letter-spacing:-0.01em]">
                                    {family}
                                </span>
                                <span className="tw-font-body tw-text-[14px] tw-leading-[1.55] tw-text-[#DEE2E6]">
                                    {blurb}
                                </span>
                                <span className="tw-mt-auto tw-flex tw-flex-col tw-gap-1 tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.08em] tw-text-[#DEE2E6]">
                                    <span>
                                        <span className="tw-text-cream">
                                            {stat.count.toLocaleString()}
                                        </span>{" "}
                                        guides
                                    </span>
                                    <span>{medianSalary(stat)}</span>
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CategoryShowcase;
