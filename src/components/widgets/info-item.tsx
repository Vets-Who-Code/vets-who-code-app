import clsx from "clsx";

type TProps = {
    icon?: string;
    label: string;
    value: string | number;
};

const InfoItem = ({ icon, label, value }: TProps) => {
    return (
        <div className="tw:flex tw:items-center tw:justify-between tw:border-t tw:border-t-gray-500 tw:py-3.8 tw:first-of-type:border-0">
            <h3 className="tw:mb-0 tw:text-h6">
                {icon && (
                    <i
                        className={clsx(
                            icon,
                            "tw:mr-0.5 tw:min-w-[28px] tw:text-center tw:text-body"
                        )}
                    />
                )}

                {label}
            </h3>
            <span className="tw:text-right">{value}</span>
        </div>
    );
};

export default InfoItem;
