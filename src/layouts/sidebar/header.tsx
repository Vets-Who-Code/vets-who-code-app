type TProps = {
    title: string;
    description?: string;
};

const Header = ({ title, description }: TProps) => {
    return (
        <div className="tw-py-[22px] tw-px-5">
            <h5 className="tw-text-h6 tw-font-medium tw-leading-snug tw-mb-1">
                {title}
            </h5>
            {description && (
                <p className="tw-mt-[5px] tw-text-md tw-italic tw-mb-0">
                    {description}
                </p>
            )}
        </div>
    );
};

export default Header;
