import Anchor from "@ui/anchor";
import Icon from "@ui/icon";
import { forwardRef } from "react";

export type IconBoxProps = {
    icon: string;
    title: string;
    description: string;
    path: string;
};

const IconBox = forwardRef<HTMLDivElement, IconBoxProps>(
    ({ icon, title, description, path }, ref) => {
        return (
            <div ref={ref} className="icon-box group tw-relative">
                <Icon name={icon} className="tw-h-[60px] tw-w-[60px]" />
                <div className="content tw-relative tw-z-10 tw-mt-6">
                    <h3 className="tw-m-0 tw-text-secondary">{title}</h3>
                    <p className="tw-mt-3 tw-leading-normal">{description}</p>
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
