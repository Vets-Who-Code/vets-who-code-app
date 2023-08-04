import clsx from "clsx";

type TProps = {
    title: string;
    name: string;
    designation: string;
    className?: string;
};

const Testimonial05 = ({ title, name, designation, className }: TProps) => {
    return (
        <div
            className={clsx(
                "testimonial tw-relative tw-z-10 md:tw-max-w-[770px] tw-mx-auto tw-text-center",
                className
            )}
        >
            <h3 className="tw-text-lg sm:tw-text-2xl tw-mb-5 md:tw-text-[34px] md:tw-leading-normal md:tw-mb-10">
                {title}
            </h3>
            <h4 className="tw-mb-0 tw-tracking-wider tw-uppercase tw-text-h6">
                {name}
            </h4>
            <span className="tw-block tw-mt-2.5 tw-text-md tw-text-300">
                / {designation}
            </span>
        </div>
    );
};

export default Testimonial05;
