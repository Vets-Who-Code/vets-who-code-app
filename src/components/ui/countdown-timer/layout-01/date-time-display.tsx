type TProps = {
    value: number;
    type: string;
};

const DateTimeDisplay = ({ value, type }: TProps) => {
    return (
        <div className="tw:min-w-max tw:p-2.5">
            <p className="tw:mb-2.5 tw:text-[40px] tw:leading-none tw:text-white tw:sm:text-5xl tw:md:text-[56px]">
                {value}
            </p>
            <span className="tw:font-bold tw:uppercase tw:tracking-[3px] tw:text-white">
                {type}
            </span>
        </div>
    );
};

export default DateTimeDisplay;
