type TProps = {
    value: number;
    type: string;
};

const DateTimeDisplay = ({ value, type }: TProps) => {
    return (
        <div className="tw-rounded tw-bg-white tw-px-[3px] tw-pb-[11px] tw-pt-[13px] tw-text-center tw-text-[13px] tw-font-semibold tw-uppercase tw-tracking-wider tw-shadow-2sm tw-shadow-heading/10">
            <span className="tw-mb-[3px] tw-block tw-text-[28px] tw-font-semibold tw-leading-none tw-text-primary">
                {value}
            </span>
            <span>{type}</span>
        </div>
    );
};

export default DateTimeDisplay;
