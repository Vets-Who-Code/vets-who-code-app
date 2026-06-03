import clsx from "clsx";

export const SectionHeader = ({
    number,
    eyebrow,
    title,
    lede,
    meta,
}: {
    number: string;
    eyebrow: string;
    title: string;
    lede?: string;
    meta?: string;
}) => (
    <header className="tw-flex tw-flex-col tw-gap-5">
        <div className="tw-flex tw-items-start tw-justify-between tw-gap-6">
            <div className="tw-flex tw-flex-col tw-gap-3">
                <div className="tw-flex tw-items-center tw-gap-3">
                    <span className="tw-inline-block tw-h-[2px] tw-w-4 tw-bg-primary" />
                    <span className="tw-font-mono tw-text-[11px] tw-uppercase tw-tracking-[0.14em] tw-text-[#6C757D]">
                        {number} · {eyebrow}
                    </span>
                </div>
                <h2 className="tw-font-heading tw-font-semibold tw-uppercase tw-text-cream [letter-spacing:-0.02em] [line-height:1] [font-size:clamp(32px,4.5vw,56px)]">
                    {title}
                </h2>
            </div>
            {meta && (
                <span className="tw-shrink-0 tw-pt-2 tw-text-right tw-font-mono tw-text-[10.5px] tw-uppercase tw-tracking-[0.12em] tw-text-[#6C757D]">
                    {meta}
                </span>
            )}
        </div>
        {lede && (
            <p className="tw-max-w-[760px] tw-font-body tw-text-[16px] tw-leading-[1.55] tw-text-[#DEE2E6]">
                {lede}
            </p>
        )}
    </header>
);

export const DemandBars = ({ level }: { level: number }) => (
    <div className="tw-flex tw-items-end tw-gap-1">
        {[1, 2, 3, 4].map((b) => (
            <span
                key={b}
                aria-hidden={true}
                className={clsx(
                    "tw-h-[11px] tw-w-[3px]",
                    b <= level ? "tw-bg-accent" : "tw-bg-[#495057]"
                )}
            />
        ))}
    </div>
);

export const demandLevel = (demand: string): number => {
    const d = demand.toLowerCase();
    if (d.includes("very high")) return 4;
    if (d.includes("high") || d.includes("growing")) return 3;
    if (d.includes("stable") || d.includes("steady")) return 2;
    return 1;
};
