import clsx from "clsx";

type TProps = {
    icon: string;
    label: string;
    value: string | number;
};

const CourseInfoItem = ({ icon, label, value }: TProps) => {
    return (
        <div className="tw-flex tw-items-center tw-justify-between tw-py-3.8 tw-border-t tw-border-t-gray-500 first:tw-border-0">
            <h6 className="tw-mb-0">
                <i
                    className={clsx(
                        icon,
                        "tw-text-body tw-min-w-[28px] tw-text-center"
                    )}
                />{" "}
                {label}
            </h6>
            <span className="tw-text-right">{value}</span>
        </div>
    );
};

export default CourseInfoItem;
