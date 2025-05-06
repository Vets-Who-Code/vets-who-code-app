type TProps = {
    value: number;
};

const DateTimeDisplay = ({ value }: TProps) => {
    return (
        <div className="tw-relative tw-mx-[5px] tw-min-w-max tw-px-[5px] tw-leading-none before:tw-absolute before:-tw-left-2 before:-tw-top-px before:tw-text-lg before:tw-font-bold before:tw-leading-none before:tw-text-secondary before:tw-content-[':'] first:before:tw-hidden">
            <span className="tw-text-lg tw-font-bold tw-leading-none tw-text-secondary">
                {value}
            </span>
        </div>
    );
};

export default DateTimeDisplay;
