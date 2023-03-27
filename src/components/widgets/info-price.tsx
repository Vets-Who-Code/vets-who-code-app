type TProps = {
    title?: string;
    price: number;
    currency: string;
};

const PriceInfo = ({ title, currency, price }: TProps) => {
    return (
        <div className="course-price tw-flex tw-items-center tw-justify-between tw-mb-[7px]">
            <h3 className="tw-mb-0 tw-text-h6">
                <i className="far fa-money-bill-wave tw-text-body tw-min-w-[28px] tw-text-center" />{" "}
                {title}
            </h3>
            <span className="tw-text-right">
                <span className="tw-text-2xl tw-text-primary tw-font-extrabold">
                    {price === 0 ? (
                        "Free"
                    ) : (
                        <>
                            {currency}
                            {price}
                            <span className="tw-text-lg">.00</span>
                        </>
                    )}
                </span>
            </span>
        </div>
    );
};

PriceInfo.defaultProps = {
    title: "Price",
};

export default PriceInfo;
