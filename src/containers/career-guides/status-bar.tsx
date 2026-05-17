interface Props {
    total: number;
}

const StatusBar = ({ total }: Props) => (
    <div className="tw-w-full tw-border-b tw-border-cream/10 tw-bg-secondary tw-py-2.5">
        <div className="tw-container tw-flex tw-flex-wrap tw-items-center tw-gap-x-6 tw-gap-y-2 tw-font-mono tw-text-[10.5px] tw-uppercase tw-tracking-[0.1em] tw-text-[#8590a6]">
            <span className="tw-flex tw-items-center tw-gap-2 tw-text-cream">
                <span className="tw-relative tw-flex tw-h-[7px] tw-w-[7px]">
                    <span className="tw-absolute tw-inline-flex tw-h-full tw-w-full tw-animate-ping tw-rounded-full tw-bg-primary tw-opacity-75" />
                    <span className="tw-relative tw-inline-flex tw-h-[7px] tw-w-[7px] tw-rounded-full tw-bg-primary tw-shadow-[0_0_10px_#c5203e]" />
                </span>
                <span>Live · Database v2.1</span>
            </span>
            <span>
                <span className="tw-text-cream">{total.toLocaleString()}</span> Guides · 5 Branches
            </span>
            <span>
                Validated · <span className="tw-text-cream">Lightcast Labor Data</span>
            </span>
            <span>
                Updated · <span className="tw-text-cream">Q2 2026</span>
            </span>
            <span className="tw-ml-auto tw-text-cream">2026 Cohort Active</span>
        </div>
    </div>
);

export default StatusBar;
