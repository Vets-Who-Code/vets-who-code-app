type TProps = {
    title?: string;
    price: number;
    currency: string;
};

const PriceInfo = ({ title, currency, price }: TProps) => {
    return (
        <div className="course-price tw:mb-[7px] tw:flex tw:items-center tw:justify-between">
            <h3 className="tw:mb-0 tw:text-h6">
                <i className="far fa-money-bill-wave tw:min-w-[28px] tw:text-center tw:text-body" />{" "}
                {title}
            </h3>
            <span className="tw:text-right">
                <span className="tw:text-2xl tw:font-extrabold tw:text-primary">
                    {price === 0 ? (
                        "Free"
                    ) : (
                        <>
                            {currency}
                            {price}
                            <span className="tw:text-lg">.00</span>
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
