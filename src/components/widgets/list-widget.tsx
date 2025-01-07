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
                className={clsx("tw-text-md tw-font-medium", mode === "dark" && "tw-text-gray-400")}
            >
                <li className="tw-mb-[11px] tw-pr-5">
                    <Anchor path="/code-of-conduct">Code of Conduct</Anchor>
                </li>
                <li className="tw-mb-[11px] tw-w-1/2 tw-pr-5">
                    <Anchor path="/faq">FAQ</Anchor>
                </li>
                <li className="tw-mb-[11px] tw-w-1/2 tw-pr-5">
                    <Anchor path="/contact-us">Contact us</Anchor>
                </li>
            </ul>
        </div>
    );
};

export default ListWidget;
