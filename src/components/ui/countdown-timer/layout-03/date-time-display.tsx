type TProps = {
    value: number;
    /** Unit word shown beside the number, e.g. "days". Read by screen readers too. */
    label: string;
};

const DateTimeDisplay = ({ value, label }: TProps) => {
    return (
        <div className="tw-mx-[5px] tw-min-w-max tw-leading-none">
            <span className="tw-text-lg tw-font-bold tw-leading-none tw-text-secondary">
                {value}
            </span>
            <span className="tw-ml-1 tw-text-xs tw-font-bold tw-leading-none tw-text-secondary">
                {label}
            </span>
        </div>
    );
};

export default DateTimeDisplay;
