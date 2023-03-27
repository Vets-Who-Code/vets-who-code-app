import clsx from "clsx";

type TProps = {
    className?: string;
    heading?: string;
    text?: string;
};

const RatingBox = ({ className, heading, text }: TProps) => {
    return (
        <div
            className={clsx(
                "tw-max-w-[210px] tw-pt-14 tw-px-[25px] tw-pb-9 tw-bg-white tw-rounded tw-shadow-lg tw-shadow-heading/10 tw-text-center",
                className
            )}
        >
            <h3 className="tw-leading-none tw-text-secondary">{heading}</h3>
            <div className="tw-text-lg tw-text-yellow-100 tw-mt-[5px] tw-mb-2.5">
                <span className="fa fa-star tw-mx-0.5" />
                <span className="fa fa-star tw-mx-0.5" />
                <span className="fa fa-star tw-mx-0.5" />
                <span className="fa fa-star tw-mx-0.5" />
                <span className="fa fa-star tw-mx-0.5" />
            </div>
            <p>{text}</p>
        </div>
    );
};

export default RatingBox;
