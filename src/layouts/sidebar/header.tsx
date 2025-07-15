type TProps = {
    title: string;
    description?: string;
};

const Header = ({ title, description }: TProps) => {
    return (
        <div className="tw:px-5 tw:py-[22px]">
            <h5 className="tw:mb-1 tw:text-h6 tw:font-medium tw:leading-snug">{title}</h5>
            {description && (
                <p className="tw:mb-0 tw:mt-[5px] tw:text-md tw:italic">{description}</p>
            )}
        </div>
    );
};

export default Header;
