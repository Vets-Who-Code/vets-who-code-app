import clsx from "clsx";
import { FC } from "react";

export interface IFeedback {
    id?: string;
    state?: "success" | "warning" | "error";
    showErrorOnly?: boolean;
    children: React.ReactNode;
}

const Feedback: FC<IFeedback> = ({ id, state, showErrorOnly, children }) => {
    return (
        <span
            id={id}
            role={state === "error" ? "alert" : "status"}
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
