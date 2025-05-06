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
                "testimonial tw-relative tw-z-10 tw-mx-auto tw-text-center md:tw-max-w-[770px]",
                className
            )}
        >
            <h3 className="tw-mb-5 tw-text-lg sm:tw-text-2xl md:tw-mb-10 md:tw-text-[34px] md:tw-leading-normal">
                {title}
            </h3>
            <h4 className="tw-mb-0 tw-text-h6 tw-uppercase tw-tracking-wider">{name}</h4>
            <span className="tw-text-300 tw-mt-2.5 tw-block tw-text-md">/ {designation}</span>
        </div>
    );
};

export default Testimonial05;
