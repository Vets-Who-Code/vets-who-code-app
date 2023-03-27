import clsx from "clsx";

type TProps = {
    title: string;
    className?: string;
};

const Testimonial04 = ({ title, className }: TProps) => {
    return (
        <div
            className={clsx(
                "tw-max-w-[270px] tw-py-7.5 tw-px-[26px] tw-bg-white tw-rounded tw-shadow-lg tw-shadow-heading/10",
                className
            )}
        >
            <h3 className="tw-text-secondary tw-text-xl">
                &quot;{title}&quot;
            </h3>
        </div>
    );
};

export default Testimonial04;
