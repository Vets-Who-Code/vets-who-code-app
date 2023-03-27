type TProps = {
    value: number;
    type: string;
};

const DateTimeDisplay = ({ value, type }: TProps) => {
    return (
        <div className="tw-p-2.5 tw-min-w-max">
            <p className="tw-text-[40px] sm:tw-text-5xl md:tw-text-[56px] tw-leading-none tw-text-white tw-mb-2.5">
                {value}
            </p>
            <span className="tw-font-bold tw-uppercase tw-tracking-[3px] tw-text-white">
                {type}
            </span>
        </div>
    );
};

export default DateTimeDisplay;
