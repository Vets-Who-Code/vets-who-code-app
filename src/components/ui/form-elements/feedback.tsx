import clsx from "clsx";
import { FC } from "react";

export interface IFeedback {
    state?: "success" | "warning" | "error";
    showErrorOnly?: boolean;
    children: React.ReactNode;
}

const Feedback: FC<IFeedback> = ({ state, showErrorOnly, children }) => {
    return (
        <span
            className={clsx(
                "tw-mt-1 tw-block tw-w-full tw-text-md",
                state !== "error" && showErrorOnly && "tw-hidden",
                state === "success" && !showErrorOnly && "tw-text-success",
                state === "warning" && !showErrorOnly && "tw-text-warning",
                state === "error" && "tw-text-danger"
            )}
        >
            {children}
        </span>
    );
};

export default Feedback;
