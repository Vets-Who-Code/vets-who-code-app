import clsx from "clsx";
import Anchor from "@ui/anchor";
import WidgetTitle from "./widget-title";

type TProps = {
    className?: string;
    mode?: "light" | "dark";
};

const TwoColumnListWidget = ({ className, mode }: TProps) => {
    return (
        <div className={clsx(className)}>
            <WidgetTitle mode={mode}>Explore</WidgetTitle>
            <ul
                className={clsx(
                    "tw-flex tw-flex-wrap tw-text-md tw-font-medium",
                    mode === "dark" && "tw-text-gray-400"
                )}
            >
                <li className="tw-mb-[11px] tw-w-1/2 tw-pr-5">
                    <Anchor path="/about-us">Start here</Anchor>
                </li>
                <li className="tw-mb-[11px] tw-w-1/2 tw-pr-5">
                    <Anchor path="/blogs/blog">Blog</Anchor>
                </li>
                <li className="tw-mb-[11px] tw-w-1/2 tw-pr-5">
                    <Anchor path="/subjects/all">Subjects</Anchor>
                </li>
                <li className="tw-mb-[11px] tw-w-1/2 tw-pr-5">
                    <Anchor path="/about-us">About us</Anchor>
                </li>
            </ul>
        </div>
    );
};

export default TwoColumnListWidget;
