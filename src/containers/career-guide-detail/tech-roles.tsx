import clsx from "clsx";
import { useMemo, useState } from "react";
import { DemandBars, SectionHeader } from "./section-helpers";
import type { ResolvedTechRole } from "./types";

interface Props {
    code: string;
    roles: ResolvedTechRole[];
}

const matchSwatch = (level: ResolvedTechRole["matchLevel"]) =>
    level === "high"
        ? { color: "#FDB330", label: "High match" }
        : level === "good"
          ? { color: "#0353A4", label: "Good match" }
          : { color: "#DEE2E6", label: "Moderate match" };

const matchDemand = (level: ResolvedTechRole["matchLevel"]) =>
    level === "high" ? 4 : level === "good" ? 3 : 2;

const TechRolesSection = ({ code, roles }: Props) => {
    const [filter, setFilter] = useState<string>("all");
    const [open, setOpen] = useState<Set<string>>(new Set());

    const tracks = useMemo(() => {
        const set = new Set<string>();
        for (const r of roles) set.add(r.track);
        return ["all", ...Array.from(set)];
    }, [roles]);

    const filtered = filter === "all" ? roles : roles.filter((r) => r.track === filter);

    if (roles.length === 0) return null;

    return (
        <section id="sec-roles" className="tw-bg-secondary tw-py-20 md:tw-py-24">
            <div className="tw-container tw-flex tw-flex-col tw-gap-10">
                <SectionHeader
                    number="/ 01"
                    eyebrow="Tech Roles"
                    title="Roles your code maps to."
                    lede={`Industry tech roles your ${code} background maps to — picked from BLS-anchored occupations using your training, cognitive skills, and systems experience.`}
                    meta={`SOURCE · BLS + LIGHTCAST\nROLES · ${roles.length}`}
                />

                {/* Filter bar */}
                <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-4 tw-border-t tw-border-b tw-border-cream/10 tw-py-4">
                    <div className="tw-flex tw-border tw-border-cream/[0.18]">
                        {tracks.map((t) => {
                            const active = filter === t;
                            return (
                                <button
                                    key={t}
                                    type="button"
                                    onClick={() => setFilter(t)}
                                    className={clsx(
                                        "tw-px-3 tw-py-1.5 tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.1em] tw-transition-colors",
                                        active
                                            ? "tw-bg-accent tw-text-secondary"
                                            : "tw-bg-secondary tw-text-[#DEE2E6] hover:tw-text-cream"
                                    )}
                                >
                                    {t === "all" ? "All" : t}
                                </button>
                            );
                        })}
                    </div>
                    <span className="tw-ml-auto tw-font-mono tw-text-[10.5px] tw-uppercase tw-tracking-[0.12em] tw-text-[#6C757D]">
                        Sort · Match descending
                    </span>
                </div>

                {/* Role list */}
                <ul className="tw-flex tw-flex-col tw-border-t tw-border-cream/10">
                    {filtered.map((role, idx) => {
                        const isOpen = open.has(role.roleKey);
                        const swatch = matchSwatch(role.matchLevel);
                        const idxLabel = `R.${String(idx + 1).padStart(2, "0")}`;
                        return (
                            <li
                                key={role.roleKey}
                                className={clsx(
                                    "tw-border-b tw-border-cream/10 tw-transition-colors",
                                    isOpen && "tw-bg-[#003559]"
                                )}
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        setOpen((p) => {
                                            const n = new Set(p);
                                            if (n.has(role.roleKey)) n.delete(role.roleKey);
                                            else n.add(role.roleKey);
                                            return n;
                                        })
                                    }
                                    aria-expanded={isOpen}
                                    className="tw-grid tw-w-full tw-grid-cols-[60px_1fr_36px] tw-gap-4 tw-px-2 tw-py-5 tw-text-left tw-transition-colors hover:tw-bg-[#003559] md:tw-grid-cols-[60px_1fr_220px_140px_130px_36px]"
                                >
                                    <span className="tw-font-mono tw-text-[12px] tw-uppercase tw-tracking-[0.1em] tw-text-[#6C757D]">
                                        {idxLabel}
                                    </span>
                                    <div className="tw-flex tw-flex-col tw-gap-1">
                                        <span className="tw-font-heading tw-text-[20px] tw-font-medium tw-uppercase tw-leading-[1.15] tw-text-cream [letter-spacing:-0.01em]">
                                            {role.title}
                                        </span>
                                        <span className="tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.1em] tw-text-[#6C757D]">
                                            SOC {role.socCode} · {role.track}
                                        </span>
                                    </div>
                                    <span className="tw-hidden tw-items-center tw-gap-2 tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.1em] tw-text-[#DEE2E6] md:tw-flex">
                                        <span
                                            aria-hidden={true}
                                            className="tw-h-2 tw-w-2"
                                            style={{ backgroundColor: swatch.color }}
                                        />
                                        {swatch.label}
                                    </span>
                                    <span className="tw-hidden md:tw-flex tw-items-center tw-gap-3">
                                        <DemandBars level={matchDemand(role.matchLevel)} />
                                        <span className="tw-font-mono tw-text-[10.5px] tw-uppercase tw-tracking-[0.1em] tw-text-[#6C757D]">
                                            Demand
                                        </span>
                                    </span>
                                    <span className="tw-hidden md:tw-block tw-font-mono tw-text-[13px] tw-text-cream tw-text-right">
                                        See pathways
                                        <span className="tw-block tw-font-mono tw-text-[10.5px] tw-uppercase tw-tracking-[0.1em] tw-text-[#6C757D]">
                                            typical · civilian
                                        </span>
                                    </span>
                                    <span
                                        aria-hidden={true}
                                        className={clsx(
                                            "tw-flex tw-h-8 tw-w-8 tw-items-center tw-justify-center tw-border tw-transition-colors",
                                            isOpen
                                                ? "tw-border-accent tw-text-accent"
                                                : "tw-border-cream/[0.18] tw-text-cream group-hover:tw-border-accent"
                                        )}
                                    >
                                        {isOpen ? "−" : "+"}
                                    </span>
                                </button>

                                {isOpen && (
                                    <div className="tw-grid tw-grid-cols-1 tw-gap-4 tw-px-2 tw-pb-6 md:tw-grid-cols-[60px_1fr] md:tw-pl-2">
                                        <span />
                                        <div className="tw-flex tw-flex-col tw-gap-4">
                                            <p className="tw-max-w-[720px] tw-font-body tw-text-[15px] tw-leading-[1.55] tw-text-[#DEE2E6]">
                                                {role.whyItFits || role.description}
                                            </p>
                                            {role.stack.length > 0 && (
                                                <div className="tw-flex tw-flex-wrap tw-gap-1.5">
                                                    {role.stack.map((s) => (
                                                        <span
                                                            key={s}
                                                            className="tw-border tw-border-cream/10 tw-px-2 tw-py-1 tw-font-mono tw-text-[10.5px] tw-uppercase tw-tracking-[0.08em] tw-text-[#DEE2E6]"
                                                        >
                                                            {s}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};

export default TechRolesSection;
