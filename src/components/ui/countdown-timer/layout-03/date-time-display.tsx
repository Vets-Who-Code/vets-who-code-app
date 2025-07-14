type TProps = {
    value: number;
};

const DateTimeDisplay = ({ value }: TProps) => {
    return (
        <div className="tw:relative tw:mx-[5px] tw:min-w-max tw:px-[5px] tw:leading-none tw:before:absolute tw:before:-left-2 tw:before:-top-px tw:before:text-lg tw:before:font-bold tw:before:leading-none tw:before:text-secondary tw:before:content-[':'] tw:first:before:hidden">
            <span className="tw:text-lg tw:font-bold tw:leading-none tw:text-secondary">
                {value}
            </span>
        </div>
    );
};

export default DateTimeDisplay;
