type TProps = {
    price: {
        amount: number;
        currency: string;
    };
    title: string;
    description: string;
};

const Heading = ({ price, title, description }: TProps) => {
    return (
        <>
            <div className="tw-text-4xl tw-font-bold tw-leading-none tw-mb-2.5">
                <span className="amount tw-text-primary">
                    {price.currency}
                    {price.amount}
                </span>
            </div>
            <span className="tw-block tw-text-md tw-font-medium tw-uppercase tw-tracking-[1.38px] tw-mb-0">
                {title}
            </span>
            <div className="tw-mt-2.5 tw-text-base tw-font-normal tw-capitalize tw-text-body ">
                {description}
            </div>
        </>
    );
};

export default Heading;
