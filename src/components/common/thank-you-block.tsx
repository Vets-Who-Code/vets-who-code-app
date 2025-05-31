const ThankYouBlock = ({
    heading = "Thank You for Your Support",
    message = "With your support, we help veterans find meaningful employment in technology.",
}: {
    heading?: string;
    message?: string;
}) => {
    return (
        <div className="tw-bg-white-100 tw-py-16">
            <div className="tw-container tw-text-center">
                <h2 className="tw-mb-6 tw-text-3xl tw-font-bold">{heading}</h2>
                <p className="tw-mx-auto tw-max-w-3xl tw-text-lg">{message}</p>
            </div>
        </div>
    );
};

export default ThankYouBlock;
