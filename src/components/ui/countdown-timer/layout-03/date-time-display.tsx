type TProps = {
    value: number;
    /** Abbreviation shown beside the number: d, h, m, s. */
    unit: string;
    /** Full word for screen readers, which cannot infer the unit from "204". */
    label: string;
};

const DateTimeDisplay = ({ value, unit, label }: TProps) => {
    return (
        <div className="tw-relative tw-mx-[5px] tw-min-w-max tw-px-[5px] tw-leading-none before:tw-absolute before:-tw-left-2 before:-tw-top-px before:tw-text-lg before:tw-font-bold before:tw-leading-none before:tw-text-secondary before:tw-content-[':'] first:before:tw-hidden">
            <span className="tw-text-lg tw-font-bold tw-leading-none tw-text-secondary">
                {value}
                <span className="tw-text-[11px] tw-font-bold" aria-hidden="true">
                    {unit}
                </span>
            </span>
            <span className="tw-sr-only">{label}</span>
        </div>
    );
};

export default DateTimeDisplay;
