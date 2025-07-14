import clsx from "clsx";

type TProps = {
    title: string;
    className?: string;
};

const Testimonial04 = ({ title, className }: TProps) => {
    return (
        <div
            className={clsx(
                "tw:max-w-[270px] tw:rounded-sm tw:bg-white tw:px-[26px] tw:py-7.5 tw:shadow-lg tw:shadow-heading/10",
                className
            )}
        >
            <h3 className="tw:text-xl tw:text-secondary">&quot;{title}&quot;</h3>
        </div>
    );
};

export default Testimonial04;
