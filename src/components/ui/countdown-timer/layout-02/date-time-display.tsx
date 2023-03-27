type TProps = {
    value: number;
    type: string;
};

const DateTimeDisplay = ({ value, type }: TProps) => {
    return (
        <div className="tw-text-center tw-pt-[13px] tw-px-[3px] tw-pb-[11px] tw-bg-white tw-rounded tw-shadow-2sm tw-shadow-heading/10 tw-text-[13px] tw-font-semibold tw-uppercase tw-tracking-wider">
            <span className="tw-text-[28px] tw-leading-none tw-text-primary tw-font-semibold tw-mb-[3px] tw-block">
                {value}
            </span>
            <span>{type}</span>
        </div>
    );
};

export default DateTimeDisplay;
