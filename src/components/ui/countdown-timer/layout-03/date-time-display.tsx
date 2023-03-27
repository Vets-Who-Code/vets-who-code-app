type TProps = {
    value: number;
};

const DateTimeDisplay = ({ value }: TProps) => {
    return (
        <div className="tw-px-[5px] tw-mx-[5px] tw-min-w-max tw-relative tw-leading-none before:tw-absolute before:tw-content-[':'] before:-tw-top-px before:-tw-left-2 before:tw-text-lg before:tw-text-secondary before:tw-font-bold before:tw-leading-none first:before:tw-hidden">
            <span className="tw-text-lg tw-text-secondary tw-font-bold tw-leading-none">
                {value}
            </span>
        </div>
    );
};

export default DateTimeDisplay;
