import clsx from "clsx";
import Anchor from "@ui/anchor";
import WidgetTitle from "./widget-title";

type TProps = {
    className?: string;
    mode?: "light" | "dark";
};

const ListWidget = ({ className, mode }: TProps) => {
    return (
        <div className={clsx(className)}>
            <WidgetTitle mode={mode}>Information</WidgetTitle>
            <ul
                className={clsx(
                    "tw-text-md tw-font-medium",
                    mode === "dark" && "tw-text-gray-400"
                )}
            >
                <li className="tw-pr-5 tw-mb-[11px]">
                    <Anchor path="/membership-levels">Membership</Anchor>
                </li>
                <li className="tw-pr-5 tw-mb-[11px]">
                    <Anchor path="/purchase-guide">Purchase guide</Anchor>
                </li>
                <li className="tw-pr-5 tw-mb-[11px]">
                    <Anchor path="/privacy-policy">Privacy policy</Anchor>
                </li>
                <li className="tw-pr-5 tw-mb-[11px]">
                    <Anchor path="/terms-of-service">Terms of service</Anchor>
                </li>
            </ul>
        </div>
    );
};

export default ListWidget;
