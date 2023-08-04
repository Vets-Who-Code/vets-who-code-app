import clsx from "clsx";

type TProps = {
    icon?: string;
    label: string;
    value: string | number;
};

const InfoItem = ({ icon, label, value }: TProps) => {
    return (
        <div className="tw-flex tw-items-center tw-justify-between tw-py-3.8 tw-border-t tw-border-t-gray-500 first-of-type:tw-border-0">
            <h3 className="tw-mb-0 tw-text-h6">
                {icon && (
                    <i
                        className={clsx(
                            icon,
                            "tw-text-body tw-min-w-[28px] tw-mr-0.5 tw-text-center"
                        )}
                    />
                )}

                {label}
            </h3>
            <span className="tw-text-right">{value}</span>
        </div>
    );
};

export default InfoItem;
