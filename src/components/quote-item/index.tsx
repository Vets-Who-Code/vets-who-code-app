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
                "testimonial tw:relative tw:z-10 tw:mx-auto tw:text-center tw:md:max-w-[770px]",
                className
            )}
        >
            <h3 className="tw:mb-5 tw:text-lg tw:sm:text-2xl tw:md:mb-10 tw:md:text-[34px] tw:md:leading-normal">
                {title}
            </h3>
            <h4 className="tw:mb-0 tw:text-h6 tw:uppercase tw:tracking-wider">{name}</h4>
            <span className="tw:text-300 tw:mt-2.5 tw:block tw:text-md">/ {designation}</span>
        </div>
    );
};

export default Testimonial05;
