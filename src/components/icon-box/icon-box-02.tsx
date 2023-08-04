import { forwardRef } from "react";
import Icon from "@ui/icon";
import Anchor from "@ui/anchor";

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
                <Icon name={icon} className="tw-w-[60px] tw-h-[60px]" />
                <div className="content tw-mt-6 tw-relative tw-z-10">
                    <h3 className="tw-text-secondary tw-m-0">{title}</h3>
                    <p className="tw-leading-normal tw-mt-3">{description}</p>
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
