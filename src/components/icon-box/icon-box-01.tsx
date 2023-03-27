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
                className="icon-box tw-text-center tw-relative tw-transition tw-pt-10 tw-pb-7.5 tw-px-[19px] tw-rounded group before:tw-absolute before:tw-content-['']  before:tw-inset-0 before:tw-shadow-lg before:tw-shadow-dark/10 before:tw-opacity-0 before:tw-transition hover:tw-bg-white hover:before:tw-opacity-100"
            >
                <Icon
                    name={icon}
                    className="tw-w-[60px] tw-h-[60px] tw-mx-auto"
                />
                <div className="content tw-mt-7 tw-relative tw-z-10">
                    <h3 className="tw-text-secondary tw-m-0">{title}</h3>
                    <p className="tw-leading-normal tw-px-2.5 tw-mt-3">
                        {description}
                    </p>
                    <span className="tw-text-md tw-font-bold tw-leading-none tw-inline-flex tw-items-center tw-mt-5 tw-text-secondary-light tw-p-1.3 group-hover:tw-text-primary">
                        {pathText}{" "}
                        <i className="far fa-long-arrow-right tw-ml-3.5 tw-text-[16px]" />
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
