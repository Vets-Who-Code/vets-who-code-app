import clsx from "clsx";

type TProps = {
    icon: string;
    label: string;
    value: string | number;
};

const CourseInfo = ({ icon, label, value }: TProps) => {
    return (
        <div className="tw:flex tw:items-center tw:justify-between tw:border-t tw:border-t-gray-500 tw:py-3.8 tw:first:border-0">
            <h6 className="tw:mb-0">
                <i className={clsx(icon, "tw:min-w-[28px] tw:text-center tw:text-body")} /> {label}
            </h6>
            <span className="tw:text-right">{value}</span>
        </div>
    );
};

export default CourseInfo;
