import { forwardRef } from "react";
import Icon from "@ui/icon";
import Anchor from "@ui/anchor";

export type IconBoxProps = {
    icon: string;
    title: string;
    description: string;
    path: string;
    pathText: string;
};

const IconBox = forwardRef<HTMLDivElement, IconBoxProps>(
    ({ icon, title, description, path, pathText }, ref) => {
        return (
            <div
                ref={ref}
                className="icon-box group tw:relative tw:rounded-sm tw:px-[19px] tw:pb-7.5 tw:pt-10 tw:text-center tw:transition tw:before:absolute tw:before:inset-0 tw:before:opacity-0 tw:before:shadow-lg tw:before:shadow-dark/10 tw:before:transition tw:before:content-[''] tw:hover:bg-white tw:hover:before:opacity-100"
            >
                <Icon name={icon} className="tw:mx-auto tw:h-[60px] tw:w-[60px]" />
                <div className="content tw:relative tw:z-10 tw:mt-7">
                    <h3 className="tw:m-0 tw:text-secondary">{title}</h3>
                    <p className="tw:mt-3 tw:px-2.5 tw:leading-normal">{description}</p>
                    <span className="tw:mt-5 tw:inline-flex tw:items-center tw:p-1.3 tw:text-md tw:font-bold tw:leading-none tw:text-secondary-light tw:group-hover:text-primary">
                        {pathText}{" "}
                        <i className="far fa-long-arrow-right tw:ml-3.5 tw:text-[16px]" />
                    </span>
                </div>
                <Anchor className="link-overlay" path={path}>
                    {title}
                </Anchor>
            </div>
        );
    }
);

IconBox.displayName = "IconBox";

export default IconBox;
